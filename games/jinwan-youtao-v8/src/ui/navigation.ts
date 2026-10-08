/** One navigation map for the world, main bar and sheet bar. */
export const MENU=[['hub','经营'],['hotel','客房'],['front','客人'],['operations','团队'],['development','设施']] as const;
export function menuFor(view:string){
 if(['hotel','hotel-data','hotel-archive','entity','room-data'].includes(view))return 'hotel';
 if(['front','events','worklist','bookings','history','profile-records'].includes(view))return 'front';
 if(['operations','operations-data','report','report-data','score'].includes(view))return 'operations';
 if(['development','development-data'].includes(view))return 'development';
 return 'hub';
}
export function moduleLinks(view:string):readonly (readonly [string,string])[]{
 return ({hub:[['hub','今天'],['brief','晨会'],['tasks','目标'],['evening','复盘'],['log','日志'],['settings','设置']],hotel:[['hotel','房态'],['hotel-data','扩建']],front:[['front','接待'],['events','服务'],['bookings','预订'],['history','客史']],operations:[['operations','主管'],['operations-data','运营安排'],['report','财务'],['score','评分']],development:[['development','设施'],['development-data','活动'],['hotel-data','扩建']]} as const)[menuFor(view) as 'hub'|'hotel'|'front'|'operations'|'development'];
}

import {focusSelection,type FocusSelection} from './focusScreens';
export const PAGE_TITLES:Record<string,string>={hub:'经营看板',hotel:'房态与装修','hotel-data':'扩建计划','hotel-archive':'空间总览','room-data':'房间与服务',front:'到店接待',events:'事件中心',worklist:'事件中心',bookings:'今日预订',history:'住客档案','profile-records':'客史记录',operations:'部门负责人','operations-data':'运营安排',development:'公共设施','development-data':'主题活动',brief:'08:00 晨会','brief-data':'需求预测',evening:'20:00 复盘','evening-data':'客诉与建议',report:'日结报告','report-data':'财务明细',score:'经营评分',tasks:'当前目标','tasks-data':'日常奖励',career:'长期里程碑',teaching:'部门带教',log:'经营日志',settings:'存档与设置'};
const PARENTS:Record<string,string>={'room-data':'hotel','hotel-archive':'hotel-data','brief-data':'brief','evening-data':'evening','report-data':'report','profile-records':'history','tasks-data':'tasks',career:'tasks-data',teaching:'tasks'};
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
