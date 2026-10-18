/** Canonical information architecture for the management UI.
 * A feature has exactly one first-level home; deep links never create extra menu entries.
 */
import {focusSelection,type FocusSelection} from './focusScreens';

export const MENU=[
 ['hub','总览'],['hotel','客房'],['front','宾客'],['operations','运营'],['development','发展'],
] as const;

export const MODULE_LINKS={
 hub:[['hub','今日'],['brief','晨会'],['tasks','目标'],['evening','复盘'],['log','日志'],['settings','设置']],
 hotel:[['hotel','房态'],['hotel-data','扩建']],
 front:[['front','接待'],['events','待办'],['bookings','预订'],['history','客史']],
 operations:[['operations','团队'],['operations-data','安排'],['report','财务'],['score','评分']],
 development:[['development','设施'],['development-data','活动']],
} as const;

export const PAGE_TITLES:Record<string,string>={
 hub:'经营总览',brief:'每日晨会','brief-data':'需求预测',tasks:'经营目标','tasks-data':'日常奖励',
 career:'成长里程碑',teaching:'开业带教',evening:'每日复盘','evening-data':'客诉与建议',log:'经营日志',settings:'设置与存档',
 hotel:'客房管理','hotel-data':'酒店扩建','hotel-archive':'空间总览','room-data':'房间详情',entity:'客房详情',
 front:'宾客接待',events:'服务待办',worklist:'服务待办',bookings:'今日预订',history:'住客档案','profile-records':'客史详情',
 operations:'团队管理','operations-data':'运营安排',report:'日结财务','report-data':'财务明细',score:'经营评分',
 development:'设施管理','development-data':'主题活动',
};

const MENU_OWNER:Record<string,(typeof MENU)[number][0]>={
 hub:'hub',brief:'hub','brief-data':'hub',tasks:'hub','tasks-data':'hub',career:'hub',teaching:'hub',
 evening:'hub','evening-data':'hub',log:'hub',settings:'hub',
 hotel:'hotel','hotel-data':'hotel','hotel-archive':'hotel','room-data':'hotel',entity:'hotel',
 front:'front',events:'front',worklist:'front',bookings:'front',history:'front','profile-records':'front',
 operations:'operations','operations-data':'operations',report:'operations','report-data':'operations',score:'operations',
 development:'development','development-data':'development',
};
export function menuFor(view:string){return MENU_OWNER[view]??'hub';}
export function moduleLinks(view:string):readonly (readonly [string,string])[]{return MODULE_LINKS[menuFor(view)];}

/** A deep detail page highlights its parent second-level tab. */
export const PARENTS:Record<string,string>={
 'room-data':'hotel','hotel-archive':'hotel-data',entity:'hotel',
 'brief-data':'brief','evening-data':'evening','report-data':'report',
 'profile-records':'history',worklist:'events','tasks-data':'tasks',career:'tasks',teaching:'tasks',
};
export function activeModule(view:string){
 let current=view;const seen=new Set<string>();
 while(PARENTS[current]&&!seen.has(current)){seen.add(current);current=PARENTS[current];}
 return moduleLinks(view).some(([id])=>id===current)?current:menuFor(view);
}

export interface NavigationPage {view:string;selected:string;selection:FocusSelection;scroll:number;}
/** Only explicit navigation changes history. Rendering never creates a back entry. */
export class ManagementNavigation {
 current:NavigationPage={view:'hub',selected:'',selection:focusSelection(),scroll:0};
 private pages=new Map<string,NavigationPage>();private history:NavigationPage[]=[];
 get canBack(){return !!this.history.length||!MENU.some(([id])=>id===this.current.view);}
 visit(view:string,root=false){
  if(view==='worklist')view='events';if(!PAGE_TITLES[view])view='hub';
  if(view===this.current.view){if(root)this.history=[];return;}
  this.pages.set(this.current.view,structuredClone(this.current));
  if(root)this.history=[];else{this.history.push(structuredClone(this.current));if(this.history.length>20)this.history.shift();}
  this.current=structuredClone(this.pages.get(view)??{view,selected:'',selection:focusSelection(),scroll:0});
 }
 back(){this.pages.set(this.current.view,structuredClone(this.current));const page=this.history.pop();if(page){this.current=page;return;}this.visit(PARENTS[this.current.view]??menuFor(this.current.view),true);}
 clear(){this.pages.set(this.current.view,structuredClone(this.current));this.history=[];}
}
