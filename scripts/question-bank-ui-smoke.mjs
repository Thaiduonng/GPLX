import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const tab=await (await fetch('http://127.0.0.1:9345/json/new?about:blank',{method:'PUT'})).json();
const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
let id=0;const pending=new Map(),errors=[];
ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);};
function call(method,params={}) {return new Promise((resolve,reject)=>{const requestId=++id;pending.set(requestId,{resolve,reject});ws.send(JSON.stringify({id:requestId,method,params}));});}
async function value(expression){return (await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;}
await call('Page.enable');await call('Runtime.enable');
try {
 for(const [name,width,height,theme] of [['desktop-dark',1440,1100,'dark'],['desktop-light',1440,1100,'light'],['mobile-dark',390,844,'dark']]) {
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
  await call('Page.addScriptToEvaluateOnNewDocument',{source:`localStorage.setItem('gplx_theme',${JSON.stringify(theme)});`});
  await call('Page.navigate',{url:'http://localhost:3000/license-categories'});
  for(let attempt=0;attempt<60;attempt++){if(await value('document.querySelectorAll("article h2").length===15'))break;await new Promise(resolve=>setTimeout(resolve,300));}
  assert.equal(await value('document.querySelectorAll("article h2").length'),15);
  assert.equal(await value('document.documentElement.scrollWidth <= innerWidth'),true);
  assert.equal(await value('document.documentElement.dataset.theme'),theme);
  assert.equal(await value('[...document.querySelectorAll("article")].find(a=>a.querySelector("h2").textContent==="Hạng B1").textContent.includes("Mô tô ba bánh")'),true);
  const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile(`docs/testing/artifacts/license-categories/catalog-${name}.png`,Buffer.from(shot.data,'base64'));
  console.log('PASS',name,'15 categories, B1 scope, no horizontal overflow');
 }
 assert.deepEqual(errors,[]);console.log('PASS no browser JavaScript exceptions');
} finally {await call('Page.close').catch(()=>{});ws.close();}
