import * as THREE from 'three';
import { SimulationController } from '../runtime/controller';
import { roadGrade, roadHeight } from '../physics/vehicle';
import { buildVehicle, box } from './objects';
import { buildYard } from './yard';
export function createScene(host: HTMLElement,controller: SimulationController,onError: (message:string)=>void) {
 const scene=new THREE.Scene();scene.background=new THREE.Color(0xb9d5df);scene.fog=new THREE.Fog(0xb9d5df,90,230);
 const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 renderer.domElement.setAttribute('aria-label','Sân thi 3D với xe và ba vùng bài thi');host.appendChild(renderer.domElement);
 const contextLost=(event: Event)=>{event.preventDefault();controller.pause();onError('Mất kết nối đồ họa. Hãy tải lại trang để khôi phục sân 3D.');};renderer.domElement.addEventListener('webglcontextlost',contextLost);
 scene.add(new THREE.HemisphereLight(0xd5f0ff,0x738250,2.3));
 const sun=new THREE.DirectionalLight(0xffefce,3);sun.position.set(-35,65,-30);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-80;sun.shadow.camera.right=80;sun.shadow.camera.top=100;sun.shadow.camera.bottom=-100;sun.shadow.camera.far=180;sun.shadow.bias=-0.0004;scene.add(sun);sun.target.position.set(0,0,-65);scene.add(sun.target);
 buildYard(scene,controller.layout);
 const car=buildVehicle(controller.spec);scene.add(car.group);
 const camera=new THREE.PerspectiveCamera(55,1,0.08,400);scene.add(camera);
 const cockpit=new THREE.Group();camera.add(cockpit);
 box(cockpit,[3.5,0.7,0.7],[0,-1.1,-1.1],0x223743);
 for(const side of [-1,1]) {const pillar=box(cockpit,[0.13,2.8,0.12],[side*1.3,0,-1.6],0x253c46);pillar.rotation.z=-side*0.12;}
 box(cockpit,[2.9,0.12,0.15],[0,1.15,-1.6],0x253c46);
 const steering=new THREE.Group();steering.position.set(0,-0.65,-1.25);steering.rotation.x=-0.3;cockpit.add(steering);
 const rim=new THREE.Mesh(new THREE.TorusGeometry(0.28,0.035,8,32),new THREE.MeshStandardMaterial({color:0x102530}));steering.add(rim);box(steering,[0.5,0.035,0.035],[0,0,0],0x526774);box(steering,[0.04,0.27,0.035],[0,-0.12,0],0x526774);
 const resize=()=>{const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();};
 const observer=new ResizeObserver(resize);observer.observe(host);resize();
 const position=new THREE.Vector3(),target=new THREE.Vector3();let raf=0,last=performance.now(),initial=true;
 const render=(now: number)=>{
  const delta=Math.min((now-last)/1000,0.1);last=now;controller.update(delta,now);
  const v=controller.vehicle,spec=controller.spec,ground=roadHeight(v.s,controller.layout),sin=Math.sin(v.heading),cos=Math.cos(v.heading);
  car.group.position.set(v.x,ground,-v.s);car.group.rotation.set(Math.atan(roadGrade(v.s,controller.layout))*cos,-v.heading,0,'YXZ');car.group.visible=controller.camera!=='cabin';cockpit.visible=controller.camera==='cabin';
  steering.rotation.z=-v.steering*8;
  car.wheels.forEach(w=>{w.rotation.y=w.position.z<0?-v.steering:0;w.children.forEach(t=>t.rotation.x=v.wheelAngle);});
  car.lamps.forEach((lamp,i)=>{const on=(v.hazard||(v.signal==='left'?i<2:v.signal==='right'?i>=2:false))&&Math.floor(now/450)%2===0;(lamp.material as THREE.MeshStandardMaterial).emissiveIntensity=on?2.6:0.05;});
  car.brakeLamps.forEach(lamp=>(lamp.material as THREE.MeshStandardMaterial).emissiveIntensity=v.handbrake||controller.pressed.has(controller.keys.brake)||controller.pressed.has(controller.keys.decelerate)?2:0.1);
  if(controller.camera==='chase'){position.set(v.x-sin*(spec.length+6),ground+5+spec.height,-v.s+cos*(spec.length+6));target.set(v.x+sin*7,ground+1.2,-v.s-cos*7);}
  else if(controller.camera==='cabin'){position.set(v.x-sin*spec.width*0.25+sin*spec.wheelbase*0.3,ground+spec.height*0.8+0.4,-v.s-cos*spec.wheelbase*0.3);target.set(position.x+sin*30,position.y+roadGrade(v.s,controller.layout)*30,position.z-cos*30);}
  else {position.set(v.x+0.01,ground+55,-v.s+12);target.set(v.x,ground,-v.s-8);}
  if(initial || controller.camera==='cabin')camera.position.copy(position);else camera.position.lerp(position,1-Math.exp(-5*delta));initial=false;camera.lookAt(target);renderer.render(scene,camera);raf=requestAnimationFrame(render);
 };
 raf=requestAnimationFrame(render);
 return ()=>{cancelAnimationFrame(raf);observer.disconnect();renderer.domElement.removeEventListener('webglcontextlost',contextLost);scene.traverse(object=>{if(object instanceof THREE.Mesh){object.geometry.dispose();const materials=Array.isArray(object.material)?object.material:[object.material];for(const material of materials){if('map' in material && material.map instanceof THREE.Texture)material.map.dispose();material.dispose();}}});renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();};
}
