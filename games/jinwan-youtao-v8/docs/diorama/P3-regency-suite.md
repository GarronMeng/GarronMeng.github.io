# P3 · 深圳机场凯悦 84㎡嘉宾轩套房视觉迭代

## 目标

在现有可维护的 Three.js 源代码中，为游戏内“套房 / 尊享套房”增加一套独立的套房场景模型，参考深圳机场凯悦酒店 84㎡ Regency Suite 的官方房型页面及用户提供的实景图。

- 官方房型：https://www.hyatt.com/hyatt-regency/en-US/szxra-hyatt-regency-shenzhen-airport/rooms/RGSK
- 官方图库：https://www.hyatt.com/hyatt-regency/zh-CN/szxra-hyatt-regency-shenzhen-airport/gallery
- 行政套房辅助参考：https://www.hyatt.com/hyatt-regency/en-US/szxra-hyatt-regency-shenzhen-airport/rooms/RGXK

## 场景结构

套房与普通客房使用不同的模型工厂。套房模型包含：

- 独立起居区：沙发、茶几、窗边躺椅、落地灯及小型餐桌
- 卧室：大床 / 双床、连续木质床头、分层床品、床头柜和床头灯
- 卫浴：石材台盆、镜面、浴缸、马桶、玻璃隔断和淋浴五金
- 入口及衣柜：入口门、衣柜柜体与门板
- 分区元素：卧室地毯、起居区地毯、开放式木格栅隔断、落地窗和窗帘

四房型与五级装修系统、真实房态对象、房间实体 ID 和现有交互继续由原有状态驱动。普通客房和景观客房仍使用原有深圳东门凯悦嘉轩实景参考。

## 参考图的边界

房型页面用于确认 84㎡套房身份，实景图用于校准木饰面、布艺、石材、玻璃、窗户与家具风格。游戏中的房间仍保持原有碰撞范围与楼层布局，因此这是一套适配现有玩法的规范化等距微缩模型，**不声称是酒店的 1:1 测绘平面图**。实景照片不会作为运行时背景贴图使用。

游戏中的“套房 / 尊享套房”仍是原有经营分类；使用 Regency Suite 作为美术参考不代表这两个游戏等级等同于凯悦官方房型分类。

## 代码落点

- src/render/diorama/regencySuite.ts：套房专属空间与家具几何
- src/render/diorama/room.ts：按真实游戏房型分流到套房或普通客房工厂
- src/render/diorama/variants.ts：套房视觉特征标记
- src/render/diorama/materials.ts：套房专用木饰面、布艺、石材、玻璃与镜面材质
- src/render/diorama/reference.ts：官方参考链接与适配边界
- tests/diorama-variants.test.ts：房间范围、房型分区、大床 / 双床和装修等级回归
- .github/workflows/test-jinwan-v8.yml：Node 测试与生产构建

## 验收范围

CI 会执行 npm ci、npm test、npm run build 并保存构建产物。自动化测试验证模型结构、游戏房间边界、装修等级和原有状态隔离；它们不替代支持 WebGL 2 的桌面浏览器和 iPhone Safari 真机截图验收。
