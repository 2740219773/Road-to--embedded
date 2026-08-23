# Stage 06 — Embedded Linux

这一阶段从资源受限 MCU 扩展到能够运行完整 Linux 的嵌入式平台。

## 当前定位

Stage 06 已有纵向样板，用于验证后续路线和架构；完整正式建设属于 ROADMAP 的 V2.6。当前 V2.3 不继续扩展 Linux 内容，除非修复明显错误或断链。

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

在 V2.6 到来前，本页只维护路线边界，不把样板误写成正式完成。