import { test } from 'node:test';
import assert from 'node:assert/strict';
import { vehicles, lessons, initialState, step } from './engine.ts';
const idle = { throttle:false, brake:false, left:false, right:false, reverse:false };
test('accelerates forward and brakes without reversing', () => {
 let s=initialState(); for(let i=0;i<20;i++) s=step(s,{...idle,throttle:true},vehicles.B,lessons[0],0.05);
 assert.ok(s.x>100); assert.ok(s.speed>0);
 for(let i=0;i<30;i++) s=step(s,{...idle,brake:true},vehicles.B,lessons[0],0.05);
 assert.equal(s.speed,0);
});
test('motorcycle cannot reverse; car can reverse', () => {
 assert.ok(step(initialState(),{...idle,throttle:true,reverse:true},vehicles.B,lessons[0],0.05).speed<0);
 assert.ok(step(initialState(),{...idle,throttle:true,reverse:true},vehicles.A1,lessons[0],0.05).speed>=0);
});
test('steering requires motion and reverse changes steering direction', () => {
 assert.equal(step(initialState(),{...idle,right:true},vehicles.B,lessons[0],0.05).heading,0);
 assert.ok(step({...initialState(),speed:-10},{...idle,right:true},vehicles.B,lessons[0],0.05).heading<0);
});
test('vehicle footprint is contained and sustained contact counted once', () => {
 let s={...initialState(),x:739,speed:60};
 s=step(s,{...idle,throttle:true},vehicles.B,lessons[0],0.05);
 assert.equal(s.x,740); assert.equal(s.contacts,1);
 s=step(s,{...idle,throttle:true},vehicles.B,lessons[0],0.05); assert.equal(s.contacts,1);
});
test('checkpoints enforce order and completion freezes state', () => {
 let s=step({...initialState(),x:600},idle,vehicles.B,lessons[0],0.05); assert.equal(s.next,0);
 s=step({...initialState(),x:180,y:150,next:3},idle,vehicles.B,lessons[0],0.05);
 assert.equal(s.finished,true); assert.deepEqual(step(s,{...idle,throttle:true},vehicles.B,lessons[0],1),s);
});
test('long frames are clamped', () => { assert.equal(step(initialState(),idle,vehicles.C,lessons[0],10).elapsed,0.05); });
