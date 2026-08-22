# Stage 00 — System Explorer / 系统探索者

## 这一阶段干什么

你现在不是在学习某个具体芯片，而是在建立整个嵌入式世界的地图。目标是以后第一次听到 MCU、FPGA、RTOS、寄存器、驱动等词时，知道它们大概位于系统哪一层。

## Entry Requirements

无。完全零基础可以从这里开始。

## Knowledge Route

建议按这个顺序建立概念：

1. [什么是嵌入式系统](../../01-Knowledge-Base/System/01-What-Is-Embedded-System.md)
2. [计算机系统分层](../../01-Knowledge-Base/System/02-Computer-System-Layers.md)
3. [嵌入式产品由什么组成](../../01-Knowledge-Base/System/03-Embedded-Product-Anatomy.md)
4. [上位机与下位机](../../01-Knowledge-Base/System/04-Upper-Lower-Computer.md)
5. [CPU、MCU、SoC 与 FPGA](../../01-Knowledge-Base/System/05-CPU-MCU-SoC-FPGA.md)
6. [软件如何控制硬件](../../01-Knowledge-Base/System/06-Software-to-Hardware.md)
7. [工具链地图](../../01-Knowledge-Base/System/07-Toolchain-Map.md)
8. [第一次建立系统调试思维](../../01-Knowledge-Base/System/08-First-System-Debugging.md)

这里的 Knowledge Base 是查询和解释层，不要求一次背完。

## Boss

给出一块常见 MCU 开发板、芯片框图和一段最小 C 程序，尝试解释：

```text
代码写在哪里
→ 怎么变成芯片能执行的内容
→ 怎么进入 Flash
→ CPU 如何开始运行
→ RAM 和 Register 分别在做什么
→ 最终怎样影响真实引脚
```

## Exit Criteria

能够粗略区分 MCU / SoC / FPGA、Bare-metal / RTOS / Linux，并能画出“应用/代码 → 处理器 → 外设 → 真实设备”的基本链路，就可以进入 [Stage 01 — C & Memory](../Stage-01-C-and-Memory/README.md)。