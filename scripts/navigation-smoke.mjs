import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { getNavigationGroups } from '../frontend/src/features/navigation/navigation.ts';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const base = process.env.GPLX_URL || 'http://localhost:3000';
const output = 'docs/testing/artifacts/navigation';
await mkdir(output, { recursive: true });
let count=0;
try {
for (const width of [375,768,1440]) for (const role of ['ROLE_STUDENT','ROLE_INSTRUCTOR','ROLE_STAFF','ROLE_COUNSELOR','ROLE_EXAMINER','ROLE_MANAGER','ROLE_ADMIN']) {
 const context = await browser.newContext({ viewport: { width, height: 900 } });
 const profile={id:991,username:'ui-test',fullName:'Kiểm thử giao diện',email:'ui-test@example.invalid',active:true,roles:[role]};
 await context.addInitScript(profile=>{
  localStorage.setItem('gplx_token','ui-test-token');localStorage.setItem('gplx_user',JSON.stringify(profile));localStorage.setItem('gplx_theme','light');
 },profile);
 await context.route('**/api/v1/**',route=>{
  const path = new URL(route.request().url()).pathname;
  if (path.endsWith('/license-categories')) return route.continue();
  const data=path.endsWith('/auth/me') ? profile : [];
  return route.fulfill({json:{success:true,data}});
 });
 const page=await context.newPage();page.setDefaultTimeout(10000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/courses');
 await page.getByRole('button',{name:'Mở danh mục chức năng'}).click();
 const dialog=page.getByRole('dialog',{name:'Danh mục chức năng'});await dialog.waitFor();
 const links=await dialog.locator('a').evaluateAll(items=>items.map(i=>i.getAttribute('href')));
 const expected=getNavigationGroups([role]).flatMap(g=>g.items.map(i=>i.path));
 assert.deepEqual(links.sort(),expected.sort(),`${role} ${width}: menu`);
 await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
 assert.equal(await page.getByRole('button',{name:'Mở danh mục chức năng'}).getAttribute('aria-expanded'),'false');
 await page.goto(base+'/student/driving-simulation/2d');
 if(['ROLE_STUDENT','ROLE_INSTRUCTOR','ROLE_MANAGER','ROLE_ADMIN'].includes(role)) {
  await page.getByRole('heading',{name:'Luyện sa hình, từng bước làm chủ tay lái'}).waitFor();
  await page.getByRole('combobox').first().selectOption('B');
  const shortcut=page.getByRole('navigation',{name:'Lối tắt theo vai trò'}).getByRole('link',{name:'Luyện sa hình với xe ảo'});
  assert.ok(await shortcut.isVisible());
  const box=await shortcut.boundingBox();assert.ok(box.x>=0 && box.x+box.width<=width+1,`${role} shortcut outside viewport`);
  if(role==='ROLE_STUDENT') {
   await page.getByRole('button',{name:'Bắt đầu / Tiếp tục'}).click();
   await page.keyboard.down('ArrowUp');await page.waitForTimeout(450);await page.keyboard.up('ArrowUp');
   const x=await page.locator('svg g[transform]').getAttribute('transform');assert.ok(Number(x.match(/translate\(([^ ]+)/)[1])>100,'vehicle moves');
   await page.getByRole('button',{name:'Luyện lại',exact:true}).click();
   await page.getByRole('button',{name:'Bắt đầu / Tiếp tục'}).click();
   const gas=page.getByRole('button',{name:'Giữ ga',exact:true});
   await gas.scrollIntoViewIfNeeded();const gasBox=await gas.boundingBox();
   await page.mouse.move(gasBox.x+gasBox.width/2,gasBox.y+gasBox.height/2);await page.mouse.down();await page.waitForTimeout(400);await page.mouse.up();
   const pointerX=await page.locator('svg g[transform]').getAttribute('transform');assert.ok(Number(pointerX.match(/translate\(([^ ]+)/)[1])>100,'pointer gas moves vehicle');
   await page.getByRole('combobox').first().selectOption('B1');
   await page.getByRole('status').filter({hasText:'Hạng này chưa có cấu hình xe ảo'}).waitFor();
   await page.getByRole('combobox').first().selectOption('B');
   await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:`${output}/student-${width}.png`,fullPage:true});
  }
 } else {
  await page.getByRole('heading',{name:'Bạn không có quyền truy cập chức năng này'}).waitFor();
 }
 await page.goto(base+'/fleet');
 if(['ROLE_STUDENT','ROLE_COUNSELOR','ROLE_EXAMINER'].includes(role)) await page.getByRole('heading',{name:'Bạn không có quyền truy cập chức năng này'}).waitFor();
 assert.deepEqual(errors,[],`${role} ${width}: browser errors`);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${role} ${width}: horizontal overflow`);
 await context.close();count++;console.log(`PASS ${role} ${width}px`);
}
const context=await browser.newContext({viewport:{width:375,height:850}});const page=await context.newPage();
await page.goto(base+'/student/driving-simulation/2d');await page.waitForURL('**/login');
await page.getByRole('button',{name:'Mở danh mục chức năng'}).click();
await page.getByRole('dialog').getByRole('link',{name:'Đăng nhập',exact:true}).waitFor();
await page.getByRole('dialog').getByRole('link',{name:'Đăng ký tài khoản'}).waitFor();
assert.equal(await page.getByRole('dialog').getByRole('link',{name:'Luyện sa hình với xe ảo'}).count(),0);
await context.close();console.log(`PASS guest mobile login/menu; ${count} role/viewport checks. Auth/module APIs mocked for UI isolation; license categories use live backend.`);
} finally { await browser.close(); }
