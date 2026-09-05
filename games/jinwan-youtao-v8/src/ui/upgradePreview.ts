import {standardSuite} from '../content/roomTypes';
import type {PreviewState,Room,Department} from '../state/types';
import {roomRate,roomUpgradeCost,houseMinutes,engineeringMinutes,supplyCost,revenuePrice} from '../core/economy';
const money=(n:number)=>'¥'+Math.round(n).toLocaleString('en-US');
const compare=(label:string,before:number,after:number,unit:string)=>`<div class="upgrade-compare"><span>${label}</span><b>${before}${unit} → ${after}${unit}</b><div><i style="width:${before/Math.max(1,before,after)*100}%"></i><i style="width:${after/Math.max(1,before,after)*100}%"></i></div></div>`;
export function roomPreview(s:Readonly<PreviewState>,r:Room){const level=r.level??1;if(level>=5)return '<p>装修已满级</p>';const g=s.game!,next={...r,level:level+1},cost=roomUpgradeCost(level),before=roomRate(g.price,r),after=roomRate(g.price,next),delta=after-before;
 const occupancy=g.reports.at(-1)?.occupancy??(100*Object.values(s.entities).filter(r=>r.kind==='room'&&r.status==='occupied').length/Math.max(1,Object.values(s.entities).filter(r=>r.kind==='room').length));
 const low=roomRate(g.price,next,true)-roomRate(g.price,r,true),daily=delta*occupancy/100;
 return `<details class="upgrade-preview"><summary>装修 Lv.${level} → ${level+1} · ${money(cost)}</summary>${compare('新客每晚房价',before,after,' 元')}${standardSuite(r)?`<p>会员免费升套价：${money(roomRate(g.price,r,true))} → ${money(roomRate(g.price,next,true))}</p>`:''}<p>每售出一晚多收 ${money(low)}${low!==delta?'–'+money(delta):''}；约 ${Math.ceil(cost/delta)}${low!==delta?'–'+Math.ceil(cost/low):''} 个售出房晚收回装修费。</p><p>按${g.reports.length?'最近一天':'当前'}入住率 ${Math.round(occupancy)}%、${standardSuite(r)?'普通付费客':'当前挂牌价'}估算：每天多收 ${money(daily)}${daily>0?'，约 '+Math.ceil(cost/daily)+' 天回本':'，暂无法估算回本天数'}。</p><small>已入住订单价格不变；预估假设房价、入住率保持不变。</small></details>`;
}
export function managerPreview(s:Readonly<PreviewState>,id:Department,name:string,base:number){const g=s.game!,level=g.managers[id],next=Math.min(3,level+1),cost=level?4500*level:3800;
 let effect='',note='';
 if(id==='front'){const lobby=s.entities['facility-lobby'],extra=(lobby.kind==='facility'?lobby.level??1:1)*10;effect=compare('新到店住客耐心',100+level*50+extra,100+next*50+extra,' 分钟');note=level?'自动分房速度不变；延长新客等候耐心，降低等待流失。':'启用自动分房与常规诉求处理；无空房时仍需等待。';}
 if(id==='house'){effect=compare('每间清洁用时',houseMinutes(level),houseMinutes(next),' 分钟');note=level?'少占用 '+(houseMinutes(level)-houseMinutes(next))+' 分钟房态；有待入住客人时才可能转化为收入。':'自动清洁脏房，免手动清洁 ¥90/间；每日工资 ¥180，两次清洁抵消工资。';}
 if(id==='engineering'){effect=compare('常规维修用时',engineeringMinutes(level),engineeringMinutes(next),' 分钟');note=level?'维修费用仍为 ¥100/间；更早恢复可售，不保证新增订单。':'自动维修 ¥100/间，手动 ¥180/间；事件维修按诉求流程处理。';}
 if(id==='fnb'){effect=compare('采购单价（每 40 份）',level?supplyCost(level):240,supplyCost(next),' 元');note=level?'每批节省 ¥20；每天新增工资 ¥180，超过 9 批后才产生净节省，另需回收培训费。':'库存低于 20 时，每 30 分钟自动检查补货；与手动采购每份同价。';}
 if(id==='revenue'){effect=compare('同一需求下自动报价',level?revenuePrice(base,g.level,level):g.price,revenuePrice(base,g.level,next),' 元');note='次日定价时生效；按当前需求档预览。需求和天气变化会改变报价，提价也可能减少客流。';}
 return `<details class="manager-card"><summary><span>${name}主管 · ${level?'Lv.'+level:'未聘任'}</span><small>${level>=3?'已满级':'查看效果 ›'}</small></summary>${level>=3?'<p>已完成全部培训。</p>':`${effect}<p>${note}</p><p>投入 ${money(cost)} · 工资 ${money(level*180)} → ${money(next*180)}/天</p><button class="game-action" data-action="${level?'train':'hire'}" data-id="${id}">${level?'培训至 Lv.'+next:'聘任主管'} · ${money(cost)}</button>`}</details>`;
}
