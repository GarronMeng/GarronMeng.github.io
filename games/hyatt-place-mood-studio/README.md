# PLACE / STUDIO — Hyatt Place 3D Room Demo

独立 Three.js 交互式酒店客房微缩场景。原型参考深圳东门凯悦嘉轩酒店客房的床、Cozy Corner 沙发、办公桌和室内材质。

在线预览：https://garronmeng.github.io/games/hyatt-place-mood-studio/

## 构成

- `index.html`：静态网页、内联 UI 和 Three.js 场景交互源码。
- `vendor/three.module.js` 和 `vendor/three.core.js`：Three.js r180。
- `vendor/addons/controls/OrbitControls.js`：视角控制。
- `vendor/addons/geometries/RoundedBoxGeometry.js`：圆角家具几何。

修复（2026-10-17）：将过去依赖 jsDelivr/UNPKG 的引擎模块固定为**本站相对路径加载**，并显示具体初始化错误。该版本不依赖运行时第三方 CDN；仍需通过 HTTPS 站点打开（不要直接通过 iPhone「文件」应用的 file:// 预览方式运行）。

## iPhone 使用

推荐 Safari 打开上述链接（适配竖屏、横屏）。单指旋转，双指缩放；底部切换“材质／氛围／时间”。如果经过升级仍显示旧错误，打开 `?v=20261017-local` 作为缓存区分。

## QA

- GitHub 仓库包含所需的全部 four vendored ES module files；版本均为 r180。
- import map 将 `three`、`three/addons/` 指向同域相对路径。
- 已检查脚本语法和静态模块依赖。
- 当前执行环境无法连接公开 Pages 地址或运行 iPhone Safari，**线上实际 WebGL 渲染仍需设备实测**。
- 如果出现新的报错，请把错误消息的完整文字／截图发来，以便区分 WebGL2 能力、渲染异常及资源请求错误。

Three.js 及随附模块的许可见其源码头部 SPDX-License-Identifier: MIT；本项目是非官方视觉研究 Demo，不隶属于凯悦酒店集团。
