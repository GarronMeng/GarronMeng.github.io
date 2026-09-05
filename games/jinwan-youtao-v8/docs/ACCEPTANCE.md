# 验收记录 · 2026-09-05

**结论：Phase 1 候选代码可构建；主视觉验收阻塞。不得作为完成的 v8 游戏或已通过视觉验收的版本发布。**

## 已执行

- TypeScript strict 类型检查及 Vite production build 通过。
- 8 项 node:test 用例通过：实体唯一归属、301 详情映射、8F 以上布局、不可变 store / 初始全速度、全房态几何、批处理、所有实体真实 raycast、公区计数。
- 在浏览器使用公开界面：4× 的 aria-pressed 正确更新；今日任务中的 301 打开 3F / 301 / 陈先生 Globalist / 剩余 2 晚。
- CSS iframe 视口边界测量：393×852 时 HUD 底部 173.5、底栏 691.75–852；430×932 时 HUD 底部 173.5、底栏 771.75–932，无横向溢出。390×844 和横屏的最终值见交付 manifest。
- 以上视口检查不模拟 iOS safe area、宿主工具栏或真实触控，不等同真机验证。

## 阻塞及未执行

浏览器控制台实际报错：`THREE.WebGLRenderer: A WebGL context could not be created ... GL_VENDOR = Disabled, GL_RENDERER = Disabled ... Error creating WebGL context.`

- 未看见主场景实际渲染；无法评价与目标图的差距。
- 未验证 GPU 帧率、实际阴影 / 材质效果、气泡与人物的屏幕位置、直接触点选房、公区动画。
- 未取得 iPhone / 小红书截图，未验证工具栏伸缩。
- 未推送远端，未执行 Pages 部署，正式地址未改变。
- 样本中的浏览日志为内存记录；未实现真实经营时钟、收益/事件/需求/部门/存档迁移。

## 下一道验收

在具备 WebGL 2 的浏览器运行本包，先检查开发者控制台，再在 iPhone 上截图。把主场景与 `reference/target.png` 对照。若比例、空间密度、灯光、材质或人物未达标，继续修 Phase 1；不得以本轮通过的单测或构建替代这一关。

原始目标图不是运行时背景，`docs/reference` 不进入 production build。
