import test from 'node:test';
import assert from 'node:assert/strict';
import {ManagementNavigation,PAGE_TITLES,menuFor,moduleLinks,activeModule,MENU,MODULE_LINKS} from '../src/ui/navigation';
import {focusScreen,focusSelection} from '../src/ui/focusScreens';
import {secondaryScreen} from '../src/ui/secondaryScreens';
import {newGame} from '../src/core/game';
import {rooms} from '../src/state/selectors';
test('显式导航才记录历史，返回恢复房间、楼层、分页和滚动位置',()=>{
 const nav=new ManagementNavigation();nav.visit('hotel',true);nav.current.selection.room='room-301';nav.current.selection.floor='floor-3';nav.current.scroll=52;
 nav.visit('front');nav.current.selection.guestPage=2;nav.visit('events');nav.current.selection.eventPage=3;nav.back();assert.equal(nav.current.view,'front');assert.equal(nav.current.selection.guestPage,2);nav.back();assert.equal(nav.current.view,'hotel');assert.equal(nav.current.selection.room,'room-301');assert.equal(nav.current.selection.floor,'floor-3');assert.equal(nav.current.scroll,52);
 nav.visit('operations',true);assert.equal(nav.canBack,false);nav.visit('hotel',true);assert.equal(nav.current.selection.room,'room-301');nav.visit('missing-route');assert.equal(nav.current.view,'hub');
});
test('每个界面使用同一决策框架和固定操作区，功能入口均有注册归属',()=>{
 const s=newGame();for(const view of Object.keys(PAGE_TITLES)){
  const u=focusSelection();u.room=rooms(s)[0].id;const html=focusScreen(s,view,u)??secondaryScreen(s,view,u);
  assert.ok(html.includes('class="focus-screen"'),view);assert.ok(html.includes('class="focus-footer"'),view);assert.ok(!html.includes('<details'),view);assert.ok(!html.includes('<select'),view);
  for(const match of html.matchAll(/data-open="([^"]+)"/g))assert.ok(PAGE_TITLES[match[1]],view+' → '+match[1]);
  assert.ok(moduleLinks(view).some(([id])=>menuFor(id)===menuFor(view)),view);
 }
});
test('客史与房间详情的入口携带当前对象，预订无需展开才能看到诉求',()=>{
 const s=newGame(),u=focusSelection();u.profile=s.guests.find(v=>v.profileId)!.profileId;assert.match(secondaryScreen(s,'history',u),new RegExp('data-profile="'+u.profile+'"'));
 const booking=secondaryScreen(s,'bookings',u);assert.ok(!booking.includes('<details'));assert.match(booking,/锁定价/);assert.match(secondaryScreen(s,'operations-data',u),/data-action="stock"/);
});

test('信息架构：页面唯一归属，一级和二级菜单不重复',()=>{
 const owners=new Map<string,string>();
 for(const [owner] of MENU){
  for(const [id] of MODULE_LINKS[owner]){
   assert.equal(owners.has(id),false,id+' 不得在两个栏目重复');
   owners.set(id,owner);
   assert.equal(menuFor(id),owner);
  }
 }
 for(const view of Object.keys(PAGE_TITLES)){
  assert.ok(MENU.some(([id])=>id===menuFor(view)),view+' 没有一级栏目');
  assert.ok(moduleLinks(view).some(([id])=>id===activeModule(view)),view+' 没有选中的二级栏目');
 }
 assert.equal(activeModule('room-data'),'hotel');
 assert.equal(activeModule('hotel-archive'),'hotel-data');
 assert.equal(activeModule('profile-records'),'history');
 assert.equal(activeModule('report-data'),'report');
 assert.equal(activeModule('teaching'),'tasks');
 assert.equal(menuFor('hotel-data'),'hotel');
 assert.equal(menuFor('report'),'operations');
 assert.equal(menuFor('development-data'),'development');
});
