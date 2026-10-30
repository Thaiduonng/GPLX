import type { SavedRun } from '../types.ts';
import { vehicles } from '../config.ts';
import { parseLayout } from '../runtime/layout.ts';
import { validateRules } from '../rules/configuration.ts';
function openHistory(): Promise<IDBDatabase> {return new Promise((resolve,reject)=>{const request=indexedDB.open('gplx-simulation3d',1);request.onupgradeneeded=()=>{request.result.createObjectStore('runs',{keyPath:'id'}).createIndex('ownerId','ownerId');};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(new Error('Không mở được lịch sử trên trình duyệt.'));});}
export async function listRuns(ownerId: number): Promise<SavedRun[]> {
 const db=await openHistory();try{return await new Promise((resolve,reject)=>{const request=db.transaction('runs').objectStore('runs').index('ownerId').getAll(ownerId);request.onsuccess=()=>resolve((request.result as SavedRun[]).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)));request.onerror=()=>reject(new Error('Không đọc được lịch sử.'));});}finally{db.close();}
}
export async function saveRun(run: SavedRun): Promise<void> {
 const existing=await listRuns(run.ownerId);const db=await openHistory();
 try{await new Promise<void>((resolve,reject)=>{const transaction=db.transaction('runs','readwrite');const store=transaction.objectStore('runs');store.put(run);for(const old of existing.slice(4))store.delete(old.id);transaction.oncomplete=()=>resolve();transaction.onerror=()=>reject(new Error('Không lưu được kết quả. Bạn vẫn có thể tải bản ghi JSON.'));transaction.onabort=()=>reject(new Error('Lưu lịch sử bị hủy.'));});}finally{db.close();}
}
export function downloadJson(value: unknown,name: string){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export function parseReplay(value: unknown,ownerId: number): SavedRun {
 if(!value||typeof value!=='object')throw new Error('Bản ghi không hợp lệ.');const r=value as SavedRun;
 if(r.schema!==1||!Object.hasOwn(vehicles,r.vehicleClass)||r.ownerId!==ownerId||!r.result||!Array.isArray(r.frames)||r.frames.length<1||r.frames.length>18002||!['exam','practice'].includes(r.mode))throw new Error('Bản ghi sai phiên bản, tài khoản hoặc số lượng khung hình.');
 parseLayout(r.layout);validateRules(r.rulesSnapshot);
 if(!Array.isArray(r.result.violations)||!Array.isArray(r.result.lessons)||r.result.lessons.length<1||r.result.lessons.length>3||r.result.lessons.some(l=>!['departure','pedestrian','hill'].includes(l.id)))throw new Error('Dữ liệu bài thi không hợp lệ.');
 if(typeof r.id!=='string'||r.id.length>120||typeof r.createdAt!=='string'||!Number.isFinite(Date.parse(r.createdAt))||!Number.isFinite(r.result.score)||r.result.score<0||r.result.score>100||!Number.isFinite(r.result.elapsed)||r.result.elapsed<0||r.result.elapsed>1801||!['ready','running','paused','completed','suspended','aborted'].includes(r.result.status)||r.result.violations.length>10000)throw new Error('Thông tin kết quả không hợp lệ.');
 for(const fault of r.result.violations)if(!fault||typeof fault.id!=='string'||typeof fault.message!=='string'||typeof fault.source!=='string'||typeof fault.suspend!=='boolean'||!Number.isFinite(fault.time)||fault.time<0||fault.time>1801||!Number.isFinite(fault.points)||fault.points<0||fault.points>100)throw new Error('Nhật ký lỗi không hợp lệ.');
 for(const lesson of r.result.lessons)for(const time of [lesson.enteredAt,lesson.completedAt,lesson.stoppedAt])if(time!==null&&(!Number.isFinite(time)||time<0||time>1801))throw new Error('Thời gian bài thi không hợp lệ.');
 let previous=-1;for(const frame of r.frames){
  if(!Number.isFinite(frame.t)||frame.t<previous||frame.t<0||frame.t>1801||!Number.isFinite(frame.score)||frame.score<0||frame.score>100||!Number.isInteger(frame.lesson)||frame.lesson<0||frame.lesson>3||!frame.vehicle)throw new Error('Khung hình phát lại không hợp lệ.');
  const v=frame.vehicle;for(const key of ['x','s','heading','speed','steering','throttle','rpm','gear','stallTime','wheelAngle'] as const)if(!Number.isFinite(v[key])||Math.abs(v[key])>100000)throw new Error('Tọa độ phát lại không hợp lệ.');
  if(['handbrake','engineOn','seatbelt','hazard'].some(key=>typeof v[key as 'handbrake']!=='boolean'))throw new Error('Thiếu trạng thái xe.');
  if(![-1,1,2,3,4,5].includes(v.gear)||!['off','left','right'].includes(v.signal))throw new Error('Trạng thái xe không hợp lệ.');previous=frame.t;
 }
 return structuredClone(r);
}
