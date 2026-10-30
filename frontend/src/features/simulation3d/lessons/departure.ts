import { frontPosition } from '../physics/vehicle.ts';
import type { LessonModule } from './types.ts';
export const departure: LessonModule = {
 spawnFront: layout=>layout.startLine-3,
 evaluate: ({vehicle:v,spec,layout:l,session:s,progress:p,rules:r,faults})=>{
  const front=frontPosition(v,spec),elapsed=s.elapsed-p.enteredAt;
  if(!p.startCrossed && front>=l.startLine) {
   p.startCrossed=true;
   if(!v.seatbelt) faults.push({id:'belt'});
   if(v.signal!=='left') faults.push({id:'signal_missing'});
  }
  if(!p.startCrossed && elapsed>r.startWarnSeconds) faults.push({id:'start_delay'});
  if(!p.startCrossed && elapsed>r.startSuspendSeconds) faults.push({id:'start_timeout'});
  if(front>=l.startLine+r.signalCancelDistance) { if(v.signal==='left') faults.push({id:'signal_late'}); return true; }
  return false;
 }
};
