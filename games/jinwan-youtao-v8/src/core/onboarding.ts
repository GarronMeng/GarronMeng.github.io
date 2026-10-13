import type {PreviewState,Command,Department} from '../state/types';
export const OPENING=[
 {day:1,key:'brief',title:'参加第一次晨会',target:'brief',department:'front',why:'先看今天的预订与早餐需求。第一次沿用当前方案，点「开始营业」即可。',unlock:'到店接待'},
 {day:1,key:'checkin',title:'亲自安排一位客人入住',target:'front',department:'front',why:'点选一间可售客房。房费在午夜结算；会员升套会占用套房库存。带教期间排队客人不会流失。',unlock:'房态与住客服务'},
 {day:1,key:'turnover',title:'见证一间客房翻房完成',target:'hotel',department:'house',why:'清洁中的房间不能出售。关闭菜单让时间继续，或在房态页给脏房安排清洁。',unlock:'晚间复盘'},
 {day:1,key:'evening',title:'20:00 看今天的结果',target:'evening',department:'revenue',why:'关闭面板继续经营。20:00 自动复盘：核对入住、支出和客诉，午夜结算房费。',unlock:'Day 2 · 餐饮与会员承诺'},
 {day:2,key:'stock',title:'按早餐预估补一次库存',target:'operations-data',department:'fnb',why:'晨会给出早餐人数。采购 ¥300 得到 50 份；备货降低断供风险，也会占用现金。',unlock:'会员晚退决策'},
 {day:2,key:'late',title:'处理一位会员的晚退请求',target:'events',department:'front',why:'Globalist 可申请 4PM、Explorist 2PM。同意让客人满意，也会推迟翻房，看清下午到店的人数再决定。',unlock:'客房主管'},
 {day:2,key:'hire',title:'聘任客房主管',target:'operations',department:'house',why:'到岗 ¥3,800，每天工资 ¥180；之后员工会自动走到脏房清洁。',unlock:'Day 3 · 经营方向与两难抉择'},
 {day:3,key:'strategy',title:'在晨会选定今天的经营方向',target:'brief',department:'revenue',why:'比较稳健接客、照顾体验、争取利润：每个方向都会实际改变房价、留套和备货。',unlock:'房价、留套与完整团队'},
 {day:3,key:'dilemma',title:'做出第一个经营抉择',target:'events',department:'revenue',why:'资源有限时没有永远正确的答案。看清现金、体验、员工负担与后续影响，再选一个方向。',unlock:'经营抉择'},
 {day:3,key:'handover',title:'20:00 复盘，独立接班',target:'evening',department:'revenue',why:'对比晨会判断和晚间结果，看看你今天的决定带来了什么。',unlock:'成长主线与自由经营'},
] as const;
export const DAY_THEMES=['接住第一批客人','餐饮与会员承诺','经营方向与两难抉择'];
export const STEP=Object.fromEntries(OPENING.map((v,i)=>[v.key,i])) as Record<typeof OPENING[number]['key'],number>;
const VERSION=2,LEGACY_STEPS=[0,1,2,4,6,OPENING.length];
export function initOnboarding(s:PreviewState,legacy=false){const g=s.game!,o=g.onboarding??={step:legacy?OPENING.length:0,legacy,version:VERSION,baseline:{...(g.development?.counts??{})}};
 if(o.version!==VERSION){o.step=o.legacy?OPENING.length:LEGACY_STEPS[Math.min(o.step,LEGACY_STEPS.length-1)];o.version=VERSION;o.baseline={...(g.development?.counts??{})};}
 return o;}
export const onboardingStep=(s:Readonly<PreviewState>)=>{const o=s.game?.onboarding;return !o||o.legacy?OPENING.length:o.step;};
/** waiting: the next lesson belongs to a later day, so the player runs the hotel freely until then. */
export function openingGoal(s:Readonly<PreviewState>){const o=s.game?.onboarding;if(!o||o.legacy)return null;const step=OPENING[o.step];return step?{...step,target:step.key==='strategy'&&!s.game!.operations?.briefOpen?'operations-data':step.target,department:step.department as Department,index:o.step,total:OPENING.length,waiting:s.game!.day<step.day}:null;}
export function advanceOnboarding(s:PreviewState){const g=s.game!,o=g.onboarding;if(!o||o.legacy)return;const before=o.step;
 for(;;){const step=OPENING[o.step];if(!step||g.day<step.day)break;const counts=g.development?.counts??{},more=(id:string)=>(counts[id]??0)>(o.baseline[id]??0);
  const done=[!g.operations?.briefOpen,more('arrivals'),more('service'),g.evening?.day===g.day,!!o.breakfastPrepared,more('late-decision'),g.managers.house>0,more('strategy'),more('dilemma'),g.evening?.day===g.day&&!g.evening.open][o.step];
  if(!done)break;o.step++;o.baseline={...counts};o.breakfastPrepared=false;
 }
 if(o.step!==before){const last=OPENING[o.step-1],next=OPENING[o.step];g.notice='✓ '+last.title+' · 已解锁'+last.unlock+'。'+(next&&next.day>g.day?'今天的带教完成，明早继续。':'');g.logs.push({id:g.nextId++,day:g.day,minute:g.minute,category:'部门',text:g.notice});}
}
export type Feature='team'|'stock'|'strategy'|'upgrade'|'activity'|'expansion';
export function featureLock(s:Readonly<PreviewState>,feature:Feature):string|null{const o=s.game?.onboarding;if(!o||o.legacy)return null;const step=o.step,ch=s.game?.campaign?.chapter??0;
 if(feature==='stock'&&step<STEP.stock)return 'Day 2 早班解锁餐饮备货';
 if(feature==='team'&&step<STEP.hire)return '处理会员晚退后解锁客房主管';
 if(feature==='strategy'&&step<STEP.strategy)return 'Day 3 晨会解锁房价与经营方向';
 if(feature==='upgrade'&&(step<OPENING.length||ch<3))return '通过会员体验回访后解锁客房与公区升级';
 if((feature==='activity'||feature==='expansion')&&(step<OPENING.length||ch<4))return '通过新空间试营业后解锁活动、营销与扩建';return null;
}
export function viewLock(s:Readonly<PreviewState>,view:string){const features:Record<string,Feature>={operations:'team','operations-data':'stock',development:'upgrade','development-data':'activity','hotel-data':'expansion','room-data':'strategy','brief-data':'strategy','score':'strategy','career':'strategy','tasks-data':'strategy'};return features[view]?featureLock(s,features[view]):null;}
export function commandLock(s:Readonly<PreviewState>,c:Command){const features:Partial<Record<Command['type'],Feature>>={stock:'stock',hire:c.id==='house'?'team':'strategy',train:'strategy','day-plan':'strategy',price:'strategy',position:'strategy','suite-policy':'strategy',upgrade:'upgrade',invest:'upgrade','build-spa':'expansion',expand:'expansion','configure-room':'expansion',activity:'activity',campaign:'activity','book-inspection':'strategy','prepare-inspection':'strategy','continue-chapter':'strategy'};return features[c.type]?featureLock(s,features[c.type]!):null;}
export const CHAPTER_UNLOCKS=['完整翻房运营','会员承诺检验','客房与公区升级','主题活动、营销与扩建','自由经营'];
/** Opening lessons stay forgiving: nobody walks out before the player has checked in a first guest. */
export const patienceProtected=(s:Readonly<PreviewState>)=>{const o=s.game?.onboarding;return !!o&&!o.legacy&&o.step<=STEP.checkin;};
