export interface Vehicle { label: string; length: number; width: number; wheelbase: number; maxSpeed: number; reverse: boolean }
// INTERNAL_RULE: dimensions and speed are illustrative simulation units, not legal specifications.
export const vehicles: Record<string, Vehicle> = {
  A1: { label: 'Xe mô tô nhỏ', length: 22, width: 10, wheelbase: 16, maxSpeed: 65, reverse: false },
  A: { label: 'Xe mô tô', length: 26, width: 12, wheelbase: 19, maxSpeed: 75, reverse: false },
  B: { label: 'Ô tô con', length: 40, width: 20, wheelbase: 28, maxSpeed: 70, reverse: true },
  B2: { label: 'Ô tô con (danh mục cũ)', length: 40, width: 20, wheelbase: 28, maxSpeed: 70, reverse: true },
  C1: { label: 'Xe tải vừa', length: 52, width: 24, wheelbase: 36, maxSpeed: 60, reverse: true },
  C: { label: 'Xe tải lớn', length: 64, width: 28, wheelbase: 44, maxSpeed: 50, reverse: true },
};
export interface Point { x: number; y: number }
export interface Lesson { id: string; name: string; description: string; points: Point[] }
export const lessons: Lesson[] = [
  { id: 'turns', name: 'Làm quen & chuyển hướng', description: 'Đi qua các điểm theo thứ tự, giảm ga trước khi chuyển hướng.', points: [{x:180,y:400},{x:600,y:400},{x:600,y:150},{x:180,y:150}] },
  { id: 'slalom', name: 'Điều khiển đường zích zắc', description: 'Đánh lái nhẹ và điều chỉnh tốc độ để lần lượt tới các điểm.', points: [{x:180,y:400},{x:300,y:240},{x:420,y:400},{x:540,y:240},{x:650,y:400}] },
];
export interface DriveState extends Point { heading: number; speed: number; elapsed: number; next: number; contacts: number; touching: boolean; finished: boolean }
export interface Controls { throttle: boolean; brake: boolean; left: boolean; right: boolean; reverse: boolean }
export const initialState = (): DriveState => ({ x: 100, y: 400, heading: 0, speed: 0, elapsed: 0, next: 0, contacts: 0, touching: false, finished: false });
export function step(state: DriveState, input: Controls, vehicle: Vehicle, lesson: Lesson, delta: number): DriveState {
  if (state.finished) return state;
  const dt = Math.max(0, Math.min(delta, 0.05));
  const direction = input.reverse && vehicle.reverse ? -1 : 1;
  let speed = state.speed;
  if (input.brake || (input.throttle && speed * direction < 0)) {
    speed = Math.sign(speed) * Math.max(0, Math.abs(speed) - 100 * dt);
  } else if (input.throttle) {
    speed = Math.max(-vehicle.maxSpeed / 2, Math.min(vehicle.maxSpeed, speed + direction * 35 * dt));
  } else speed = Math.sign(speed) * Math.max(0, Math.abs(speed) - 15 * dt);
  const steering = Number(input.right) - Number(input.left);
  const heading = state.heading + speed / vehicle.wheelbase * Math.tan(steering * 0.55) * dt;
  const x = state.x + Math.cos(heading) * speed * dt;
  const y = state.y + Math.sin(heading) * speed * dt;
  const extentX = Math.abs(Math.cos(heading)) * vehicle.length / 2 + Math.abs(Math.sin(heading)) * vehicle.width / 2;
  const extentY = Math.abs(Math.sin(heading)) * vehicle.length / 2 + Math.abs(Math.cos(heading)) * vehicle.width / 2;
  const touching = x - extentX < 40 || x + extentX > 760 || y - extentY < 60 || y + extentY > 490;
  const target = lesson.points[state.next];
  const next = target && Math.hypot(x - target.x, y - target.y) < 30 ? state.next + 1 : state.next;
  return { x: Math.max(40 + extentX, Math.min(760 - extentX, x)), y: Math.max(60 + extentY, Math.min(490 - extentY, y)), heading,
    speed: touching ? 0 : speed, elapsed: state.elapsed + dt, next, contacts: state.contacts + Number(touching && !state.touching), touching, finished: next === lesson.points.length };
}
