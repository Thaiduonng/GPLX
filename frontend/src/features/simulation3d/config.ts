import type { KeyMap, Layout, LessonId, LicenseClass, VehicleSpec } from './types.ts';
// INTERNAL_RULE: illustrative vehicle dimensions/force and sample layout, not homologated vehicles or a certified test center.
export const vehicles: Record<LicenseClass, VehicleSpec> = {
 B: { code:'B',label:'Ô tô con',kind:'car',length:4.5,width:1.8,height:1.5,wheelbase:2.65,mass:1450,driveForce:4600,maxSteer:0.58,color:0x1767dd },
 C1: { code:'C1',label:'Xe tải vừa',kind:'truck',length:6.5,width:2.2,height:2.8,wheelbase:3.8,mass:5200,driveForce:16500,maxSteer:0.52,color:0xf0a538 },
 C: { code:'C',label:'Xe tải lớn',kind:'truck',length:8.4,width:2.5,height:3.3,wheelbase:4.8,mass:10000,driveForce:31000,maxSteer:0.5,color:0xe87542 },
 D1: { code:'D1',label:'Xe khách nhỏ',kind:'bus',length:6.2,width:2.1,height:2.65,wheelbase:3.7,mass:4100,driveForce:13500,maxSteer:0.56,color:0x20a38e },
 D2: { code:'D2',label:'Xe khách vừa',kind:'bus',length:8.5,width:2.45,height:3.15,wheelbase:4.9,mass:7800,driveForce:25000,maxSteer:0.52,color:0x7161cf },
 D: { code:'D',label:'Xe khách lớn',kind:'bus',length:11.5,width:2.5,height:3.5,wheelbase:6.3,mass:12500,driveForce:39000,maxSteer:0.5,color:0x1887a0 },
};
export const lessonNames: Record<LessonId, string> = { departure:'Xuất phát',pedestrian:'Dừng nhường người đi bộ',hill:'Dừng & khởi hành ngang dốc' };
export const defaultKeys: KeyMap = { accelerate:'KeyW',decelerate:'KeyS',left:'KeyA',right:'KeyD',brake:'Space',reverse:'KeyR',forward:'KeyF',handbrake:'KeyP',signalLeft:'KeyQ',signalRight:'KeyE',camera:'KeyC',shiftUp:'KeyX',shiftDown:'KeyZ',engine:'KeyI',seatbelt:'KeyB',hazard:'KeyH' };
export const actionNames: Record<keyof KeyMap, string> = { accelerate:'Ga',decelerate:'Giảm ga / phanh nhẹ',left:'Lái trái',right:'Lái phải',brake:'Phanh',reverse:'Số lùi',forward:'Số tiến',handbrake:'Phanh tay',signalLeft:'Xi nhan trái',signalRight:'Xi nhan phải',camera:'Đổi camera',shiftUp:'Tăng số',shiftDown:'Giảm số',engine:'Tắt / khởi động máy',seatbelt:'Dây an toàn',hazard:'Đèn cảnh báo nguy hiểm' };
export const sampleLayout: Layout = { version:1,id:'sample-yard-v1',name:'Sân mẫu An Tâm',laneWidth:8,length:150,startLine:14,pedestrianLine:44,hillStart:64,hillStop:76,hillCrest:86,hillEnd:108,hillHeight:2.4,finish:122,obstacles:[{x:5.8,s:32,radius:0.65},{x:-5.8,s:54,radius:0.65}] };
export function layoutForVehicle(spec: VehicleSpec): Layout { return { ...sampleLayout, laneWidth: spec.kind === 'car' ? 8 : 10, obstacles: sampleLayout.obstacles.map(item=>({...item,x:Math.sign(item.x)*(spec.kind==='car'?5.8:6.8)})) }; }
