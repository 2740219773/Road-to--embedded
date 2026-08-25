# Stage 06 — Embedded Linux

这一阶段从资源受限 MCU 扩展到能够运行完整 Linux 的嵌入式平台。

## 当前定位

Stage 06 目前仍是 prototype，用于验证后续路线和架构；完整正式建设属于后续版本。当前 V2.6 不把它作为新手完成 Stage 05 后的必修课程。

## Entry Requirements / 环境 / 产出

- Entry：Stage 05 Exit Check；当前只需理解 MCU、RTOS、进程和设备分层。
- 环境：Linux 板卡或虚拟机属于后续实践，本页现阶段只提供静态路线。
- 必须完成：先读系统地图和当前 Device Not Found Mission。
- 可选阅读：Boot、Kernel、Device Tree、Driver 和 Buildroot/Yocto Knowledge。
- 阶段产出：正式建设前不要求提交 Boss 或 Exit Check。

## 先建立系统地图

建议先按下面顺序认识，而不是直接背 Linux 命令：

- `01-Knowledge-Base/Embedded-Linux/01-What-Is-Embedded-Linux.md`
- `01-Knowledge-Base/Embedded-Linux/02-Linux-System-Layers.md`
- `01-Knowledge-Base/Embedded-Linux/03-Process-File-Device.md`
- `01-Knowledge-Base/Embedded-Linux/04-Boot-Kernel-RootFS.md`
- `01-Knowledge-Base/Embedded-Linux/05-Device-Tree.md`
- `01-Knowledge-Base/Embedded-Linux/06-Cross-Compilation.md`
- `01-Knowledge-Base/Embedded-Linux/07-Buildroot-Yocto.md`

这些内容目前仍是 Stage 06 的纵向样板，不代表 Linux 路线已经完整制作。

## 当前 Mission

- [Device Not Found：应用为什么看不到设备？](../../04-Missions/Stage-06-Embedded-Linux/01-Device-Not-Found/Mission.md)

## 核心学习链路

```text
Application
→ User Space Interface / Device Node
→ Kernel / Driver
→ Device Tree
→ Bus / Pin / Clock
→ Physical Device
```

## 未来完整完成标准

最终应能够解释一块 Linux 板从 Boot 到 Application 的基本链路，并能把“应用读不到设备”拆到 User Space、Driver、Device Tree、Bus 与硬件层逐步取证。

在正式建设完成前，本页只维护路线边界，不把样板误写成正式完成。
