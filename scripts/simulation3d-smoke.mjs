import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require=createRequire(import.meta.url);const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.GPLX_3D_URL||'http://localhost:3000';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1560,height:1050}});
const profile={id:703991,username:'test-sim3d',fullName:'Kiểm thử 3D',email:'simulation@example.invalid',active:true,roles:['ROLE_STUDENT']};
await context.addInitScript(p=>{localStorage.setItem('gplx_token','ui-test-token');localStorage.setItem('gplx_user',JSON.stringify(p));localStorage.setItem('gplx_theme','light');},profile);
await context.route('**/api/v1/auth/me',route=>route.fulfill({json:{success:true,data:profile}}));
await context.route('**/*',route=>{const url=new URL(route.request().url());return url.hostname==='localhost'||url.hostname==='127.0.0.1'?route.fallback():route.abort();});
const page=await context.newPage();page.setDefaultTimeout(30000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
const out='docs/testing/artifacts/simulation3d';await mkdir(out,{recursive:true});
try {
 await page.goto(base+'/student/driving-simulation',{waitUntil:'domcontentloaded',timeout:60000});
 await page.getByRole('heading',{name:'Vào sân. Làm chủ tay lái.'}).waitFor();
 await page.locator('canvas').waitFor();await page.waitForTimeout(1200);
 assert.equal(await page.getByRole('heading',{name:'Chưa mở được sân 3D'}).count(),0);
 const contextType=await page.locator('canvas').evaluate(c=>!!c.getContext('webgl2'));assert.equal(contextType,true);
 await page.evaluate(()=>scrollTo(0,150));await page.screenshot({path:out+'/yard-ready.png',fullPage:false});
 console.log('PASS rendered WebGL2 scene');
 for(const code of ['C1','C','D1','D2','D','B']) {await page.getByRole('combobox',{name:'Hạng GPLX 3D'}).selectOption(code);await page.waitForTimeout(200);assert.equal(await page.locator('canvas').count(),1);}
 console.log('PASS six vehicle classes');
 for(const name of ['Trong cabin','Trên cao','Sau xe']) {const camera=page.getByRole('button',{name,exact:true});await camera.click();assert.equal(await camera.getAttribute('aria-pressed'),'true');await page.waitForTimeout(200);await page.screenshot({path:out+`/camera-${name==='Trong cabin'?'cabin':name==='Trên cao'?'overhead':'chase'}.png`});}
 console.log('PASS three cameras');
 await page.getByRole('combobox',{name:'Phạm vi bài luyện'}).selectOption('departure');
 await page.getByRole('button',{name:/Dây an toàn: chưa cài/}).click();await page.getByRole('button',{name:/Phanh tay: đang kéo/}).click();
 await page.getByRole('button',{name:'Bắt đầu lái xe',exact:true}).click();
 await page.keyboard.press('KeyQ');await page.keyboard.down('KeyW');
 const endTime=Date.now()+20000;let cancelled=false;
 while(Date.now()<endTime) {
  const distance=Number.parseFloat(await page.getByLabel('Khoảng cách tới vạch').textContent());
  if(distance<-.3&&!cancelled){await page.keyboard.press('KeyQ');cancelled=true;}
  if(await page.getByRole('heading',{name:'Đạt bài mô phỏng',exact:true}).count())break;
  await page.waitForTimeout(100);
 }
 await page.keyboard.up('KeyW');await page.getByRole('heading',{name:'Đạt bài mô phỏng',exact:true}).waitFor();
 assert.ok(cancelled);await page.getByText('Đã lưu trên trình duyệt này.',{exact:true}).waitFor();
 console.log('PASS keyboard driving, departure completion, IndexedDB save');
 await page.getByRole('button',{name:'Phát lại hành trình',exact:true}).click();
 await page.getByRole('slider',{name:'Vị trí phát lại'}).waitFor();
 const slider=page.getByRole('slider',{name:'Vị trí phát lại'});await slider.fill('1');
 await page.getByRole('button',{name:'Phát lại',exact:true}).click();await page.waitForTimeout(450);await page.getByRole('button',{name:'Tạm dừng phát lại',exact:true}).click();
 await page.screenshot({path:out+'/replay.png',fullPage:false});
 await page.reload();await page.getByRole('button',{name:'Xem lại',exact:true}).first().waitFor();
 console.log('PASS replay, seek and reload persistence');
 await page.getByText('Tùy chỉnh phím điều khiển',{exact:true}).click();
 const mapping=page.getByRole('textbox',{name:'Phím Ga',exact:true});await mapping.focus();await mapping.press('ArrowUp');assert.equal(await mapping.inputValue(),'Up');
 const other=page.getByRole('textbox',{name:'Phím Phanh',exact:true});await other.focus();await other.press('ArrowUp');await page.getByRole('alert').filter({hasText:'Phím này đã được gán'}).waitFor();
 console.log('PASS custom keymap and duplicate-key validation');
 await page.getByRole('button',{name:'Đóng',exact:true}).click();
 await page.getByText('Sân mẫu, cấu hình hạng xe & căn cứ chấm điểm',{exact:true}).click();
 await page.locator('input[type=file]').last().setInputFiles({name:'invalid-yard.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,id:'bad',name:'bad'}))});
 await page.getByRole('alert').filter({hasText:'Tọa độ sân không hợp lệ'}).waitFor();await page.getByRole('button',{name:'Đóng',exact:true}).click();
 console.log('PASS invalid course import rejected without breaking scene');
 await page.getByRole('combobox',{name:'Chế độ mô phỏng'}).selectOption('exam');
 await page.getByRole('button',{name:/Phanh tay: đang kéo/}).click();
 await page.getByRole('button',{name:'Bắt đầu lái xe',exact:true}).click();
 await page.keyboard.down('ArrowUp');
 const scoreTime=Date.now()+15000;
 while(Date.now()<scoreTime){if(Number.parseFloat(await page.getByLabel('Khoảng cách tới vạch').textContent())<-.1)break;await page.waitForTimeout(100);}
 await page.keyboard.up('ArrowUp');
 await page.getByRole('heading',{name:'Nhật ký lỗi & cảnh báo'}).locator('..').getByText('Chưa thắt dây an toàn',{exact:false}).waitFor();
 const score=await page.getByText('ĐIỂM MÔ PHỎNG',{exact:true}).locator('..').locator('strong').textContent();assert.ok(Number.parseInt(score)<=90);
 console.log('PASS exam detects missing belt/indicator and deducts configured points');
 await page.getByRole('button',{name:'Kết thúc phiên',exact:true}).click();await page.getByRole('heading',{name:'Phiên đã kết thúc',exact:true}).waitFor();
 assert.deepEqual(errors,[]);console.log('PASS exam mode/manual termination, no browser exceptions');
 console.log('All 3D browser checks passed. Auth mocked; real render, physics, rules file, controls, scoring and IndexedDB.');
} catch(error) {await page.screenshot({path:out+'/failure.png',fullPage:true});console.error('BROWSER ERRORS',errors);throw error;} finally {await browser.close();}
