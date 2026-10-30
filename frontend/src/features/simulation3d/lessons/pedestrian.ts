import { frontPosition } from '../physics/vehicle.ts';
import type { LessonModule } from './types.ts';
export const pedestrian: LessonModule = {
 spawnFront: layout=>layout.pedestrianLine-12,
 evaluate: ({vehicle:v,spec,layout:l,rules:r,session:s,progress:p,faults})=>{
  const front=frontPosition(v,spec),distance=l.pedestrianLine-front;
  if(Math.abs(v.speed)<0.025 && distance>=0 && distance<=r.stopTolerance) {p.stopValid=true;p.stoppedAt??=s.elapsed;p.stopS=v.s;}
  if(front>l.pedestrianLine && !p.startCrossed) {p.startCrossed=true;if(!p.stopValid) faults.push({id:'pedestrian_stop'});}
  return front>l.pedestrianLine+spec.length+2;
 }
};
