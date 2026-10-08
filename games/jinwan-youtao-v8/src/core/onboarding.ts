import type {PreviewState,Command,Department} from '../state/types';
export const OPENING=[
 {title:'参加第一次晨会',target:'brief',department:'front',why:'先看今天的预订与早餐需求。第一次沿用当前方案，点「开始今天」即可。',unlock:'到店接待'},
 {title:'亲自安排一位客人入住',target:'front',department:'front',why:'点选一间可售客房。房费在午夜结算；会员升套会占用套房库存。',unlock:'房态与住客服务'},
 {title:'见证一间客房翻房完成',target:'hotel',department:'house',why:'清洁中的房间不能出售。已有房间正在翻房；关闭菜单让时间继续，或安排脏房清洁。',unlock:'餐饮备货'},
 {title:'为早餐补一次库存',target:'operations-data',department:'fnb',why:'采购 ¥300 得到 50 份早餐。备货降低断供风险，也会占用现金。',unlock:'客房主管'},
 {title:'聘任客房主管',target:'operations',department:'house',why:'选择 Housekeeping 主管：到岗 ¥3,800，每天工资 ¥180，之后会自动接手清洁。',unlock:'完整团队、房价决策与成长认证'},
] as const;
export function initOnboarding(s:PreviewState,legacy=false){return s.game!.onboarding??={step:legacy?OPENING.length:0,legacy,baseline:{...(s.game!.development?.counts??{})}};}
export function openingGoal(s:Readonly<PreviewState>){const o=s.game?.onboarding;if(!o||o.legacy)return null;const step=OPENING[o.step];return step?{...step,department:step.department as Department,index:o.step,total:OPENING.length}:null;}
export function advanceOnboarding(s:PreviewState){const g=s.game!,o=g.onboarding;if(!o||o.legacy)return;const counts=g.development?.counts??{},done=[!g.operations?.briefOpen,(counts.arrivals??0)>(o.baseline.arrivals??0),(counts.service??0)>(o.baseline.service??0),!!o.breakfastPrepared,g.managers.house>0];const before=o.step;while(o.step<OPENING.length&&done[o.step])o.step++;if(o.step!==before){g.notice='✓ '+OPENING[o.step-1].title+' · 已解锁'+OPENING[o.step-1].unlock+'。';g.logs.push({id:g.nextId++,day:g.day,minute:g.minute,category:'部门',text:g.notice});}}
export type Feature='team'|'stock'|'strategy'|'upgrade'|'activity'|'expansion';
export function featureLock(s:Readonly<PreviewState>,feature:Feature):string|null{const o=s.game?.onboarding;if(!o||o.legacy)return null;const step=o.step,ch=s.game?.campaign?.chapter??0;
 if(feature==='stock'&&step<3)return '完成翻房带教后解锁餐饮备货';
 if(feature==='team'&&step<4)return '完成早餐备货后解锁客房主管';
 if(feature==='strategy'&&step<5)return '聘任客房主管后解锁完整团队与经营策略';
 if(feature==='upgrade'&&(step<5||ch<3))return '通过会员体验回访后解锁客房与公区升级';
 if((feature==='activity'||feature==='expansion')&&(step<5||ch<4))return '通过新空间试营业后解锁活动、营销与扩建';return null;
}
export function viewLock(s:Readonly<PreviewState>,view:string){const features:Record<string,Feature>={operations:'team','operations-data':'stock',development:'upgrade','development-data':'activity','hotel-data':'expansion','room-data':'strategy','brief-data':'strategy','score':'strategy','career':'strategy','tasks-data':'strategy'};return features[view]?featureLock(s,features[view]):null;}
export function commandLock(s:Readonly<PreviewState>,c:Command){const features:Partial<Record<Command['type'],Feature>>={stock:'stock',hire:c.id==='house'?'team':'strategy',train:'strategy','day-plan':'strategy',price:'strategy',position:'strategy','suite-policy':'strategy',upgrade:'upgrade',invest:'upgrade','build-spa':'expansion',expand:'expansion','configure-room':'expansion',activity:'activity',campaign:'activity','book-inspection':'strategy','prepare-inspection':'strategy','continue-chapter':'strategy'};return features[c.type]?featureLock(s,features[c.type]!):null;}
export const CHAPTER_UNLOCKS=['完整翻房运营','会员承诺检验','客房与公区升级','主题活动、营销与扩建','自由经营'];
