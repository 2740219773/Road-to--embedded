# Stage 06 — Embedded Linux

这一阶段从资源受限 MCU 扩展到能够运行完整 Linux 的嵌入式平台。

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

## 完成标准（未来完整 Stage）

最终应能够解释一块 Linux 板从 Boot 到 Application 的基本链路，并能把“应用读不到设备”拆到 User Space、Driver、Device Tree、Bus 与硬件层逐步取证。

当前 V2.1 不继续扩展 Stage 06 内容，完成 P0 收口后再按 ROADMAP 推进。