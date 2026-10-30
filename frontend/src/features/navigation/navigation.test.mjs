import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { canAccessPath, findNavigationItem, getNavigationGroups, getQuickLinks, getRoleLabel, isNavigationActive, navigationGroups } from './navigation.ts';
const paths = role => getNavigationGroups([role]).filter(g=>g.id!=='public').flatMap(g=>g.items.map(i=>i.path));
const sharedStudy = ['/student/driving-simulation','/theory','/student/review','/road-signs','/tips'];
const expected = {
 ROLE_STUDENT: [...sharedStudy,'/student/raw-vehicle','/my-applications','/admissions/new','/examination/eligibility','/examination/my-results','/training/schedules','/examination/sessions','/finance/tuition'],
 ROLE_INSTRUCTOR: [...sharedStudy,'/training/schedules','/instructor/raw-vehicle','/fleet'],
 ROLE_STAFF: ['/admin/theory','/admin/admissions/dashboard','/admin/admissions/leads','/admin/admissions','/training/schedules','/training/raw-vehicle','/fleet','/examination/sessions','/finance/tuition'],
 ROLE_COUNSELOR: ['/admin/admissions/dashboard','/admin/admissions/leads'],
 ROLE_EXAMINER: ['/examination/sessions','/examination/grading'],
 ROLE_MANAGER: [...sharedStudy,'/student/raw-vehicle','/admin/admissions/dashboard','/admin/admissions/leads','/admin/admissions','/training/schedules','/instructor/raw-vehicle','/training/raw-vehicle','/fleet','/examination/sessions','/finance/tuition','/dashboard','/audit-logs'],
};
for (const [role, allowed] of Object.entries(expected)) test(`menu and direct access for ${role}`, () => {
 assert.deepEqual(paths(role).sort(),allowed.sort());
 for(const item of navigationGroups.flatMap(g=>g.items).filter(i=>i.roles)) assert.equal(canAccessPath(item.path,[role]),allowed.includes(item.path),item.path);
});
test('admin has every implemented module',()=>assert.equal(paths('ROLE_ADMIN').length,navigationGroups.filter(g=>g.id!=='public').flatMap(g=>g.items).length));
test('guest and unknown roles get public information only',()=>{
 for(const roles of [[],['ROLE_UNKNOWN']]) {
  assert.deepEqual(getNavigationGroups(roles).map(g=>g.id),['public']);
  assert.equal(canAccessPath('/student/driving-simulation',roles),false);
  assert.equal(canAccessPath('/fleet',roles),false);
 }
 assert.equal(canAccessPath('/unregistered',['ROLE_ADMIN']),false);
});
test('multi-role accounts receive union without duplicate links',()=>{
 const roles=['ROLE_COUNSELOR','ROLE_EXAMINER'];const links=getNavigationGroups(roles).flatMap(g=>g.items.map(i=>i.path));
 assert.ok(links.includes('/examination/grading'));assert.ok(links.includes('/admin/admissions/leads'));
 assert.equal(new Set(links).size,links.length);assert.equal(canAccessPath('/finance/tuition',roles),false);
 assert.ok(getRoleLabel(roles).includes('Tư vấn viên'));
});
test('legacy aliases have identical permissions and correct active selection',()=>{
 for(const item of navigationGroups.flatMap(g=>g.items)) for(const alias of item.aliases??[]) for(const role of Object.keys(expected)) {
  assert.equal(canAccessPath(alias,[role]),canAccessPath(item.path,[role])); assert.equal(isNavigationActive(alias,item),true);
 }
 assert.equal(isNavigationActive('/admin/admissions/leads',findNavigationItem('/admin/admissions')),false);
 assert.equal(canAccessPath('/student/driving-simulation/',['ROLE_STUDENT']),true);
});
test('sa hinh is an immediate shortcut for learners teachers and administrators',()=>{
 for(const role of ['ROLE_STUDENT','ROLE_INSTRUCTOR','ROLE_MANAGER','ROLE_ADMIN']) assert.ok(getQuickLinks([role]).some(i=>i.path==='/student/driving-simulation'));
 for(const role of ['ROLE_STAFF','ROLE_COUNSELOR','ROLE_EXAMINER']) assert.equal(getQuickLinks([role]).some(i=>i.path==='/student/driving-simulation'),false);
});
test('every protected App route has central permission including aliases',()=>{
 const app=readFileSync(new URL('../../app/App.tsx',import.meta.url),'utf8');
 const publicPaths=['/','/login','/register','/courses','/courses/:slug','/apply','/application-status','/apply/track','*'];
 for(const [,path] of app.matchAll(/path="([^"]+)"/g)) if(!publicPaths.includes(path)) assert.ok(findNavigationItem(path),path);
});
