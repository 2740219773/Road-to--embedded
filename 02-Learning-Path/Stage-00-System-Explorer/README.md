# Stage 00 — System Explorer / 系统探索者

## 当前状态

正式入门阶段。目标不是学习某个具体芯片，而是先建立整个嵌入式世界的地图。

## 适合谁

完全零基础、C# 上位机开发者和已有其他编程经验但不了解嵌入式的人，都从这里开始。完全没有编程经验者先完成 [Programming Warmup](../00-Programming-Warmup/README.md)。

## Entry Requirements

无。只需要能阅读短文本并完成一张系统图。

如果你来自 C# 上位机开发，完成系统地图后，先做 [C# → C → Embedded C Bridge](../../04-Missions/Stage-01-C-and-Memory/00-CSharp-to-C-Bridge/Mission.md)，再进入 Pointer 和 Register 主题。

## 学习环境与阶段产出

- 环境：浏览器、普通 PC、纸或 Markdown 笔记；不要求开发板。
- 必做产出：一张“代码到真实设备”的系统图、一份故障分层记录、Stage 00 Exit Check。
- 选读内容：具体芯片、工具链和调试器细节只在需要时查阅。

## Knowledge Route

### 必读

1. [什么是嵌入式系统](../../01-Knowledge-Base/System/01-What-Is-Embedded-System.md)
2. [计算机系统分层](../../01-Knowledge-Base/System/02-Computer-System-Layers.md)
3. [嵌入式产品由什么组成](../../01-Knowledge-Base/System/03-Embedded-Product-Anatomy.md)
4. [上位机与下位机](../../01-Knowledge-Base/System/04-Upper-Lower-Computer.md)

### 遇到问题再查

- [CPU、MCU、SoC 与 FPGA](../../01-Knowledge-Base/System/05-CPU-MCU-SoC-FPGA.md)
- [软件如何控制硬件](../../01-Knowledge-Base/System/06-Software-to-Hardware.md)
- [工具链地图](../../01-Knowledge-Base/System/07-Toolchain-Map.md)
- [第一次建立系统调试思维](../../01-Knowledge-Base/System/08-First-System-Debugging.md)

Knowledge Base 是查询和解释层，不要求一次背完。

## Mission

- [System Map：一段代码怎样变成真实动作？](../../04-Missions/Stage-00-System-Explorer/00-System-Map/Mission.md)

Mission 节奏是：

```text
Hook → Goal → Predict → Explore → Action → Transfer → Review
```

## Boss

给出一块常见 MCU 开发板、芯片框图和一段最小 C 程序，解释：

```text
代码写在哪里
→ 怎么变成芯片能执行的内容
→ 怎么进入 Flash
→ CPU 如何开始运行
→ RAM 和 Register 分别在做什么
→ 最终怎样影响真实引脚
```

## Exit Check

- [Stage 00 Exit Check](EXIT-CHECK.md)

通过后进入 [Stage 01 — C & Memory](../Stage-01-C-and-Memory/README.md)。
