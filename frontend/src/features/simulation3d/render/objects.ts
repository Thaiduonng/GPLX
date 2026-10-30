import * as THREE from 'three';
import type { VehicleSpec } from '../types.ts';
export function box(parent: THREE.Object3D, size: [number,number,number], position: [number,number,number], color: number, material?: THREE.Material): THREE.Mesh {
 const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),material??new THREE.MeshStandardMaterial({color,roughness:0.65}));mesh.position.set(...position);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
export function sign(parent: THREE.Object3D,text: string,x: number,y: number,z: number,width=5,bg='#12354b') {
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;const ctx=canvas.getContext('2d')!;
 ctx.fillStyle=bg;ctx.fillRect(0,0,1024,256);ctx.strokeStyle='#c7e7f3';ctx.lineWidth=10;ctx.strokeRect(8,8,1008,240);ctx.fillStyle='#ffffff';ctx.font='bold 66px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,512,130,980);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const plane=new THREE.Mesh(new THREE.PlaneGeometry(width,width/4),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));plane.position.set(x,y,z);parent.add(plane);return plane;
}
export interface VehicleMesh {group: THREE.Group; wheels: THREE.Group[]; lamps: THREE.Mesh[]; brakeLamps: THREE.Mesh[]; steeringWheel: THREE.Group}
export function buildVehicle(spec: VehicleSpec): VehicleMesh {
 const group=new THREE.Group(),wheels: THREE.Group[]=[],lamps: THREE.Mesh[]=[],brakeLamps: THREE.Mesh[]=[];
 const body=new THREE.MeshStandardMaterial({color:spec.color,metalness:0.35,roughness:0.3});
 const glass=new THREE.MeshStandardMaterial({color:0x244a60,metalness:0.6,roughness:0.12});
 const chassisY=spec.kind==='car'?0.64:0.95;
 box(group,[spec.width,0.55,spec.length],[0,chassisY,0],spec.color,body);
 if(spec.kind==='car') {
  box(group,[spec.width*0.86,0.65,spec.length*0.52],[0,1.18,0.15],spec.color,body);
  box(group,[spec.width*0.78,0.39,0.035],[0,1.3,-spec.length*0.22],0,glass);
  box(group,[spec.width*0.78,0.35,0.035],[0,1.3,spec.length*0.28],0,glass);
  for(const side of [-1,1]) box(group,[0.025,0.38,spec.length*0.43],[side*spec.width*0.435,1.3,0.12],0,glass);
 } else if(spec.kind==='truck') {
  box(group,[spec.width,spec.height*0.65,spec.length*0.28],[0,chassisY+spec.height*0.32,-spec.length*0.33],spec.color,body);
  box(group,[spec.width*0.93,spec.height*0.8,spec.length*0.64],[0,chassisY+spec.height*0.4,spec.length*0.17],0xe1e8ed);
  box(group,[spec.width*0.86,0.7,0.04],[0,chassisY+spec.height*0.45,-spec.length/2-0.025],0,glass);
 } else {
  box(group,[spec.width,spec.height*0.75,spec.length],[0,chassisY+spec.height*0.36,0],spec.color,body);
  box(group,[spec.width*0.86,spec.height*0.32,0.04],[0,chassisY+spec.height*0.47,-spec.length/2-0.03],0,glass);
  for(const side of [-1,1]) for(let i=0;i<6;i++)box(group,[0.03,spec.height*0.28,spec.length*0.11],[side*(spec.width/2+0.01),chassisY+spec.height*0.48,-spec.length*0.31+i*spec.length*0.135],0,glass);
 }
 for(const side of [-1,1]) {
  box(group,[0.26,0.18,0.09],[side*(spec.width/2-0.25),chassisY,-spec.length/2-0.03],0xf6f2c4,new THREE.MeshStandardMaterial({color:0xffffdd,emissive:0xffffcc,emissiveIntensity:0.6}));
  brakeLamps.push(box(group,[0.24,0.18,0.08],[side*(spec.width/2-0.25),chassisY,spec.length/2+0.03],0x9b202b,new THREE.MeshStandardMaterial({color:0xbc273a,emissive:0xff1838,emissiveIntensity:0.15})));
  for(const end of [-1,1])lamps.push(box(group,[0.16,0.14,0.1],[side*(spec.width/2-0.07),chassisY+0.12,end*(spec.length/2+0.03)],0x7d521e,new THREE.MeshStandardMaterial({color:0xffa72f,emissive:0xffa72f,emissiveIntensity:0.1})));
  for(const axle of [-1,1]) {
   const pivot=new THREE.Group();pivot.position.set(side*spec.width/2,0.4,axle*spec.wheelbase/2);group.add(pivot);
   const tire=new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.4,0.25,16),new THREE.MeshStandardMaterial({color:0x19242c,roughness:0.95}));tire.rotation.z=Math.PI/2;tire.castShadow=true;pivot.add(tire);
   const hub=new THREE.Mesh(new THREE.CylinderGeometry(0.23,0.23,0.27,12),new THREE.MeshStandardMaterial({color:0xa8b6c5,metalness:0.7,roughness:0.35}));hub.rotation.z=Math.PI/2;pivot.add(hub);wheels.push(pivot);
  }
 }
 box(group,[0.48,0.16,0.03],[0,chassisY-0.14,spec.length/2+0.08],0xf5f5f1);
 const steeringWheel=new THREE.Group();
 return {group,wheels,lamps,brakeLamps,steeringWheel};
}
