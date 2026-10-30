import * as THREE from 'three';
import type { Layout } from '../types.ts';
import { roadHeight } from '../physics/vehicle.ts';
import { box, sign } from './objects';
function strip(parent: THREE.Object3D,x1: number,x2: number,start: number,end: number,layout: Layout,color: number) {
 const segments=Math.ceil(end-start),vertices:number[]=[];
 for(let i=0;i<segments;i++) {
  const a=start+(end-start)*i/segments,b=start+(end-start)*(i+1)/segments,ya=roadHeight(a,layout)+0.025,yb=roadHeight(b,layout)+0.025;
  vertices.push(x1,ya,-a,x2,ya,-a,x2,yb,-b,x1,ya,-a,x2,yb,-b,x1,yb,-b);
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();
 const mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color,side:THREE.DoubleSide,roughness:0.96}));mesh.receiveShadow=true;parent.add(mesh);
}
export function buildYard(scene: THREE.Scene,l: Layout) {
 const group=new THREE.Group();scene.add(group);
 box(group,[180,0.2,l.length+80],[0,-0.24,-l.length/2],0x86a86c);
 strip(group,-l.laneWidth/2,l.laneWidth/2,-12,l.length,l,0x4b5862);
 for(const side of [-1,1]) {
  strip(group,side*l.laneWidth/2-0.06,side*l.laneWidth/2+0.06,-10,l.length,l,0xf9eee0);
  for(let s=-5;s<l.length;s+=3) {
   const curb=box(group,[0.32,0.18,1.5],[side*(l.laneWidth/2+0.25),roadHeight(s,l)+0.09,-s],Math.floor(s/3)%2?0xe8e9dc:0xa65049);curb.rotation.x=Math.atan((roadHeight(s+0.5,l)-roadHeight(s-0.5,l)));
  }
 }
 for(let s=0;s<l.length;s+=8)strip(group,-0.045,0.045,s,s+2,l,0xd5d8bf);
 const lines=[{s:l.startLine,label:'01  XUẤT PHÁT',bg:'#155fb4'},{s:l.pedestrianLine,label:'02  NHƯỜNG NGƯỜI ĐI BỘ',bg:'#167d70'},{s:l.hillStop,label:'03  KHỞI HÀNH NGANG DỐC',bg:'#985d26'},{s:l.finish,label:'HOÀN THÀNH MVP',bg:'#155fb4'}];
 for(const line of lines) {
  strip(group,-l.laneWidth/2,l.laneWidth/2,line.s-0.08,line.s+0.08,l,0xf3f3df);
  if(line.s!==l.startLine && line.s!==l.finish)strip(group,-l.laneWidth/2+0.15,l.laneWidth/2-0.15,line.s-0.5,line.s,l,0x7fa8a5);
  const y=roadHeight(line.s,l);sign(group,line.label,0,y+5,-line.s,Math.max(l.laneWidth,8),line.bg);
  for(const side of [-1,1])box(group,[0.12,5,0.12],[side*(l.laneWidth/2+0.8),y+2.5,-line.s],0xa2bac3);
 }
 for(let i=0;i<6;i++)strip(group,-l.laneWidth/2+0.4,l.laneWidth/2-0.4,l.pedestrianLine+1+i*0.65,l.pedestrianLine+1.3+i*0.65,l,0xf0efdf);
 for(const o of l.obstacles){const cone=new THREE.Mesh(new THREE.ConeGeometry(o.radius,1.2,8),new THREE.MeshStandardMaterial({color:0xef803f}));cone.position.set(o.x,roadHeight(o.s,l)+0.6,-o.s);cone.castShadow=true;group.add(cone);box(group,[o.radius*2,0.12,o.radius*2],[o.x,0.06,-o.s],0xe2d4b1);}
 // Scenic expansion zones are visibly marked; only the three modules on the main corridor are scored in MVP.
 box(group,[14,0.12,38],[22,-0.02,-50],0x58626a);
 for(const offset of [0,1,2]) {box(group,[0.08,0.025,8],[17+offset*4.5,0.06,-42],0xf1eed5);box(group,[4.5,0.025,0.08],[19+offset*4.5,0.06,-46],0xf1eed5);}
 sign(group,'KHU GHÉP XE · GIAI ĐOẠN SAU',22,3,-35,11);
 box(group,[0.25,4,0.25],[16,2,-64],0x52666c);box(group,[0.6,1.7,0.5],[16,4.7,-64],0x283b42);
 for(let i=0;i<3;i++){const light=new THREE.Mesh(new THREE.SphereGeometry(0.18,12,8),new THREE.MeshStandardMaterial({color:[0xde6159,0xe9c965,0x70b993][i],emissive:[0xde6159,0xe9c965,0x70b993][i],emissiveIntensity:i===0?0.8:0.1}));light.position.set(16,5.2-i*0.5,-63.72);group.add(light);}
 for(const rail of [0,1])box(group,[12,0.1,0.15],[22,0.08,-75-rail*1.4],0x8e9da3);
 for(let i=0;i<12;i++)box(group,[0.4,0.07,3],[17+i,0.04,-75.7],0x6c5b47);
 box(group,[9,4,15],[-22,2,-30],0xdbddd2);box(group,[9.7,0.35,15.5],[-22,4.1,-30],0x365b69);sign(group,'TRẠM ĐIỀU HÀNH',-22,3,-22.45,7);
 for(let i=0;i<6;i++)box(group,[1.1,1,0.05],[-25+i*1.2,2.3,-22.4],0x396477);
 for(let i=0;i<40;i++) {
  const x=(i%2?1:-1)*(14+(i*13%30)),s=-5+i*3.8;
  if(x<-15&&x>-29&&s>19&&s<40)continue;
  if(x>12&&x<32&&s>26&&s<84)continue;
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.26,2.8,6),new THREE.MeshStandardMaterial({color:0x75694e}));trunk.position.set(x,1.4,-s);group.add(trunk);
  const foliage=new THREE.Mesh(new THREE.IcosahedronGeometry(1.8+(i%3)*0.3,1),new THREE.MeshStandardMaterial({color:i%3?0x456f50:0x63834c,flatShading:true}));foliage.position.set(x,3.7,-s);foliage.castShadow=true;group.add(foliage);
 }
 // Approach arrows.
 for(const s of [24,54,114]) {const arrow=new THREE.Mesh(new THREE.ConeGeometry(0.5,1.4,3),new THREE.MeshBasicMaterial({color:0xb8d7d8}));arrow.rotation.x=-Math.PI/2;arrow.position.set(0,roadHeight(s,l)+0.04,-s);group.add(arrow);}
 return group;
}
