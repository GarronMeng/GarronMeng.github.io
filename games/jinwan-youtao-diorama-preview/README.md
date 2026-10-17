# 独立 P1 美术候选预览

完整游戏 + 单间 201 Diorama，未替换 `jinwan-youtao-v8-preview`。

当前样板已按深圳东门凯悦嘉轩真实大床房照片调整：深木床头、灰米地毯、白床品、床对面的媒体工作台、白色办公椅和窗边躺椅。布局作了镜像与尺寸压缩；照片来源与对应关系记录在源码分支的 `HYATT-PLACE-REFERENCES.md`。

- [样板房：局部视图](./?visual=diorama&view=room&diagnostics=1)
- [原版房间：同相机对照](./?visual=original&view=room&diagnostics=1)
- [完整酒店](./?visual=diorama&diagnostics=1)
- [低画质](./?visual=diorama&view=room&diagnostics=1&quality=low)

关闭初始晨会面板后查看场景；点击右侧楼层可退出局部视图。预览使用隔离存档，不改现有游戏进度。当前仅替换 201 普通大床 Lv1，装修、施工或换房型后使用原版模型。

视觉与真机性能尚待验收：本轮运行浏览器无法启用 WebGL，无法产出真实前后渲染截图或确认 30 FPS。参数化模型未使用 Blender / GLB。不要据此宣称美术或移动端性能已通过验收。

可维护源码、文件清单、回归与已知问题：`../jinwan-youtao-v8/docs/diorama/`。本目录是 Vite 构建产物，不直接修改压缩 JavaScript。
