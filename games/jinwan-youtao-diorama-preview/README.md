# 独立 P2 客房美术候选预览

完整游戏 + 全部已建客房的 Diorama 类型/等级，未替换 `jinwan-youtao-v8-preview`。仅客房；公共区域与 UI 未重做。

当前样板已按深圳东门凯悦嘉轩真实大床房照片调整：深木床头、灰米地毯、白床品、床对面的媒体工作台、白色办公椅和窗边躺椅。布局作了镜像与尺寸压缩；照片来源与对应关系记录在源码分支的 `HYATT-PLACE-REFERENCES.md`。

- [样板房：局部视图](./?visual=diorama&view=room&diagnostics=1)
- [原版房间：同相机对照](./?visual=original&view=room&diagnostics=1)
- [完整酒店](./?visual=diorama&diagnostics=1)
- [低画质](./?visual=diorama&view=room&diagnostics=1&quality=low)

关闭初始晨会面板后查看场景；点击右侧楼层可退出局部视图。预览使用隔离存档，不改正式游戏进度。普通 / 景观 / 套房 / 尊享套房均支持大床、双床和 Lv1–Lv5；空位和施工仍使用原有呈现，竣工后读取真实等级切换装修。

视觉与真机性能尚待验收：本轮运行浏览器无法启用 WebGL，无法产出真实前后渲染截图或确认 30 FPS。参数化模型未使用 Blender / GLB。不要据此宣称美术或移动端性能已通过验收。

可维护源码位于 `visual-diorama-upgrade` 分支；文件清单、回归与已知问题：`games/jinwan-youtao-v8/docs/diorama/P2-handoff.md`。本目录是 Vite 构建产物，不直接修改压缩 JavaScript。
