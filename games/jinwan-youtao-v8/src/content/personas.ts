import type {Persona} from '../state/types';
// Names and signature quotes migrated from v7 guestThought / guestServiceEvent / personas.
export const PERSONAS:Record<Persona,{name:string;quote:string;lines:string[];likes:Partial<Record<string,number>>}>={
 chill:{name:'佛系住客',quote:'有就升，没有也没关系。',lines:['房间干净就行，今天不做 Room Check。','行程只有一项：在酒店多待一会。','有咖啡、有地方坐，这晚就不亏。'],likes:{lobby:2,rooftop:1.4}},
 road:{name:'商务赶时间客',quote:'套不套无所谓，我二十分钟后要出发。',lines:['发票可以现在开吗？我二十分钟后出发。','Front Office 快一点，比升套更有用。','明早别耽误我出发，早餐打包就行。'],likes:{breakfast:1.8,lobby:2,gym:.7,rooftop:.15}},
 family:{name:'带娃住客',quote:'两个孩子，早餐、加床和四点退房都麻烦确认一下。',lines:['早餐别太挤，两个孩子已经在倒计时。','加床落实了吗？套房两个字可睡不下四个人。','Housekeeping，多两瓶水和一双拖鞋，谢谢。'],likes:{breakfast:2.6,lobby:1.3,spa:.2,rooftop:.35}},
 points:{name:'积分党',quote:'先确认一下，这晚 QN 算吧？',lines:['这晚 QN 多久到账？促销 bonus 能叠吗？','Mattress Run 的精髓，是床可以不躺，房晚不能不算。','早餐算进去，这次回血率还可以。'],likes:{breakfast:1.8,club:1.8,spa:.15,rooftop:.5}},
 hunter:{name:'套房猎人',quote:'我刚刚已经看过 App 了。',lines:['明天 Standard Suite 还有吗？如果续住呢？','高楼层是楼层，Standard Suite 是房型。','Front Office 说帮我看看，我也在帮他看 App。'],likes:{lobby:2,club:1.6,gym:.6}},
 forum:{name:'论坛老哥',quote:'先确认一下，你们怎么定义 Standard Suite？',lines:['这个 DP 我得标注日期，免得后人按图索骥。','帖子说能升，帖子可没说今天。','先不下结论，等完整住完再写 DP。'],likes:{lobby:1.4,club:2,breakfast:1.3}},
 creator:{name:'探店博主',quote:'如果房间够出片，我今晚可能就发。',lines:['这里拍照能出片，但服务也得经得起原图直出。','先等人少一点，镜头里不想全是后脑勺。','给我一个好角度，比再送一盘水果管用。'],likes:{rooftop:3,spa:1.5,club:1.4}},
 proposal:{name:'求婚夜住客',quote:'今晚真的很重要，拜托了。',lines:['戒指放好了，别让 Room Check 先发现惊喜。','今晚千万别翻车，明天的 DP 可以很长。','布置别提前说漏，惊喜不是给 Front Office 的。'],likes:{rooftop:2.3,spa:1.6,club:1.4,lobby:.5}},
 planner:{name:'会奖买手',quote:'如果住得好，下个月整个团队都来。',lines:['团队入住动线要顺，别让 Lobby 变成集合照。','我在看 F&B 出餐速度，不只是看菜单。','这条电梯动线，带团队得分批。'],likes:{lobby:2.5,breakfast:1.5,club:1.8}},
 whale:{name:'钞能力客',quote:'套房不是必须，但体验请不要像标准房。',lines:['价格不是问题，排队才是。','欢迎礼可以少一点，体验别太普通。','先把行程空下来，今天在酒店消费。'],likes:{spa:3,club:2,rooftop:1.8,breakfast:.8}},
 auditplus:{name:'神秘审计客',quote:'我就随便住住，您按正常流程来。',lines:['Room Check？没有，我只是恰好看了一眼。','SOP 写得很好，看看现场是不是同一版。','Engineering 的闭环，不应该只在日志里。'],likes:{lobby:1.8,gym:1.4,breakfast:1.5,club:1.5}}
};
export const PLACE_LINES:Record<string,string[]>={
 breakfast:['早餐九点以后，有点像抢票。','F&B 补菜的手速，决定今天的第一条 DP。','咖啡先续上，QN 的事等会再说。'],
 club:['Happy Hour 别断菜。','Club Lounge 有位置，今天的心情就有位置。','这杯喝完再回房，今晚不赶场。'],
 gym:['健身房虽小，拍照倒挺大。','再跑十分钟，早餐就当没吃过。','今天把房费里的健身房也用回来。'],
 spa:['做个 Spa 再说，App 先放一边。','这一小时，谁都别给我发房态。','今天的 Service Recovery，是肩颈先恢复。'],
 lobby:['Front Office 说“再帮您看一下”，我懂这个停顿。','Walk-in 也想问一句：今晚有套吗？','GM Desk 先不用惊动，能解决就好。'],
 rooftop:['日落很值，特意错开了人多的时候。','风景不错，今晚的 DP 有封面了。','再坐一小会就回房，明早还有早餐。']
};
