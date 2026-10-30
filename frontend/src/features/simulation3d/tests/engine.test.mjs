import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { vehicles, sampleLayout, defaultKeys, layoutForVehicle } from '../config.ts';
import { integrateVehicle, createVehicle, frontPosition, roadHeight, roadGrade, bodyCollision, wheelPositions } from '../physics/vehicle.ts';
import { createSession, evaluateSession } from '../rules/scoring.ts';
import { validateRules, rulesApplicable } from '../rules/configuration.ts';
import { parseLayout } from '../runtime/layout.ts';
import { SimulationController } from '../runtime/controller.ts';
import { remapKey } from '../runtime/input.ts';
import { parseReplay } from '../persistence/history.ts';
const rules=validateRules(JSON.parse(readFileSync(new URL('../../../../public/simulation3d/rules-2026-10.json',import.meta.url),'utf8')));
const idle={accelerate:false,decelerate:false,left:false,right:false,brake:false};
const spec=vehicles.B,l=sampleLayout;
const at=(front,speed=0)=>({...createVehicle(spec,front),speed,handbrake:false,seatbelt:true});
const make=(id='departure')=>({...createSession([id],rules,0.5),status:'running'});
const evaluate=(s,v,dt=1/60,mode='exam',previous=v,applicable=true)=>evaluateSession(s,v,previous,spec,l,rules,mode,dt,false,applicable);
for(const spec of Object.values(vehicles)) test(`physical forward/reverse/braking for ${spec.code}`,()=>{
 let v={...createVehicle(spec,11),handbrake:false};const start=v.s;
 for(let i=0;i<120;i++)v=integrateVehicle(v,{...idle,accelerate:true},spec,layoutForVehicle(spec),1/60);
 assert.ok(v.s>start+1);assert.ok(v.speed>0);
 for(let i=0;i<180;i++)v=integrateVehicle(v,{...idle,brake:true},spec,layoutForVehicle(spec),1/60);
 assert.equal(v.speed,0);v.gear=-1;const before=v.s;
 for(let i=0;i<60;i++)v=integrateVehicle(v,{...idle,accelerate:true},spec,layoutForVehicle(spec),1/60);
 assert.ok(v.s<before);assert.ok(v.speed<0);
});
test('handbrake holds vehicle on physical hill; release allows rollback',()=>{
 let v=createVehicle(spec,76);v.s=74;
 for(let i=0;i<120;i++)v=integrateVehicle(v,idle,spec,l,1/60);
 assert.equal(v.s,74);assert.equal(v.speed,0);v.handbrake=false;
 for(let i=0;i<120;i++)v=integrateVehicle(v,idle,spec,l,1/60);
 assert.ok(v.s<73);assert.ok(v.speed<0);
});
test('steering requires speed, reverses yaw in reverse and turning radius differs by class',()=>{
 const stationary=integrateVehicle(createVehicle(spec,11),{...idle,right:true},spec,l,1/60);assert.equal(stationary.heading,0);
 const b=integrateVehicle({...at(11,3),steering:.3},{...idle,right:true},spec,l,1/60);
 const d=integrateVehicle({...createVehicle(vehicles.D,11),speed:3,handbrake:false,steering:.3},{...idle,right:true},vehicles.D,l,1/60);
 assert.ok(b.heading>d.heading);assert.ok(integrateVehicle({...at(11,-3),steering:.3},{...idle,right:true},spec,l,1/60).heading<0);
});
test('hill heights continuous and slopes have correct sign',()=>{assert.equal(roadHeight(l.hillStart,l),0);assert.equal(roadHeight(l.hillCrest,l),l.hillHeight);assert.equal(roadHeight(l.hillEnd,l),0);assert.ok(roadGrade(75,l)>0);assert.ok(roadGrade(95,l)<0);});
test('body and wheel sensors include rotated footprint, not just center',()=>{const v={...at(20),heading:Math.PI/2};assert.equal(wheelPositions(v,spec).length,4);assert.ok(bodyCollision(v,spec,{x:2,s:v.s,radius:.4}));assert.equal(bodyCollision(v,spec,{x:6,s:v.s,radius:.4}),false);});
test('departure penalizes missing belt and indicator once at line',()=>{const s=make(),v={...at(14.1),seatbelt:false};evaluate(s,v);assert.equal(s.score,90);evaluate(s,v);assert.equal(s.score,90);});
test('departure requires indicator cancellation and completes at 5m',()=>{const s=make();evaluate(s,{...at(14.1),signal:'left'});evaluate(s,{...at(19.1),signal:'left'});assert.equal(s.score,95);assert.equal(s.lessons[0].completedAt!==null,true);});
test('start delay deduction once, 30 second suspension',()=>{const s=make();s.elapsed=20.1;evaluate(s,at(11));evaluate(s,at(11));assert.equal(s.score,95);s.elapsed=30.1;evaluate(s,at(11));assert.equal(s.status,'suspended');});
test('pedestrian valid stop uses bumper and accepts tolerance boundary',()=>{const s=make('pedestrian');evaluate(s,at(l.pedestrianLine-rules.stopTolerance));assert.equal(s.lessons[0].stopValid,true);evaluate(s,at(52,1),1/60,'practice');assert.equal(s.status,'completed');assert.equal(s.score,100);});
test('pedestrian missed or overshot stop penalizes once',()=>{const s=make('pedestrian');evaluate(s,at(44.1,2));evaluate(s,at(44.2,2));assert.equal(s.score,95);assert.equal(s.violations.length,1);});
test('stop before tolerance is not falsely accepted',()=>{const s=make('pedestrian');evaluate(s,at(l.pedestrianLine-.51));assert.equal(s.lessons[0].stopValid,false);});
test('hill crossing without stop suspends; practice continues after critical fault',()=>{
 const s=make('hill');evaluate(s,at(76.1,2));assert.equal(s.status,'suspended');
 const practice=make('hill');evaluate(practice,at(76.1,2),1/60,'practice');assert.equal(practice.status,'running');assert.ok(practice.violations[0].suspend);
});
test('hill detects rollback over threshold and restart timeout',()=>{
 const s=make('hill');evaluate(s,at(75.75));evaluate(s,at(75.2,-.1));assert.equal(s.status,'suspended');assert.equal(s.violations.at(-1).ruleId,'rollback');
 const t=make('hill');evaluate(t,at(75.75));t.elapsed=31;evaluate(t,at(75.75));assert.equal(t.violations.at(-1).ruleId,'hill_timeout');
});
test('valid hill stop and restart completes module',()=>{const s=make('hill');evaluate(s,at(75.75));evaluate(s,at(77,1));evaluate(s,at(l.hillEnd+spec.length+1,1),1/60,'practice');assert.equal(s.status,'completed');assert.equal(s.score,100);});
test('speed repeats per 3 seconds rather than per frame',()=>{const s=make('pedestrian');for(let i=0;i<361;i++)evaluate(s,at(30,8));assert.equal(s.violations.filter(v=>v.ruleId==='overspeed').length,2);assert.equal(s.score,98);});
test('rpm and engine stall use rising/falling edges',()=>{
 const s=make('pedestrian');evaluate(s,{...at(30),rpm:4200},1/60,'practice',{...at(30),rpm:3900});evaluate(s,{...at(30),rpm:4200});assert.equal(s.score,95);
 evaluate(s,{...at(30),engineOn:false,rpm:0},1/60,'practice');evaluate(s,{...at(30),engineOn:false,rpm:0},1/60,'practice');assert.equal(s.score,90);
});
test('line contact is a zero-point advisory; curb suspends',()=>{const s=make('pedestrian');evaluate(s,{...at(30),x:3.2});assert.ok(s.violations.some(v=>v.ruleId==='line'));assert.equal(s.score,100);evaluate(s,{...at(30),x:3.6});assert.equal(s.status,'suspended');});
test('unverified/expired rules never deduct or suspend',()=>{const s=make();s.elapsed=31;evaluate(s,{...at(16),seatbelt:false},1/60,'exam',at(11),false);assert.equal(s.score,100);assert.equal(s.status,'running');assert.equal(rulesApplicable(rules,'2027-03-01'),false);assert.equal(rulesApplicable(rules,'2026-10-29'),true);assert.equal(rulesApplicable({...rules,status:'NEEDS_VERIFICATION'},'2026-10-29'),false);});
test('score deductions use configuration and stop below threshold',()=>{const custom=structuredClone(rules);custom.rules.belt.points=25;const s=make();evaluateSession(s,{...at(14.1),seatbelt:false,signal:'left'},at(11),spec,l,custom,'exam',1/60,false,true);assert.equal(s.score,75);assert.equal(s.status,'suspended');});
test('layout rejects NaN, reversed checkpoints, excessive size and steep hill',()=>{assert.deepEqual(parseLayout(l),l);for(const patch of [{hillStop:12},{length:10000},{laneWidth:NaN},{hillHeight:100}])assert.throws(()=>parseLayout({...l,...patch}));});
test('key remapping rejects collisions and reserved navigation keys',()=>{assert.throws(()=>remapKey(defaultKeys,'accelerate','Tab'));assert.throws(()=>remapKey(defaultKeys,'accelerate','KeyA'));assert.equal(remapKey(defaultKeys,'accelerate','ArrowUp').accelerate,'ArrowUp');});
test('runtime uses capped fixed-step delta and records only while running',()=>{const c=new SimulationController(spec,rules,'practice',null,l);c.start();c.update(4,500);assert.ok(c.session.elapsed<=.101);c.pause();const elapsed=c.session.elapsed;c.update(1,1000);assert.equal(c.session.elapsed,elapsed);});
test('save snapshot and replay are independent and never rescore',()=>{const c=new SimulationController(spec,rules,'practice',null,l);c.start();c.action('handbrake');c.pressed.add('KeyW');for(let i=0;i<30;i++)c.update(.05,i*50);const run=c.finishRun(9);assert.ok(run.frames.length>5);const original=JSON.stringify(run);c.loadReplay(run);c.replayTime=.5;c.update(0,2000);assert.equal(JSON.stringify(run),original);assert.equal(c.replayTime,.5);assert.equal(c.snapshot().replay,true);assert.deepEqual(parseReplay(run,9),run);assert.throws(()=>parseReplay(run,10));const corrupt=structuredClone(run);corrupt.frames[0].vehicle.s=NaN;assert.throws(()=>parseReplay(corrupt,9));});
test('all three lessons complete in correct order; no skipped phase',()=>{
 const s={...createSession(['departure','pedestrian','hill'],rules,.5),status:'running'};
 evaluate(s,{...at(14.1),signal:'left'});evaluate(s,at(19.1));assert.equal(s.current,1);
 evaluate(s,at(43.75));evaluate(s,at(52,1));assert.equal(s.current,2);
 evaluate(s,at(75.75));evaluate(s,at(77,1));evaluate(s,at(123,1));assert.equal(s.current,3);assert.equal(s.status,'completed');assert.equal(s.score,100);
});

