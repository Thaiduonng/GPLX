import { frontPosition } from '../physics/vehicle.ts';
import type { LessonModule } from './types.ts';
export const hill: LessonModule = {
 spawnFront: layout=>layout.hillStart+1,
 evaluate: ({vehicle:v,spec,layout:l,rules:r,session:s,progress:p,faults})=>{
  const front=frontPosition(v,spec),distance=l.hillStop-front;
  if(Math.abs(v.speed)<0.025 && front>l.hillStart+2 && distance>=0 && distance<=3) {
   if(distance>r.stopTolerance) faults.push({id:'hill_early'});
   else {p.stopValid=true;p.stoppedAt??=s.elapsed;p.stopS??=v.s;}
  }
  if(p.stopValid && p.stopS!==null && v.s<p.stopS-r.rollbackLimit) faults.push({id:'rollback'});
  if(front>l.hillStop && !p.startCrossed) {p.startCrossed=true;if(!p.stopValid) faults.push({id:'hill_missed'});}
  if(p.stoppedAt!==null && !p.startCrossed && s.elapsed-p.stoppedAt>r.hillRestartSeconds) faults.push({id:'hill_timeout'});
  return p.startCrossed && front>l.hillEnd+spec.length;
 }
};
