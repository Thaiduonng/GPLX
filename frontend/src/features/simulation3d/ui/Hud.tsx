import type { HudSnapshot, RuleSet, VehicleSpec } from '../types';
import { lessonNames } from '../config';
import styles from './Simulation.module.css';
export const formatTime=(time: number)=>`${Math.floor(time/60).toString().padStart(2,'0')}:${Math.floor(time%60).toString().padStart(2,'0')}`;
export function Hud({hud,spec,rules}:{hud:HudSnapshot;spec:VehicleSpec;rules:RuleSet}) {
 const {vehicle:v,session:s}=hud;const lesson=s.lessons[s.current];
 return <>
  <div className={styles.topHud}><div><small>ĐIỂM MÔ PHỎNG</small><strong className={s.score<rules.passScore?styles.danger:''}>{s.score}<span>/ {rules.initialScore}</span></strong></div><div><small>THỜI GIAN</small><strong>{formatTime(s.elapsed)}</strong></div><div className={styles.currentLesson}><small>{hud.replay?'ĐANG PHÁT LẠI':'BÀI HIỆN TẠI'}</small><strong>{lesson?lessonNames[lesson.id]:'Tới cổng kết thúc MVP'}</strong></div></div>
  <div className={styles.telemetry}><div className={styles.speed}><strong><output aria-label="Tốc độ xe">{(Math.abs(v.speed)*3.6).toFixed(1)}</output></strong><small>km/h · giới hạn {rules.profiles[spec.code].speedLimit}</small></div><div className={styles.instruments}><span>Số <b>{v.gear<0?'R':v.gear}</b></span><span>{Math.round(v.rpm)} vòng/phút</span><span>Lái {(v.steering*180/Math.PI).toFixed(0)}°</span><span>Ga {Math.round(v.throttle*100)}%</span></div><div className={styles.indicators}><span className={v.signal==='left'||v.hazard?styles.lit:''}>←</span><span className={v.handbrake?styles.warning:''}>Ⓟ {v.handbrake?'Đang kéo':'Đã nhả'}</span><span className={!v.engineOn?styles.danger:''}>{v.engineOn?'Máy đang nổ':'Máy đã tắt'}</span><span className={v.signal==='right'||v.hazard?styles.lit:''}>→</span></div></div>
  {s.hazardAt!==null&&!s.hazardDone&&<div className={styles.hazard} role="alert">TÌNH HUỐNG NGUY HIỂM — dừng xe, bật cảnh báo; sau tín hiệu, tắt cảnh báo rồi đi tiếp.</div>}
 </>;
}
