import type { DriveInput, Layout, VehicleSpec, VehicleState } from '../types.ts';
export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
export function roadHeight(s: number, layout: Layout): number {
 if(s<=layout.hillStart || s>=layout.hillEnd) return 0;
 if(s<layout.hillCrest) return (s-layout.hillStart)/(layout.hillCrest-layout.hillStart)*layout.hillHeight;
 return (layout.hillEnd-s)/(layout.hillEnd-layout.hillCrest)*layout.hillHeight;
}
export function roadGrade(s: number, layout: Layout): number {
 if(s>layout.hillStart && s<layout.hillCrest) return layout.hillHeight/(layout.hillCrest-layout.hillStart);
 if(s>=layout.hillCrest && s<layout.hillEnd) return -layout.hillHeight/(layout.hillEnd-layout.hillCrest);
 return 0;
}
export function createVehicle(spec: VehicleSpec, spawnFront: number): VehicleState {
 return {x:0,s:spawnFront-spec.length/2,heading:0,speed:0,steering:0,throttle:0,rpm:850,gear:1,handbrake:true,engineOn:true,seatbelt:false,signal:'off',hazard:false,stallTime:0,wheelAngle:0};
}
// Kinematic bicycle model, SI units, tire-grip limited yaw and longitudinal slope/drag/braking forces.
// Assisted clutch; no suspension/rollover simulation. Fixed dt is provided by the runtime.
export function integrateVehicle(state: VehicleState, input: DriveInput, spec: VehicleSpec, layout: Layout, dt: number): VehicleState {
 const throttle=clamp(state.throttle+(input.accelerate?1.8:input.decelerate?-3:-2)*dt,0,1);
 const steeringTarget=(Number(input.right)-Number(input.left))*spec.maxSteer/(1+Math.abs(state.speed)*0.075);
 const steering=state.steering+clamp(steeringTarget-state.steering,-1.5*dt,1.5*dt);
 const gearRatio=state.gear<0?0.8:[0,1,0.68,0.48,0.35,0.27][state.gear]??1;
 const drive=state.engineOn?throttle*spec.driveForce*gearRatio*Math.sign(state.gear):0;
 const gravity=-spec.mass*9.81*Math.sin(Math.atan(roadGrade(state.s,layout)))*Math.cos(state.heading);
 const resistance=spec.mass*0.012*9.81+0.45*state.speed*state.speed;
 const braking=spec.mass*(input.brake?7.5:input.decelerate?3.8:state.handbrake?9:0);
 const freeForce=drive+gravity;
 let speed=state.speed;
 if(Math.abs(speed)<0.04 && Math.abs(freeForce)<=resistance+braking) speed=0;
 else {
  const sign=Math.abs(speed)>0.04?Math.sign(speed):Math.sign(freeForce);
  speed+= (freeForce-sign*(resistance+braking))/spec.mass*dt;
  if(state.speed*speed<0 && braking>Math.abs(freeForce)) speed=0;
 }
 speed=clamp(speed,-5.5,15);
 const yaw=clamp(speed/spec.wheelbase*Math.tan(steering),-0.8*9.81/Math.max(Math.abs(speed),0.5),0.8*9.81/Math.max(Math.abs(speed),0.5));
 const heading=state.heading+yaw*dt;
 const stallTime=state.gear>=3 && Math.abs(speed)<0.3 && throttle>0.3 && roadGrade(state.s,layout)>0.05 ? state.stallTime+dt : 0;
 const engineOn=state.engineOn && stallTime<1;
 const rpm=engineOn?clamp(850+Math.abs(speed)*360/Math.max(gearRatio,0.2)*0.32+throttle*2600,650,5200):0;
 return {...state,x:state.x+Math.sin(heading)*speed*dt,s:state.s+Math.cos(heading)*speed*dt,heading,speed,steering,throttle:engineOn?throttle:0,rpm,engineOn,stallTime,wheelAngle:state.wheelAngle+speed*dt/0.35};
}
export function frontPosition(v: VehicleState, spec: VehicleSpec): number { return v.s+Math.cos(v.heading)*spec.length/2; }
export function wheelPositions(v: VehicleState, spec: VehicleSpec): {x:number;s:number}[] {
 return [-1,1].flatMap(side=>[-1,1].map(axle=>({x:v.x+Math.cos(v.heading)*side*(spec.width/2-0.12)+Math.sin(v.heading)*axle*spec.wheelbase/2,s:v.s-Math.sin(v.heading)*side*(spec.width/2-0.12)+Math.cos(v.heading)*axle*spec.wheelbase/2})));
}
export function bodyCollision(v: VehicleState, spec: VehicleSpec, obstacle: Layout['obstacles'][number]): boolean {
 const dx=obstacle.x-v.x,ds=obstacle.s-v.s;
 const localX=dx*Math.cos(v.heading)-ds*Math.sin(v.heading),localS=dx*Math.sin(v.heading)+ds*Math.cos(v.heading);
 return Math.hypot(localX-clamp(localX,-spec.width/2,spec.width/2),localS-clamp(localS,-spec.length/2,spec.length/2))<obstacle.radius;
}
