# 今晚有套吗？ v8.0.0-alpha.1

**交付状态：Phase 0 + Phase 1 独立空间预览；未达到完整游戏 / 发布验收。**

依据《今晚有套吗_v8.0_重构需求与技术交接_GPT6_Astra.docx》的第 25、28 节，先建立 Hyatt Place visual vertical slice。真实视觉与 iPhone / 小红书验收通过前，不接入后续经营系统、不开放其余品牌。界面中的现金、口碑、住客均为显式样本数据；速度控制人物演示，浏览记录仅保留本会话。

## 本地运行

需要 Node.js 22 或更新版本。解压完整目录后运行：

```sh
npm ci
npm test
npm run dev
```

浏览器打开终端显示的地址。设备必须支持 WebGL 2。手机与电脑处于同一局域网时，可以用电脑的局域网地址访问开发服务。手机访问方式不等于已通过真机测试。

```sh
npm run build
npm run preview
```

`dist/` 是静态构建，可以由 HTTP 静态服务器提供，或在批准后上传 Pages 的独立预览目录。不要双击 `dist/index.html` 以 `file://` 打开；ES modules 需要 HTTP。无需 API key、CDN 或后端。

## 架构

- `src/state/`：类型、显式 fixture、不可变单一 store、selectors。
- `src/content/`：Hyatt Place 材质规范和布局常量。
- `src/render/`：正交相机、scene layout、房间与公区 factory、人物、稳定 entityId 点击拾取、共享几何与实例批处理。
- `src/ui/`：HUD、四入口、原生 dialog、楼层 rail、任务与浏览记录。
- `src/main.ts`：公开接口组装、VisualViewport 与生命周期。
- `tests/`：状态、布局、真实 raycast、几何、实例批处理和视口 QA 页。
- `docs/`：需求逐项落位、迁移决策、验收状态与原始视觉参照。

相机与界面都通过公开 store 读实体。画面不读取任何 legacy 私有 IIFE，不使用 window state hack，不加载旧 renderer。房号不是屏幕坐标；场景、标签、碰撞体通过同一个 entityId 关联。

## 边界

目前有 Lobby、Breakfast、2F–4F 三层客房、5F Club、6F Gym、Rooftop；点击空间打开对应对象详情。数据布局可构造更高楼层，已测试到 8F 以上，但**运行中扩建经营尚未实现**。房态为样本快照，人物为演示路径，尚非入住 / 退房 / 公区需求状态机。

旧版代码和旧存档不变。本包不会读取或写入 localStorage。存档迁移、新游戏 reset、真实经营、事件、部门、品牌发展均留在后续阶段。

## 验收

见 `docs/ACCEPTANCE.md` 与交付包的 `BUILD-MANIFEST.json`。代码测试通过不表示视觉通过。当前测试浏览器报告 WebGL Disabled，未取得主场景渲染截图，因此不声称主屏接近目标图，不声称达到 45/60 fps 或首屏 3 秒目标。未推送、未部署、未修改原 Pages 游戏。