for(const spec of Object.values(vehicles)) test(`physical driving completes three modules for ${spec.code} without teleporting`,()=>{
 const l=layoutForVehicle(spec);
 const c=new SimulationController(spec,rules,'practice',null,l);c.action('seatbelt');c.action('handbrake');c.action('signalLeft');c.start();
 for(let i=0;i<30000&&c.session.status==='running';i++){
  const progress=c.session.lessons[c.session.current],front=frontPosition(c.vehicle,spec);let target=4;
  if(front>l.startLine+.5&&c.vehicle.signal==='left')c.action('signalLeft');
  if(progress&&(progress.id==='pedestrian'||progress.id==='hill')&&!progress.stopValid){
   const line=progress.id==='pedestrian'?l.pedestrianLine:l.hillStop;
   const distance=line-front-.25;target=Math.min(4,Math.sqrt(2*1.2*Math.max(0,distance)));
  }
  c.pressed.clear();
  if(target<.03)c.pressed.add(c.keys.brake);
  else if(c.vehicle.speed<target-.08)c.pressed.add(c.keys.accelerate);
  else if(c.vehicle.speed>target+.08)c.pressed.add(c.keys.decelerate);
  c.update(1/60,i*1000/60);
 }
 assert.equal(c.session.status,'completed',JSON.stringify(c.session));
 assert.equal(c.session.current,3);assert.equal(c.session.score,100,JSON.stringify(c.session.violations));
});

