import { useEffect, useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { validateRules } from '../features/simulation3d/rules/configuration';
import type { RuleSet } from '../features/simulation3d/types';
import Simulation3D from '../features/simulation3d/ui/Simulation3D';
export default function DrivingSimulation3DPage(){
 const {user}=useAuth();const [rules,setRules]=useState<RuleSet|null>(null);const [error,setError]=useState('');const [retry,setRetry]=useState(0);
 useEffect(()=>{const controller=new AbortController();setError('');fetch('/simulation3d/rules-2026-10.json',{signal:controller.signal}).then(response=>{if(!response.ok)throw new Error('Không tải được bộ quy tắc chấm điểm.');return response.json();}).then((value:unknown)=>setRules(validateRules(value))).catch(e=>{if(!controller.signal.aborted)setError(e instanceof Error?e.message:'Không tải được cấu hình.');});return()=>controller.abort();},[retry]);
 if(error)return <section style={{padding:32}} role="alert"><h1>Chưa tải được sân sa hình</h1><p>{error}</p><button onClick={()=>setRetry(i=>i+1)}>Thử lại</button></section>;
 if(!rules||!user)return <p role="status" style={{padding:32}}>Đang chuẩn bị sân sa hình 3D…</p>;
 return <Simulation3D rules={rules} ownerId={user.id}/>;
}
