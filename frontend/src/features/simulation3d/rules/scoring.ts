import type { Layout, LessonId, Mode, RuleSet, SessionState, VehicleSpec, VehicleState } from '../types.ts';
import { bodyCollision, frontPosition, wheelPositions } from '../physics/vehicle.ts';
import { lessonModules } from '../lessons/index.ts';
import type { Fault } from '../lessons/types.ts';
import { rulesApplicable } from './configuration.ts';
export function createSession(sequence: LessonId[], rules: RuleSet, hazardSeed: number): SessionState {
 return {elapsed:0,score:rules.initialScore,status:'ready',current:0,lessons:sequence.map(id=>({id,enteredAt:0,completedAt:null,stoppedAt:null,stopS:null,stopValid:false,startCrossed:false})),violations:[],ruleHits:{},overspeedTime:0,touching:false,collision:false,lastEngineOn:true,hazardAt:null,hazardDone:false,hazardSeed};
}
function applyFault(session: SessionState, fault: Fault, lesson: LessonId, rules: RuleSet, mode: Mode, applicable: boolean) {
 const rule=rules.rules[fault.id];if(!rule) return;
 const key=fault.key??`${lesson}:${fault.id}`;
 if(!fault.repeat && session.ruleHits[key]!==undefined) return;
 session.ruleHits[key]=session.elapsed;
 const enforce=applicable && rule.status==='VERIFIED';
 const points=enforce?rule.points:0;
 session.score=Math.max(0,session.score-points);
 session.violations.push({id:`${key}:${session.violations.length}`,ruleId:fault.id,lesson,time:session.elapsed,points,message:rule.label,suspend:enforce&&rule.suspend,source:rule.source});
 if(mode==='exam' && enforce && (rule.suspend || session.score<rules.passScore)) session.status='suspended';
}
export function evaluateSession(session: SessionState, vehicle: VehicleState, previous: VehicleState, spec: VehicleSpec, layout: Layout, rules: RuleSet, mode: Mode, dt: number, hazards: boolean, applicable=rulesApplicable(rules)): void {
 if(session.status!=='running') return;
 session.elapsed+=dt;
 const progress=session.lessons[session.current];
 const lesson=progress?.id??session.lessons.at(-1)!.id;
 const faults: Fault[]=[];
 const wheels=wheelPositions(vehicle,spec);
 const touching=wheels.some(w=>Math.abs(w.x)>layout.laneWidth/2-0.12);
 if(touching && !session.touching) faults.push({id:'line',repeat:true});
 const curb=wheels.some(w=>Math.abs(w.x)>layout.laneWidth/2+0.22);
 if(curb) faults.push({id:'curb'});
 const collision=layout.obstacles.some(o=>bodyCollision(vehicle,spec,o));
 if(collision&&!session.collision) faults.push({id:'collision',repeat:true});
 if(Math.cos(vehicle.heading)<0 && Math.abs(vehicle.speed)>0.5) faults.push({id:'route'});
 if(session.lastEngineOn && !vehicle.engineOn) faults.push({id:'stall',repeat:true});
 if(vehicle.rpm>rules.maxRpm && previous.rpm<=rules.maxRpm) faults.push({id:'rpm',repeat:true});
 if(Math.abs(vehicle.speed)*3.6>rules.profiles[spec.code].speedLimit) session.overspeedTime+=dt;else session.overspeedTime=0;
 const speedPeriod=rules.rules.overspeed!.repeatSeconds!;
 if(session.overspeedTime>=speedPeriod) {faults.push({id:'overspeed',repeat:true});session.overspeedTime-=speedPeriod;}
 session.touching=touching;session.collision=collision;session.lastEngineOn=vehicle.engineOn;
 if(progress && lessonModules[progress.id].evaluate({vehicle,previous,spec,layout,rules,session,progress,faults})) {
  progress.completedAt=session.elapsed;session.current++;
  const next=session.lessons[session.current];if(next) next.enteredAt=session.elapsed;
 }
 if(hazards&&session.lessons.length>1) evaluateHazard(session,vehicle,frontPosition(vehicle,spec),layout.pedestrianLine+spec.length+3,rules,faults);
 for(const fault of faults) applyFault(session,fault,lesson,rules,mode,applicable);
 if(session.status==='running' && session.current>=session.lessons.length && (mode==='practice'||frontPosition(vehicle,spec)>layout.finish)) session.status='completed';
 // Resource guard for unattended practice; not a legal deduction or official time limit.
 if(session.elapsed>1800 && session.status==='running') session.status='aborted';
}
function evaluateHazard(s: SessionState,v: VehicleState,front: number,trigger: number,rules: RuleSet,faults: Fault[]) {
 if(s.hazardDone) return;
 if(s.hazardAt===null && front>=trigger+s.hazardSeed) s.hazardAt=s.elapsed;
 if(s.hazardAt===null) return;
 const elapsed=s.elapsed-s.hazardAt;
 if(elapsed>rules.hazardStopSeconds && Math.abs(v.speed)>0.025) faults.push({id:'hazard_stop'});
 if(elapsed>rules.hazardLightSeconds && !v.hazard) faults.push({id:'hazard_lights'});
 if(elapsed>7 && Math.abs(v.speed)<0.025 && v.hazard) s.ruleHits.hazardResponded=s.elapsed;
 if(s.ruleHits.hazardResponded!==undefined && !v.hazard) s.hazardDone=true;
 if(elapsed>8 && Math.abs(v.speed)>0.2 && v.hazard) {faults.push({id:'hazard_clear'});s.hazardDone=true;}
 if(elapsed>15) s.hazardDone=true;
}