test('per-class regulation profiles preserve distinct parking, counts and limits',()=>{
 assert.equal(rules.profiles.B.fullSequence.length,11);assert.equal(rules.profiles.C1.fullSequence.length,10);
 assert.ok(rules.profiles.C1.fullSequence.includes('parking_vertical'));assert.ok(!rules.profiles.C.fullSequence.includes('parking_vertical'));
 assert.notEqual(rules.profiles.B.speedLimit,rules.profiles.C.speedLimit);
 const bad=structuredClone(rules);delete bad.profiles.D;assert.throws(()=>validateRules(bad));
});
test('replay hides violations and completion before their event time',()=>{
 const c=new SimulationController(spec,rules,'practice',null,l);c.start();c.update(.1,100);const run=c.finishRun(9);
 run.result.violations.push({id:'later',ruleId:'rpm',lesson:'departure',time:5,points:5,message:'later',suspend:false,source:'unit'});
 run.result.lessons[0].completedAt=5;const original=structuredClone(run);
 c.loadReplay(run);c.update(0,200);assert.equal(c.session.violations.length,0);assert.equal(c.session.lessons[0].completedAt,null);assert.deepEqual(run,original);
});

test('gear direction cannot flip while moving; high-gear hill load can stall',()=>{
 const c=new SimulationController(spec,rules,'practice','hill',l);c.vehicle.speed=2;c.action('reverse');assert.equal(c.vehicle.gear,1);c.vehicle.speed=0;c.action('reverse');assert.equal(c.vehicle.gear,-1);
 let v={...at(76),gear:5,throttle:1};for(let i=0;i<90;i++)v=integrateVehicle(v,{...idle,accelerate:true,brake:true},spec,l,1/60);assert.equal(v.engineOn,false);
});
test('hazard timing and penalties come from verified configuration',()=>{
 const s={...createSession(['departure','pedestrian','hill'],rules,0),status:'running',current:2};
 const drive=at(55,1);evaluateSession(s,drive,drive,spec,l,rules,'practice',1/60,true,true);assert.notEqual(s.hazardAt,null);
 s.elapsed=s.hazardAt+rules.hazardLightSeconds+1;evaluateSession(s,drive,drive,spec,l,rules,'practice',1/60,true,true);
 assert.ok(s.violations.some(v=>v.ruleId==='hazard_stop'&&v.points===10));assert.ok(s.violations.some(v=>v.ruleId==='hazard_lights'&&v.points===10));
});

test('replay import rejects prototype keys and malformed display metadata',()=>{
 const c=new SimulationController(spec,rules,'practice',null,l);c.start();c.update(.1,100);const run=c.finishRun(9);
 assert.throws(()=>parseReplay({...run,vehicleClass:'__proto__'},9));
 const bad=structuredClone(run);bad.result.violations.push({id:'bad',message:{html:'bad'},source:'test',suspend:false,time:0,points:0});assert.throws(()=>parseReplay(bad,9));
});
