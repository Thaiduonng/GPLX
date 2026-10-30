import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { vehicles, defaultKeys, lessonNames } from '../config';
import type { Action, CameraMode, HudSnapshot, KeyMap, Layout, LessonId, LicenseClass, Mode, RuleSet, SavedRun } from '../types';
import { SimulationController } from '../runtime/controller';
import { bindInput } from '../runtime/input';
import { frontPosition } from '../physics/vehicle';
import { parseLayout } from '../runtime/layout';
import { rulesApplicable } from '../rules/configuration';
import { createScene } from '../render/scene';
import { downloadJson, listRuns, parseReplay, saveRun } from '../persistence/history';
import { Hud, formatTime } from './Hud';
import { Settings } from './Settings';
import styles from './Simulation.module.css';
const cameraNames: Record<CameraMode,string>={chase:'Sau xe',cabin:'Trong cabin',overhead:'Trên cao'};
const ended=(status:string)=>['completed','suspended','aborted'].includes(status);
export default function Simulation3D({rules,ownerId,showLegacy=true}:{rules:RuleSet;ownerId:number;showLegacy?:boolean}) {
 const [code,setCode]=useState<LicenseClass>('B');const [mode,setMode]=useState<Mode>('practice');const [lesson,setLesson]=useState<LessonId|'all'>('all');
 const [customLayout,setCustomLayout]=useState<Layout|null>(null);const [runKey,setRunKey]=useState(0);const [hazards,setHazards]=useState(false);
 const [hud,setHud]=useState<HudSnapshot|null>(null);const [keys,setKeys]=useState<KeyMap>({...defaultKeys});const [audio,setAudio]=useState(false);
 const [error,setError]=useState('');const [renderError,setRenderError]=useState('');const [history,setHistory]=useState<SavedRun[]>([]);const [historyLoading,setHistoryLoading]=useState(true);
 const [lastRun,setLastRun]=useState<SavedRun|null>(null);const [replay,setReplay]=useState<SavedRun|null>(null);const [saveStatus,setSaveStatus]=useState('');
 const hostRef=useRef<HTMLDivElement>(null);const viewportRef=useRef<HTMLDivElement>(null);const controller=useRef<SimulationController|null>(null);
 const spec=vehicles[code];const locked=!!hud&&['running','paused'].includes(hud.session.status)&&!replay;
 const loadHistory=useCallback(()=>{setHistoryLoading(true);listRuns(ownerId).then(setHistory).catch(e=>setError(e instanceof Error?e.message:'Không tải được lịch sử.')).finally(()=>setHistoryLoading(false));},[ownerId]);
 useEffect(loadHistory,[loadHistory]);
 useEffect(()=>{
  const host=hostRef.current,viewport=viewportRef.current;if(!host||!viewport)return;
  let disposed=false,finalised=false;setRenderError('');setLastRun(null);setSaveStatus('');
  const c=new SimulationController(spec,rules,mode,lesson==='all'?null:lesson,replay?.layout??customLayout??undefined,hazards);controller.current=c;
  c.keys={...keys};if(replay)c.loadReplay(replay);
  c.onHud=snapshot=>{
   if(disposed)return;setHud(snapshot);
   if(ended(snapshot.session.status)&&!c.replay&&!finalised){
    finalised=true;const run=c.finishRun(ownerId);setLastRun(run);setSaveStatus('Đang lưu trên trình duyệt…');
    saveRun(run).then(()=>{if(!disposed){setSaveStatus('Đã lưu trên trình duyệt này.');loadHistory();}}).catch(e=>{if(!disposed)setSaveStatus(e instanceof Error?e.message:'Không lưu được kết quả.');});
   }
  };c.emit();
  const unbind=bindInput(viewport,c);let destroy:(()=>void)|undefined;
  try{destroy=createScene(host,c,setRenderError);}catch(e){setRenderError(`Không khởi tạo được đồ họa 3D. Cần trình duyệt có WebGL 2 và tăng tốc đồ họa. ${e instanceof Error?e.message:''}`);}
  return()=>{disposed=true;c.onHud=null;c.pause();unbind();destroy?.();controller.current=null;if('speechSynthesis' in window)window.speechSynthesis.cancel();};
  // Keys are changed in-place below, without resetting a live run.
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[spec,rules,mode,lesson,customLayout,runKey,replay,hazards,ownerId,loadHistory]);
 useEffect(()=>{if(controller.current)controller.current.keys={...keys};},[keys]);
 const announcement=hud?`${hud.session.status}|${hud.session.current}|${hud.session.violations.at(-1)?.id??''}|${hud.session.hazardAt}|${hud.session.hazardDone}`:'';
 useEffect(()=>{
  if(!audio||!hud||!('speechSynthesis' in window)||hud.replay)return;
  const s=hud.session;if(s.status!=='running'){window.speechSynthesis.cancel();return;}
  const message=s.hazardAt!==null&&!s.hazardDone?'Nguy hiểm. Phanh dừng xe và bật đèn cảnh báo.':s.violations.at(-1)?.message??`Bài ${s.current+1}. ${lessonNames[s.lessons[s.current]?.id??'hill']}`;
  const voice=new SpeechSynthesisUtterance(message);voice.lang='vi-VN';voice.rate=0.95;const vi=window.speechSynthesis.getVoices().find(v=>v.lang.startsWith('vi'));if(vi)voice.voice=vi;window.speechSynthesis.cancel();window.speechSynthesis.speak(voice);
  // Announce discrete events only, not each telemetry update.
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[announcement,audio]);
 const invoke=(action:Action)=>controller.current?.action(action);
 const start=()=>{try{controller.current?.start();viewportRef.current?.focus();}catch(e){setError(e instanceof Error?e.message:'Không bắt đầu được phiên.');}};
 const restart=()=>{setReplay(null);setError('');setRunKey(k=>k+1);};
 const replayRun=(run:SavedRun)=>{setCode(run.vehicleClass);setMode(run.mode);setLesson(run.practiceLesson??'all');setReplay(run);setError('');};
 const importFile=async(event:ChangeEvent<HTMLInputElement>,kind:'layout'|'replay')=>{
  const file=event.target.files?.[0];event.target.value='';if(!file)return;
  try{if(file.size>(kind==='layout'?100000:10000000))throw new Error('Tệp quá lớn. Sân tối đa 100 KB; bản ghi tối đa 10 MB.');const value:unknown=JSON.parse(await file.text());if(kind==='layout'){setCustomLayout(parseLayout(value));setReplay(null);}else replayRun(parseReplay(value,ownerId));setError('');}catch(e){setError(e instanceof Error?e.message:'Không đọc được tệp JSON.');}
 };
 const session=hud?.session;const terminal=!!session&&ended(session.status)&&!replay;const passed=session?.status==='completed'&&(session?.score??0)>=rules.passScore&&!session.violations.some(v=>v.suspend);
 const currentLesson=session?.lessons[Math.min(session.current,session.lessons.length-1)]?.id;
 const currentLayout=controller.current?.layout;
 const stopLine=currentLayout?(session&&session.current>=session.lessons.length&&mode==='exam'?currentLayout.finish:currentLesson==='departure'?currentLayout.startLine:currentLesson==='pedestrian'?currentLayout.pedestrianLine:currentLayout.hillStop):0;
 return <div className={styles.page}>
  <header className={styles.heading}><div><span className={styles.eyebrow}>SA HÌNH 3D / PHIÊN BẢN MVP</span><h1>Vào sân. Làm chủ tay lái.</h1><p>Ba bài đầu tiên, sáu hạng xe. Luyện từng thao tác và xem lại hành trình.</p></div>{showLegacy&&<Link to="/student/driving-simulation/2d" className={styles.secondaryLink}>Mở sân luyện 2D</Link>}</header>
  <div className={styles.legalNotice}>Sân mẫu & vật lý cơ bản, không thay thế thực hành trên xe thật. Chỉ chấm phạm vi ba bài MVP; không xác nhận đạt toàn bộ kỳ sát hạch. Bộ quy tắc tham chiếu đến {rules.validUntil.split('-').reverse().join('/')}.</div>
  {!rulesApplicable(rules)&&<p className={styles.error} role="alert">Quy định đang chờ cập nhật xác minh pháp lý hoặc đã hết thời hạn. Chỉ luyện tập; tạm khóa thi mô phỏng và khấu trừ điểm.</p>}
  {error&&<p className={styles.error} role="alert">{error} <button onClick={()=>setError('')}>Đóng</button></p>}
  <div className={styles.setup}>
   <label>Hạng GPLX<select aria-label="Hạng GPLX 3D" disabled={locked||!!replay} value={code} onChange={e=>setCode(e.target.value as LicenseClass)}>{Object.values(vehicles).map(v=><option value={v.code} key={v.code}>{v.code} — {v.label}</option>)}</select></label>
   <label>Chế độ<select aria-label="Chế độ mô phỏng" disabled={locked||!!replay} value={mode} onChange={e=>setMode(e.target.value as Mode)}><option value="practice">Luyện tập — tiếp tục sau lỗi</option><option value="exam" disabled={!rulesApplicable(rules)}>Thi mô phỏng — 3 bài MVP</option></select></label>
   <label>Phạm vi<select aria-label="Phạm vi bài luyện" disabled={locked||mode==='exam'||!!replay} value={mode==='exam'?'all':lesson} onChange={e=>setLesson(e.target.value as LessonId|'all')}><option value="all">Liên hoàn 3 bài</option>{Object.entries(lessonNames).map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label>
   <label className={styles.check}><input type="checkbox" checked={hazards} disabled={locked||!!replay} onChange={e=>setHazards(e.target.checked)}/>Tình huống bất ngờ</label>
  </div>
  <div className={styles.gameGrid}>
   <div className={styles.viewport} ref={viewportRef} tabIndex={0} aria-label="Vùng lái xe 3D. Bấm bắt đầu rồi dùng các phím điều khiển.">
    <div ref={hostRef} className={styles.canvasHost}/>
    {hud&&<Hud hud={hud} spec={spec} rules={controller.current?.rules??rules}/>}
    <div className={styles.cameraBar}>{(Object.keys(cameraNames) as CameraMode[]).map(camera=><button type="button" key={camera} aria-pressed={hud?.camera===camera} onClick={()=>{if(controller.current){controller.current.camera=camera;controller.current.emit();}viewportRef.current?.focus();}}>{cameraNames[camera]}</button>)}</div>
    {renderError?<div className={styles.centerCard} role="alert"><h2>Chưa mở được sân 3D</h2><p>{renderError}</p><button onClick={()=>setRunKey(k=>k+1)}>Thử lại</button></div>:hud&&!hud.running&&!terminal&&!replay&&<div className={styles.centerCard}><span>{session?.status==='paused'?'ĐANG TẠM DỪNG':'SẴN SÀNG VÀO SÂN'}</span><h2>{spec.label} · Hạng {code}</h2><p>Cài dây an toàn (B), bật xi nhan trái (Q), nhả phanh tay (P). Giữ W để tiến; Space để phanh.</p><button className={styles.primary} onClick={start}>{session?.status==='paused'?'Tiếp tục lái':'Bắt đầu lái xe'}</button></div>}
    {terminal&&<div className={styles.centerCard} role="status"><span>KẾT QUẢ PHẠM VI MVP</span><h2>{session.status==='aborted'?'Phiên đã kết thúc':passed?'Đạt bài mô phỏng':'Chưa đạt bài mô phỏng'}</h2><p>{session.score}/100 điểm · {formatTime(session.elapsed)} · {session.violations.length} lần cảnh báo/lỗi</p><p>{session.status==='suspended'?'Phiên thi dừng do lỗi đình chỉ hoặc điểm dưới ngưỡng.':'Kết quả không có giá trị công nhận sát hạch.'}</p><button className={styles.primary} onClick={restart}>Luyện lại</button>{lastRun&&<button onClick={()=>replayRun(lastRun)}>Phát lại hành trình</button>}</div>}
   </div>
   <aside className={styles.sidebar}>
    <div className={styles.sideTitle}><span className={styles.classBadge}>{code}</span><div><h2>{spec.label}</h2><small>{spec.length} m · {spec.mass.toLocaleString('vi-VN')} kg · mô hình minh họa</small></div></div>
    <ol className={styles.lessonList}>{session?.lessons.map((item,index)=><li key={item.id} data-current={index===session.current} data-done={item.completedAt!==null}><span>{item.completedAt!==null?'✓':index+1}</span><div><strong>{lessonNames[item.id]}</strong><small>{item.completedAt!==null?`Hoàn thành ${formatTime(item.completedAt)}`:item.stopValid?'Đã dừng đúng vùng':index===session.current?'Đang thực hiện':'Chờ thực hiện'}</small></div></li>)}</ol>
    <div className={styles.controlsPanel}>
     <button onClick={()=>invoke('seatbelt')} disabled={!!replay||terminal} aria-pressed={hud?.vehicle.seatbelt}>Dây an toàn: {hud?.vehicle.seatbelt?'đã cài':'chưa cài'} <kbd>B</kbd></button>
     <button onClick={()=>invoke('handbrake')} disabled={!!replay||terminal} aria-pressed={hud?.vehicle.handbrake}>Phanh tay: {hud?.vehicle.handbrake?'đang kéo':'đã nhả'} <kbd>P</kbd></button>
     <div className={styles.buttonRow}><button disabled={!!replay||terminal} onClick={()=>invoke('reverse')}>Lùi (R)</button><button disabled={!!replay||terminal} onClick={()=>invoke('forward')}>Tiến (F)</button></div>
    </div>
    <div className={styles.feedback} role="status">{session&&session.hazardAt!==null&&!session.hazardDone?'Chú ý tín hiệu nguy hiểm!':session?.violations.at(-1)?`${session.violations.at(-1)!.message} (${session.violations.at(-1)!.points>0?'-'+session.violations.at(-1)!.points+' điểm':session.violations.at(-1)!.suspend?'đình chỉ':'cảnh báo'})`:'Đưa cản trước vào vùng xanh trước vạch rồi phanh dừng hẳn. Dùng camera trên cao để canh vị trí.'}</div>
    {hud&&controller.current&&<div className={styles.distance}><small>Cản trước → vạch bài hiện tại</small><output aria-label="Khoảng cách tới vạch">{(stopLine-frontPosition(hud.vehicle,spec)).toFixed(2)} m</output></div>}
    <div className={styles.hint}>W / S: ga & giảm tốc · A / D: lái · Space: phanh · Q / E: xi nhan · X / Z: tăng/giảm số · I: máy · H: cảnh báo · C: camera. Số lùi/tiến chỉ đổi khi dừng.</div>
   </aside>
  </div>
  <div className={styles.toolbar}><button className={styles.primary} onClick={start} disabled={!!renderError||terminal}>{replay?(hud?.running?'Tạm dừng phát lại':'Phát lại'):hud?.running?'Tạm dừng':'Tiếp tục / Bắt đầu'}</button><button onClick={restart}>Phiên mới</button><button disabled={!session||terminal||!!replay} onClick={()=>{const c=controller.current;if(c){c.session.status='aborted';c.emit();}}}>Kết thúc phiên</button><button onClick={()=>{void viewportRef.current?.requestFullscreen().catch(()=>setError('Trình duyệt không cho phép toàn màn hình.'));}}>Toàn màn hình</button><label className={styles.check}><input type="checkbox" checked={audio} onChange={e=>{setAudio(e.target.checked);if(!e.target.checked&&'speechSynthesis' in window)window.speechSynthesis.cancel();}}/>Hướng dẫn giọng Việt</label><span>{saveStatus}</span></div>
  {replay&&<label className={styles.replayBar}>Phát lại {formatTime(hud?.replayTime??0)} / {formatTime(hud?.replayDuration??0)}<input aria-label="Vị trí phát lại" type="range" min="0" max={hud?.replayDuration??0} step="0.1" value={hud?.replayTime??0} onChange={e=>{const c=controller.current;if(c){c.replayTime=Number(e.target.value);c.update(0,performance.now());c.emit();}}}/><button onClick={restart}>Thoát phát lại</button></label>}
  <div className={styles.lowerGrid}>
   <section className={styles.card}><h2>Nhật ký lỗi & cảnh báo</h2>{!session?.violations.length?<p>Chưa ghi nhận lỗi. Cảnh báo cảm biến chưa xác minh không trừ điểm.</p>:<div className={styles.log}>{session.violations.map(v=><div key={v.id}><time>{formatTime(v.time)}</time><span>{v.message}<small>{v.source}</small></span><b>{v.suspend?'Đình chỉ':v.points?`−${v.points}`:'Cảnh báo'}</b></div>)}</div>}</section>
   <section className={styles.card}><h2>Lịch sử trên trình duyệt này</h2><p>Giữ 5 phiên gần nhất theo tài khoản. Có thể tải bản ghi để lưu lâu dài; dữ liệu chưa đồng bộ máy chủ.</p>{historyLoading?<p role="status">Đang tải lịch sử…</p>:history.length===0?<p>Chưa có phiên luyện được lưu.</p>:<ul className={styles.history}>{history.map(run=><li key={run.id}><div><strong>Hạng {run.vehicleClass} · {run.result.score} điểm</strong><small>{new Date(run.createdAt).toLocaleString('vi-VN')} · {run.result.status==='completed'?'Hoàn thành':run.result.status==='suspended'?'Đình chỉ':'Đã kết thúc'}</small></div><button disabled={locked} onClick={()=>replayRun(run)}>Xem lại</button><button onClick={()=>downloadJson(run,`sa-hinh-${run.id}.json`)}>Tải JSON</button></li>)}</ul>}<div className={styles.buttonRow}><button onClick={loadHistory}>Tải lại lịch sử</button><label className={styles.fileButton}>Mở bản ghi JSON<input type="file" accept="application/json,.json" disabled={locked} onChange={e=>void importFile(e,'replay')}/></label>{lastRun&&<button onClick={()=>downloadJson(lastRun,`sa-hinh-${lastRun.id}.json`)}>Tải phiên vừa luyện</button>}</div></section>
  </div>
  <Settings keys={keys} onChange={value=>{controller.current?.pause();setKeys(value);}} onError={setError}/>
  <details className={styles.details}><summary>Sân mẫu, cấu hình hạng xe & căn cứ chấm điểm</summary><p>{controller.current?.layout.name??'Sân mẫu'} · ba bài đã triển khai. Hạng {code} có {rules.profiles[code].fullSequence.length} bài trong cấu hình tham chiếu đầy đủ; ghép xe {rules.profiles[code].parking.map(p=>p==='vertical'?'dọc':'ngang').join(' và ')} chưa nằm trong MVP.</p><p>Chỉ nhận sơ đồ JSON hành lang thẳng gồm ba bài (mét), có kiểm tra thứ tự vùng, độ dốc và vật cản. Chưa nhập CAD hoặc sân nhiều nhánh.</p><div className={styles.buttonRow}><button onClick={()=>downloadJson(controller.current?.layout,'san-mau-3d.json')}>Tải sơ đồ mẫu</button><label className={styles.fileButton}>Nhập sơ đồ sân<input type="file" accept="application/json,.json" disabled={locked||!!replay} onChange={e=>void importFile(e,'layout')}/></label><button disabled={locked} onClick={()=>{setCustomLayout(null);restart();}}>Dùng lại sân mẫu</button></div><p>Bộ quy tắc: {rules.version}. Các mức trừ được lấy từ tài liệu đính kèm, không nội suy mức phạt cho cảm biến chưa xác minh. Tự ngừng áp dụng khi hết hạn; thay đổi bộ quy tắc cần phiên bản và kiểm chứng mới.</p>{rules.sources.map(source=><p key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><br/>{source.section}</p>)}<p>Giọng nói sử dụng Speech Synthesis của trình duyệt; cần giọng tiếng Việt được cài trên máy. Vật lý dùng mô hình xe đạp động học, bám lốp và lực dọc; chưa có hệ treo, biến dạng va chạm hoặc côn thủ công.</p></details>
 </div>;
}
