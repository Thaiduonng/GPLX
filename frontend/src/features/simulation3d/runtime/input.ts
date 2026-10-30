import type { Action, KeyMap } from '../types.ts';
import type { SimulationController } from './controller';
const held: Action[]=['accelerate','decelerate','brake','left','right'];
export function bindInput(host: HTMLElement,controller: SimulationController) {
 const down=(event: KeyboardEvent)=>{
  if(document.activeElement!==host)return;
  const action=(Object.keys(controller.keys) as Action[]).find(key=>controller.keys[key]===event.code);if(!action)return;
  event.preventDefault();if(held.includes(action))controller.pressed.add(event.code);else if(!event.repeat)controller.action(action);
 };
 const up=(event: KeyboardEvent)=>{controller.pressed.delete(event.code);};
 const blur=()=>controller.pause();const release=()=>controller.pressed.clear();
 const visibility=()=>{if(document.hidden)controller.pause();};
 window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',blur);host.addEventListener('blur',release);document.addEventListener('visibilitychange',visibility);
 return ()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',blur);host.removeEventListener('blur',release);document.removeEventListener('visibilitychange',visibility);controller.pressed.clear();};
}
export function remapKey(current: KeyMap,action: Action,code: string): KeyMap {
 if(['Tab','Escape','Enter','CapsLock','MetaLeft','MetaRight','ControlLeft','ControlRight','AltLeft','AltRight'].includes(code)||!/^Key[A-Z]$|^Digit[0-9]$|^Arrow(Up|Down|Left|Right)$|^Space$|^Shift(Left|Right)$/.test(code))throw new Error('Chọn chữ cái, số, mũi tên, Space hoặc Shift. Giữ Tab và Escape cho điều hướng.');
 if(Object.entries(current).some(([key,value])=>key!==action&&value===code))throw new Error('Phím này đã được gán cho thao tác khác.');return {...current,[action]:code};
}
export const keyLabel=(code: string)=>code.replace('Key','').replace('Digit','').replace('Arrow','').replace('Space','Space');
