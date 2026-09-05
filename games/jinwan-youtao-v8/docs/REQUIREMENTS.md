# 需求识别与重构落位

依据用户上传 v8.0 交接文档，最新的“独立 3D 重构”要求取代此前保留 v5.0.1 UI 的要求；v5.0.1 仍是玩法迁移来源。文档明确要求 Phase 1 视觉通过后才进入 Phase 2，因此本轮只实施 Phase 0–1。

## 已确认问题

| 问题 | 源码 / 文档证据 | 新架构处理 |
|---|---|---|
| 单文件过大、叠加补丁和二进制文本搬运 | 当前 `games/jinwan-youtao/` 含大量 payload、inflate 与 patch 文件；index 内 `sceneAssets` 含内联 Base64 | 新建独立 Vite 工程；旧路径不动；构建不引用旧文件 |
| 渲染拿不到私有业务 state | 文档第 2 节；现有核心逻辑位于旧脚本内部 | 公开 `Store` 接口；UI 与世界仅订阅它 |
| 楼层、公区与房号混用 | `freshRooms` 同一 rooms 数组放早餐/标准房，`roomCode` 用 f/c 算房号 | `Floor`、`Room`、`Facility` 独立类型；房号显式字段 |
| 图片场景与交互对象错位 | 文档第 2、6、9 节 | `sceneLayout` 一次推导实体位置、标签与 floorId；拾取返回稳定 entityId |
| 存档混入视觉字段且迁移会清空住客 | 旧 `freshState` 含 visualMode；旧 `loadState` 清空 guests/frontQueue，并重置 occupied | Phase 1 不触碰旧存档；后续迁移必须显式 schema / 白名单 / 回滚 |
| CI 成功被当作视觉成功 | 文档第 2、26、27 节 | 验收记录分开标记代码、实际渲染、真机、发布；缺一不宣布完成 |

## 本阶段落位

| 需求 | 本轮实现 | 验收状况 |
|---|---|---|
| 单一酒店世界，取消 2D/3D 切换 | 仅 Three.js WebGLRenderer；无替代旧场景 | 源码检查通过；GPU 显示未验收 |
| Vite + TypeScript + OrthographicCamera | 独立工程、严格类型、相对路径生产构建 | 构建通过 |
| Lobby / Breakfast / 2–4F / Club / Gym / Roof | 真实 geometry factory，各空间设施不同 | 几何单测通过；外观待截图 |
| 房间纵深、家具、材质、灯光 | 墙/地板/床/窗/桌椅/软装/灯具；小型材质贴图；共享实例 | 外观与性能未验收 |
| 房态视觉优先 | 对应标记、家具和清洁车；大段状态只在详情中出现 | 样本演示；真实状态转换待 Phase 2 |
| 点击 301 打开 301 | collider / label / sheet 均使用 room-301 | Raycast 测试和 UI 任务跳转通过 |
| 动态楼层 rail | 从 floors 生成；布局测试覆盖 8F 以上 | 样本布局通过；真实扩建待 Phase 4 |
| 人物与短气泡 | 数据驱动演示人物、路径、气泡投影 | 无 GPU，未验证动画画面 |
| 日夜氛围 | 环境色 / 光照 / 示意时刻切换 | 控件已实现；外观待验收 |
| Day 1 1× / 2× / 4× | 控制演示人物速度 | 按钮状态通过；非经营时钟 |
| 今日任务与日志入口 | 三个浏览任务和本会话浏览记录 | 已验证 301 详情；非持久运营日志 |
| 移动端固定 HUD 与底栏 | 100dvh + VisualViewport + safe-area；stage 内滚动 | CSS 视口测量，非真机验收 |

## 后续阶段及依赖

| 阶段 | 迁移范围 | 必须通过的门槛 |
|---|---|---|
| Phase 1 余项 | 真正渲染后对照 target.png 修正比例、光照、家具、字体与移动交互 | iPhone/XHS 390×844 截图；视觉对照达标 |
| Phase 2 | 实际房态；住客 enter/front/room/facility/checkout；运行中布局同步 | 所有对象仍从同一 state 推导，设施有人使用 |
| Phase 3 | 固定步长时钟；前台分房/升套；退房清洁收益；去重事件、今日任务、持久日志、日结 | 4× 不跳业务；多晚与星期需求；闭环回归 |
| Phase 4 | 部门/SOP、维修、动态增长、装修、存档迁移/reset guard | 负责人改变自动处理逻辑；读写存档不回写旧状态 |
| Phase 5 | Regency → Grand → Andaz → Alila → Park | 每品牌完整视觉与空间语义通过后才解锁 |
| Phase 6 | 需求、节奏、利润压力、日结趋势、移动性能 | 45/60 fps、资源预算、真机、相同 commit 的 Pages 链 |

后续代码应分入 `src/core/` 的纯模拟模块；本阶段不放空壳模拟函数或返回假成功的迁移接口，以免与已实现能力混淆。
