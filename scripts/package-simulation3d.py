"""Create a self-contained source ZIP using the maintained simulation module, without credentials or node_modules."""
from pathlib import Path
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "artifacts" / "simulation3d-mvp-source.zip"
OUTPUT.parent.mkdir(exist_ok=True)
ENTRY = """import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Simulation3D from './features/simulation3d/ui/Simulation3D';
import { validateRules } from './features/simulation3d/rules/configuration';
import type { RuleSet } from './features/simulation3d/types';
import './standalone.css';
function App(){
 const [rules,setRules]=useState<RuleSet|null>(null);const [error,setError]=useState('');const [retry,setRetry]=useState(0);
 useEffect(()=>{const c=new AbortController();setError('');fetch('/simulation3d/rules-2026-10.json',{signal:c.signal}).then(r=>{if(!r.ok)throw new Error('Không tải được quy tắc.');return r.json();}).then((r:unknown)=>setRules(validateRules(r))).catch(e=>{if(!c.signal.aborted)setError(e instanceof Error?e.message:'Lỗi tải cấu hình.');});return()=>c.abort();},[retry]);
 if(error)return <main role="alert"><h1>Không tải được sân</h1><p>{error}</p><button onClick={()=>setRetry(n=>n+1)}>Thử lại</button></main>;
 return rules?<Simulation3D rules={rules} ownerId={0} showLegacy={false}/>:<p role="status">Đang tải sân 3D…</p>;
}
createRoot(document.getElementById('root')!).render(<BrowserRouter><App/></BrowserRouter>);
"""
CSS = """@import './styles/tokens.css';
*{box-sizing:border-box}body{margin:0;background:var(--color-bg-app);font-family:Arial,sans-serif;color:var(--color-text-main)}button,input,select{font-family:inherit}h1,h2,h3,p{overflow-wrap:break-word}a{color:var(--color-primary)}
"""
package = json.loads((ROOT / "frontend/package.json").read_text(encoding="utf-8"))
package["scripts"] = {"dev":"vite --host 0.0.0.0 --port 5173", "build":"tsc -b && vite build", "preview":"vite preview --host 0.0.0.0 --port 4173", "test:simulation":"node --test src/features/simulation3d/tests/engine.test.mjs"}
with zipfile.ZipFile(OUTPUT,"w",zipfile.ZIP_DEFLATED) as archive:
    archive.writestr("package.json",json.dumps(package,indent=2)+"\n")
    for relative in ["package-lock.json","tsconfig.json","tsconfig.app.json","vite-env.d.ts"]:
        archive.write(ROOT / "frontend" / relative,relative)
    for folder in ["src/features/simulation3d","public/simulation3d"]:
        for path in sorted((ROOT / "frontend" / folder).rglob("*")):
            if path.is_file(): archive.write(path,path.relative_to(ROOT / "frontend").as_posix())
    archive.write(ROOT / "frontend/src/styles/tokens.css","src/styles/tokens.css")
    archive.write(ROOT / "docs/training/simulation3d-standalone.md","README.md")
    archive.writestr("src/main.tsx",ENTRY)
    archive.writestr("src/standalone.css",CSS)
    archive.writestr("vite.config.ts","import {defineConfig} from 'vite'; import react from '@vitejs/plugin-react'; export default defineConfig({plugins:[react()]});\n")
    archive.writestr("index.html",'<!doctype html><html lang="vi"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Sa hình ô tô 3D — MVP</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>')
print(f"{OUTPUT} ({OUTPUT.stat().st_size:,} bytes)")
