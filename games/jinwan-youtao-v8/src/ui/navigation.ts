/** One navigation map for the world, main bar and sheet bar. */
export const MENU=[['hub','经营'],['hotel','客房'],['front','客人'],['operations','团队'],['development','设施']] as const;
export function menuFor(view:string){
 if(['hotel','hotel-data','hotel-archive','entity','room-data'].includes(view))return 'hotel';
 if(['front','events','worklist','bookings','history'].includes(view))return 'front';
 if(['operations','operations-data','report','report-data','score'].includes(view))return 'operations';
 if(['development','development-data'].includes(view))return 'development';
 return 'hub';
}
export function moduleLinks(view:string):readonly (readonly [string,string])[]{
 return ({hub:[['hub','今天'],['brief','晨会'],['tasks','目标'],['evening','复盘']],hotel:[['hotel','房态'],['hotel-data','扩建']],front:[['front','接待'],['events','服务'],['bookings','预订'],['history','客史']],operations:[['operations','主管'],['operations-data','运营明细'],['report','财务']],development:[['development','设施'],['development-data','活动'],['hotel-data','扩建']]} as const)[menuFor(view) as 'hub'|'hotel'|'front'|'operations'|'development'];
}
