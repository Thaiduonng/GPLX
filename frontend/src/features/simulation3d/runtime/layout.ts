import type { Layout } from '../types.ts';
// MVP import contract: surveyed straight three-lesson corridor in metres, not arbitrary CAD/mesh files.
export function parseLayout(value: unknown): Layout {
 if(!value || typeof value!=='object') throw new Error('Sơ đồ phải là đối tượng JSON.');
 const v=value as Layout;
 if(v.version!==1 || typeof v.id!=='string' || v.id.length>80 || typeof v.name!=='string' || v.name.length>100) throw new Error('Sai phiên bản hoặc tên sân.');
 for(const key of ['laneWidth','length','startLine','pedestrianLine','hillStart','hillStop','hillCrest','hillEnd','hillHeight','finish'] as const) if(!Number.isFinite(v[key])) throw new Error('Tọa độ sân không hợp lệ.');
 if(v.laneWidth<6 || v.laneWidth>16 || v.length>500 || v.length<100 || v.hillHeight<0.5 || v.hillHeight>5) throw new Error('Kích thước sân nằm ngoài giới hạn MVP.');
 const ordered=[v.startLine,v.pedestrianLine,v.hillStart,v.hillStop,v.hillCrest,v.hillEnd,v.finish,v.length];
 if(ordered[0]!<10 || ordered.some((n,i)=>i>0&&n-ordered[i-1]!<5)) throw new Error('Thứ tự vùng bài thi không hợp lệ hoặc quá sát nhau.');
 if((v.hillHeight/(v.hillCrest-v.hillStart))>0.2) throw new Error('Dốc quá lớn so với mô hình MVP.');
 if(!Array.isArray(v.obstacles)||v.obstacles.length>60||v.obstacles.some(o=>!Number.isFinite(o.x)||!Number.isFinite(o.s)||!Number.isFinite(o.radius)||Math.abs(o.x)>50||o.s<0||o.s>v.length||o.radius<=0||o.radius>3)) throw new Error('Vật cản không hợp lệ.');
 return structuredClone(v);
}
