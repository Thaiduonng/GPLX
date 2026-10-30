import { actionNames, defaultKeys } from '../config';
import { keyLabel, remapKey } from '../runtime/input';
import type { Action, KeyMap } from '../types';
import styles from './Simulation.module.css';
export function Settings({keys,onChange,onError}:{keys:KeyMap;onChange:(value:KeyMap)=>void;onError:(value:string)=>void}) {
 return <details className={styles.details}><summary>Tùy chỉnh phím điều khiển</summary><p>Chọn ô rồi bấm phím mới. Các phím phải khác nhau; Tab/Escape dành cho điều hướng.</p><div className={styles.keyGrid}>{(Object.keys(keys) as Action[]).map(action=><label key={action}>{actionNames[action]}<input aria-label={`Phím ${actionNames[action]}`} value={keyLabel(keys[action])} readOnly onKeyDown={event=>{if(event.code==='Tab'||event.code==='Escape')return;event.preventDefault();try{onChange(remapKey(keys,action,event.code));onError('');}catch(error){onError(error instanceof Error?error.message:'Không đổi được phím.');}}}/></label>)}</div><button type="button" onClick={()=>onChange({...defaultKeys})}>Khôi phục phím mặc định</button></details>;
}
