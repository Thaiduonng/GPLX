import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { admissionService } from '../services/admissionService';
import type { LicenseCategory } from '../types/admission';
import { initialState, lessons, step, vehicles } from '../features/simulation/engine';
import type { Controls } from '../features/simulation/engine';
import styles from './DrivingSimulationPage.module.css';

const emptyControls = (): Controls => ({ throttle: false, brake: false, left: false, right: false, reverse: false });
const keys: Record<string, keyof Controls> = { ArrowUp: 'throttle', ArrowDown: 'brake', ArrowLeft: 'left', ArrowRight: 'right', ' ': 'brake' };
export default function DrivingSimulationPage() {
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);
  const [code, setCode] = useState('');
  const [lessonId, setLessonId] = useState('turns');
  const [state, setState] = useState(initialState);
  const [running, setRunning] = useState(false);
  const [reverse, setReverse] = useState(false);
  const controls = useRef<Controls>(emptyControls());
  const vehicle = vehicles[code];
  const lesson = lessons.find(item => item.id === lessonId) ?? lessons[0]!;
  const reset = () => { setRunning(false); setState(initialState()); controls.current = emptyControls(); setReverse(false); };

  useEffect(() => {
    let active = true;
    setLoading(true); setError(false);
    admissionService.getActiveCategories().then(items => {
      if (!active) return;
      setCategories(items.filter(item => item.active));
      setCode(items.find(item => item.active && vehicles[item.code])?.code ?? '');
    }).catch(() => { if (active) setError(true); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [reload]);

  useEffect(() => {
    if (!running || !vehicle) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const dt = (now - previous) / 1000; previous = now;
      setState(current => step(current, { ...controls.current, reverse }, vehicle, lesson, dt));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, vehicle, lesson, reverse]);

  useEffect(() => { if (state.finished) setRunning(false); }, [state.finished]);
  useEffect(() => {
    const pause = () => { controls.current = emptyControls(); setRunning(false); };
    const visibility = () => { if (document.hidden) pause(); };
    window.addEventListener('blur', pause); document.addEventListener('visibilitychange', visibility);
    return () => { window.removeEventListener('blur', pause); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  const pointer = (event: PointerEvent<HTMLButtonElement>, control: keyof Controls, down: boolean) => {
    if (down) event.currentTarget.setPointerCapture(event.pointerId);
    controls.current[control] = down;
  };
  return <div className={styles.page}>
    <header><span className={styles.eyebrow}>THỰC HÀNH TRỰC TUYẾN · XE ẢO 2D</span>
      <h1>Luyện sa hình, từng bước làm chủ tay lái</h1>
      <p>Chọn xe, làm quen điều khiển và đi qua các điểm dẫn đường theo thứ tự.</p>
    </header>
    <p className={styles.notice}>Bài luyện nội bộ (INTERNAL_RULE). Mô hình và thông số mang tính minh họa; không thay thế thực hành với giáo viên, không tính giờ DAT hoặc kết quả sát hạch.</p>
    {loading ? <p role="status">Đang tải danh mục hạng xe…</p> : error ? <div role="alert">Không tải được danh mục hạng xe. <button onClick={() => setReload(value => value + 1)}>Thử lại</button></div> : categories.length === 0 ? <p>Chưa có hạng GPLX đang hoạt động.</p> : <>
      <div className={styles.settings}>
        <label>Hạng GPLX<select value={code} onChange={event => { reset(); setCode(event.target.value); }}>
          <option value="" disabled>Chọn hạng xe</option>
          {categories.map(item => <option key={item.id} value={item.code}>{item.code} — {vehicles[item.code]?.label ?? 'Chưa hỗ trợ mô phỏng'}</option>)}
        </select></label>
        <label>Bài luyện<select value={lessonId} onChange={event => { reset(); setLessonId(event.target.value); }}>{lessons.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      </div>
      {!vehicle ? <p role="status">Hạng này chưa có cấu hình xe ảo. Vui lòng chọn hạng khác.</p> : <div className={styles.workspace} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { controls.current = emptyControls(); setRunning(false); } }}>
        <section className={styles.simulator} tabIndex={0} aria-label="Sân tập xe ảo. Bấm Bắt đầu rồi dùng phím mũi tên để lái."
          onKeyDown={event => { const control = keys[event.key]; if (control && event.target === event.currentTarget) { event.preventDefault(); controls.current[control] = true; } }}
          onKeyUp={event => { const control = keys[event.key]; if (control) { event.preventDefault(); controls.current[control] = false; } }}>
          <svg viewBox="0 0 800 550" role="img" aria-label={`Sân tập ${vehicle.label}, đã qua ${state.next} trên ${lesson.points.length} điểm`}>
            <defs><pattern id="sim-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#294653" strokeWidth="1" /></pattern></defs>
            <rect width="800" height="550" fill="#102a36" />
            <rect x="40" y="60" width="720" height="430" rx="4" fill="url(#sim-grid)" stroke="#cbd5e1" strokeWidth="3" />
            <text x="42" y="35" fill="#e2e8f0" fontSize="16">SÂN TẬP TỰ DO / {code}</text>
            <polyline points={['100,400', ...lesson.points.map(point => `${point.x},${point.y}`)].join(' ')} fill="none" stroke="#7896a5" strokeWidth="2" strokeDasharray="8 10" />
            {lesson.points.map((point, index) => <g key={index}><circle cx={point.x} cy={point.y} r="28" fill={index < state.next ? '#166534' : index === state.next ? '#1d4ed8' : '#263d4c'} stroke={index === state.next ? '#93c5fd' : '#7896a5'} strokeWidth="2" /><text x={point.x} y={point.y + 6} textAnchor="middle" fill="white" fontSize="18">{index + 1}</text></g>)}
            <g transform={`translate(${state.x} ${state.y}) rotate(${state.heading * 180 / Math.PI})`}>
              <rect x={-vehicle.length / 2} y={-vehicle.width / 2} width={vehicle.length} height={vehicle.width} rx="4" fill={state.touching ? '#fb7185' : '#38bdf8'} stroke="#f8fafc" strokeWidth="2" />
              <path d={`M ${vehicle.length / 2 - 8} -5 L ${vehicle.length / 2 - 2} 0 L ${vehicle.length / 2 - 8} 5`} fill="none" stroke="#102a36" strokeWidth="3" />
            </g>
            <text x="42" y="525" fill="#e2e8f0" fontSize="14">Mũi tên trên xe chỉ hướng đầu xe · Điểm xanh là mục tiêu tiếp theo</text>
          </svg>
          <div className={styles.actions}>
            <button disabled={state.finished} onClick={event => { controls.current = emptyControls(); setRunning(value => !value); event.currentTarget.closest('section')?.focus(); }}>{running ? 'Tạm dừng' : 'Bắt đầu / Tiếp tục'}</button>
            <button onClick={reset}>Luyện lại</button>
          </div>
        </section>
        <aside className={styles.panel}>
          <h2>{vehicle.label}</h2><p>{lesson.description}</p>
          <dl><div><dt>Điểm dẫn đường</dt><dd>{state.next}/{lesson.points.length}</dd></div><div><dt>Thời gian luyện</dt><dd>{Math.floor(state.elapsed)} giây</dd></div><div><dt>Tốc độ mô phỏng</dt><dd>{Math.abs(state.speed).toFixed(0)} đv/s</dd></div><div><dt>Lần chạm biên</dt><dd>{state.contacts}</dd></div></dl>
          <p role="status">{state.finished ? 'Hoàn thành bài luyện! Bạn có thể luyện lại để điều khiển mượt hơn.' : state.touching ? 'Xe chạm biên. Đổi hướng hoặc lùi để đưa xe vào sân.' : running ? 'Đang luyện — đi tới điểm màu xanh.' : 'Đang tạm dừng. Bấm Bắt đầu để lái xe.'}</p>
          <label>Hướng di chuyển<select disabled={!vehicle.reverse || Math.abs(state.speed) > 0.1} value={reverse ? 'R' : 'D'} onChange={event => { controls.current = emptyControls(); setReverse(event.target.value === 'R'); }}><option value="D">Tiến (D)</option>{vehicle.reverse && <option value="R">Lùi (R)</option>}</select></label>
          <p>Dừng xe hoàn toàn trước khi đổi hướng. Phím ↑ ga, ↓ hoặc Space phanh, ← → đánh lái. Chọn vùng sân tập để dùng bàn phím.</p>
          <div className={styles.controls} aria-label="Điều khiển cảm ứng">
            {([['left', 'Rẽ trái'], ['throttle', 'Giữ ga'], ['right', 'Rẽ phải'], ['brake', 'Phanh']] as const).map(([control, label]) => <button key={control} disabled={!running} onPointerDown={event => pointer(event, control, true)} onPointerUp={event => pointer(event, control, false)} onPointerCancel={event => pointer(event, control, false)} onLostPointerCapture={() => { controls.current[control] = false; }} onKeyDown={event => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); controls.current[control] = true; } }} onKeyUp={() => { controls.current[control] = false; }} onBlur={() => { controls.current[control] = false; }}>{label}</button>)}
          </div>
        </aside>
      </div>}
    </>}
  </div>;
}
