import { defaultKeys, layoutForVehicle } from '../config.ts';
import { lessonModules } from '../lessons/index.ts';
import { createVehicle, integrateVehicle } from '../physics/vehicle.ts';
import { createSession, evaluateSession } from '../rules/scoring.ts';
import { rulesApplicable } from '../rules/configuration.ts';
import type { Action, CameraMode, HudSnapshot, KeyMap, Layout, LessonId, Mode, ReplayFrame, RuleSet, SavedRun, VehicleSpec } from '../types.ts';
export class SimulationController {
 spec: VehicleSpec; layout: Layout; rules: RuleSet; mode: Mode; practiceLesson: LessonId | null;
 vehicle; session; frames: ReplayFrame[]=[]; camera: CameraMode='chase'; keys: KeyMap={...defaultKeys};
 pressed=new Set<string>(); replay: SavedRun | null=null; replayTime=0; replayPlaying=false;
 private accumulator=0; private sampleClock=0; private lastSnapshot=0;
 onHud: ((hud: HudSnapshot)=>void) | null=null;
 constructor(spec: VehicleSpec,rules: RuleSet,mode: Mode,lesson: LessonId|null,layout=layoutForVehicle(spec),hazards=false) {
  this.spec=spec;this.rules=structuredClone(rules);this.mode=mode;this.practiceLesson=lesson;this.layout=structuredClone(layout);this.hazards=hazards;
  const sequence=mode==='practice'&&lesson?[lesson]:[...rules.profiles[spec.code].mvpSequence];
  this.vehicle=createVehicle(spec,lessonModules[sequence[0]!].spawnFront(layout));this.session=createSession(sequence,rules,Math.random());
 }
 hazards: boolean;
 start() {if(this.replay) {this.replayPlaying=!this.replayPlaying;return;}if(this.mode==='exam'&&!rulesApplicable(this.rules)) throw new Error('Bộ quy tắc hết thời hạn hoặc chưa xác minh. Chỉ có thể luyện tập.');if(['ready','paused'].includes(this.session.status)) {this.session.status='running';if(!this.frames.length)this.record();}else this.pause();this.emit();}
 pause() {if(this.session.status==='running')this.session.status='paused';this.replayPlaying=false;this.pressed.clear();this.accumulator=0;this.emit();}
 action(action: Action) {
  if(action==='camera') {this.cycleCamera();return;}
  if(this.replay||!['ready','running','paused'].includes(this.session.status))return;
  const v=this.vehicle;
  if(action==='handbrake')v.handbrake=!v.handbrake;
  if(action==='seatbelt')v.seatbelt=!v.seatbelt;
  if(action==='engine'&&Math.abs(v.speed)<0.1)v.engineOn=!v.engineOn;
  if(action==='signalLeft')v.signal=v.signal==='left'?'off':'left';
  if(action==='signalRight')v.signal=v.signal==='right'?'off':'right';
  if(action==='hazard')v.hazard=!v.hazard;
  if(action==='reverse'&&Math.abs(v.speed)<0.1) {v.gear=-1;v.throttle=0;}
  if(action==='forward'&&Math.abs(v.speed)<0.1) {v.gear=1;v.throttle=0;}
  if(action==='shiftUp'&&v.gear>0)v.gear=Math.min(5,v.gear+1);
  if(action==='shiftDown'&&v.gear>0)v.gear=Math.max(1,v.gear-1);
  this.emit();
 }
 cycleCamera(){this.camera=this.camera==='chase'?'cabin':this.camera==='cabin'?'overhead':'chase';this.emit();}
 update(delta: number,now: number) {
  if(this.replay) {this.updateReplay(delta);if(now-this.lastSnapshot>100){this.emit();this.lastSnapshot=now;}return;}
  if(this.session.status!=='running')return;
  this.accumulator+=Math.min(delta,0.1);
  while(this.accumulator>=1/60 && this.session.status==='running') {
   const previous={...this.vehicle};
   const held=(action: Action)=>this.pressed.has(this.keys[action]);
   this.vehicle=integrateVehicle(this.vehicle,{accelerate:held('accelerate'),decelerate:held('decelerate'),brake:held('brake'),left:held('left'),right:held('right')},this.spec,this.layout,1/60);
   evaluateSession(this.session,this.vehicle,previous,this.spec,this.layout,this.rules,this.mode,1/60,this.hazards);
   this.sampleClock+=1/60;if(this.sampleClock>=0.1){this.record();this.sampleClock-=0.1;}
   this.accumulator-=1/60;
  }
  if(this.session.status!=='running'){this.record();this.pressed.clear();this.emit();}
  else if(now-this.lastSnapshot>100){this.emit();this.lastSnapshot=now;}
 }
 private record(){if(this.frames.length<18002)this.frames.push({t:this.session.elapsed,vehicle:{...this.vehicle},score:this.session.score,lesson:this.session.current});}
 private updateReplay(delta: number){
  if(!this.replay)return;
  const frames=this.replay.frames;
  if(this.replayPlaying)this.replayTime=Math.min(frames.at(-1)?.t??0,this.replayTime+Math.min(delta,0.1));
  let low=0,high=frames.length-1;while(low<high){const mid=Math.ceil((low+high)/2);if(frames[mid]!.t<=this.replayTime)low=mid;else high=mid-1;}
  const a=frames[low],b=frames[Math.min(low+1,frames.length-1)];if(!a||!b)return;
  const f=b.t>a.t?Math.max(0,Math.min(1,(this.replayTime-a.t)/(b.t-a.t))):0;
  this.vehicle={...a.vehicle,x:a.vehicle.x+(b.vehicle.x-a.vehicle.x)*f,s:a.vehicle.s+(b.vehicle.s-a.vehicle.s)*f,heading:a.vehicle.heading+(b.vehicle.heading-a.vehicle.heading)*f};
  this.session={...this.replay.result,elapsed:this.replayTime,score:a.score,current:a.lesson,violations:this.replay.result.violations.filter(v=>v.time<=this.replayTime),lessons:this.replay.result.lessons.map(l=>({...l,completedAt:l.completedAt!==null&&l.completedAt<=this.replayTime?l.completedAt:null,stopValid:l.stoppedAt!==null&&l.stoppedAt<=this.replayTime?l.stopValid:false}))};
  if(this.replayTime>=(frames.at(-1)?.t??0))this.replayPlaying=false;
 }
 loadReplay(run: SavedRun){this.pause();this.replay=run;this.layout=run.layout;this.rules=run.rulesSnapshot;this.session=structuredClone(run.result);this.replayTime=0;this.updateReplay(0);this.emit();}
 snapshot(): HudSnapshot {return {vehicle:{...this.vehicle},session:structuredClone(this.session),running:this.replay?this.replayPlaying:this.session.status==='running',camera:this.camera,replay:!!this.replay,replayTime:this.replayTime,replayDuration:this.replay?.frames.at(-1)?.t??0};}
 emit(){this.onHud?.(this.snapshot());}
 finishRun(ownerId: number): SavedRun {return {schema:1,id:crypto.randomUUID(),ownerId,createdAt:new Date().toISOString(),vehicleClass:this.spec.code,mode:this.mode,practiceLesson:this.practiceLesson,ruleVersion:this.rules.version,rulesSnapshot:structuredClone(this.rules),layout:structuredClone(this.layout),result:structuredClone(this.session),frames:structuredClone(this.frames)};}
}
