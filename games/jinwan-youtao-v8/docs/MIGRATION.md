# 迁移设计与源码基线

- 检查的原仓库 HEAD：`e9962e5b018ddb3b80e53ea1753b29365a95e418`。
- 新的本地分支：`refactor/jinwan-v8-visual-slice`。
- 本地回滚标记：`archive/jinwan-before-v8`。
- 原游戏：`games/jinwan-youtao/`，保持原样。
- 新工程：`games/jinwan-youtao-v8/`，独立依赖和构建。
- 用户认可的 v5.0.1 原 ZIP 已找到并检查文件清单；本轮不复制其视觉层，不宣称玩法已迁移。

## 从旧版提取什么

| 当前迁移来源 | 后续目标 | 处理方式 |
|---|---|---|
| `freshState` / `freshRooms` | core 初始游戏 + content 布局 | 白名单挑选玩法字段；去掉视觉/DOM/相机字段 |
| `spawnGuest` / `guestServiceEvent` / `guestThought` | guest simulation / archetypes | 注入 seeded RNG；显式 stayLength 与状态转换 |
| `newDay` / `dailyResults` | accounting / reports | 固定时间步；房费按规则唯一入账；7 天聚合 |
| `managerHired` / `leadershipMaturity` | departments / SOP rules | 以权限和自动动作代替 buff；写决策日志 |
| `roomCode` / `openRoomSheet` | Room entity / UI selectors | 保留表达需要；废弃 DOM 与 f/c 下标耦合 |
| `loadState` / `saveState` / `startNewCareer` | versioned save repository | 新 namespace；校验输入；迁移前备份；reset guard |

## 迁移安全约束

Phase 1 的 PreviewState 有 `schemaVersion:8`、`mode:'visual-slice'`，但不是已经完成的正式 v8 存档协议。它仅驻留内存。正式 GameState 必须独立定义，拒绝把该 fixture 当正式经营进度导入。

不要把旧版 `loadState` 整体复制：检查到它重置住客及房间占用，会破坏多晚入住。也不要按 UI 显示的品牌直接替换场景而未检查该品牌资产是否通过验收。

将每个逻辑动作封为 command；core 只接受数据与显式依赖。renderer 的 selection / camera / mesh 不进入业务存档。运行中扩建后通过布局版本重新构建受影响 FloorGroup，并清理 GPU 资源；不能仅更新 rail。

每次发布都需要独立预览路径、最终 commit 的构建与哈希、实际 Pages 校验、同版本真机截图。未经明确发布批准，不覆盖原正式地址。
