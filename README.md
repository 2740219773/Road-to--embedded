# Road to Embedded

> 面向工程实践的交互式嵌入式学习系统：从 C、MCU、RTOS、Embedded Linux 到 FPGA，在“观察、操作、故障、调试、项目”中建立真正的工程能力。

## 当前状态

已完成并合并：

```text
V2.1 — Architecture Refactor
V2.2 — Stage 01 Interactive Pilot
V2.3 Phase A — Stage 02 MCU Foundation
```

当前正在推进 **V2.3 Phase B — Stage 03 Peripheral Engineer**。

Stage 03 已建立：

```text
UART
→ I2C
→ SPI
→ ADC
→ DMA
→ CAN
→ RS-485
→ Modbus RTU
→ Mixed Peripheral Debug Challenge
→ Multi-Peripheral Sensor Node Boss
→ Exit Check
```

目前处于最终质量验收：零基础路径、导航、首次术语、PR 范围和合并状态检查。Phase B 合并后才进入 Stage 04 正式建设。

## 为什么做这个项目

互联网上不缺嵌入式教程。更常见的问题是：不知道先学什么、理论太枯燥、跟着教程能跑但不会排错、学了很多概念却不知道它们在真实系统中的位置。

Road to Embedded 希望把学习变成：

**看到现象 → 产生疑问 → 做出预测 → 互动验证 → 动手实验 → 故意弄坏 → 使用证据排查 → 找到根因 → 完成工程任务。**

## 学习者从哪里开始

从 [`02-Learning-Path/README.md`](02-Learning-Path/README.md) 进入，不要从仓库第一个文件开始顺序阅读。

```text
Stage 00  System Explorer
Stage 01  C & Memory
Stage 02  MCU Rookie
Stage 03  Peripheral Engineer
Stage 04  Debug Hunter
Stage 05  RTOS Engineer
Stage 06  Embedded Linux
Stage 07  FPGA Builder
Stage 08  System Integrator
```

第一次看到 MCU、UART、DMA、ISR、Mutex、FPGA 等术语时，可以先查 [`01-Knowledge-Base/Glossary.md`](01-Knowledge-Base/Glossary.md)。核心内容遵循 [`docs/BEGINNER-READABILITY.md`](docs/BEGINNER-READABILITY.md)：先解释“它是什么、在哪儿、为什么需要”，再进入正式术语和参数。

## 内容模型

```text
Knowledge Base
准确知识 / 查询 / 复习
        ↓
Learning Path + Missions
问题 / 情境 / 任务 / 预测
        ↓
Interactive Labs + OpenMAIC
动画 / Quiz / Simulation / AI 课堂
        ↓
Engineering Practice
代码 / 开发板 / 仪器 / 故障 / 项目
```

Markdown 是课程源和知识底稿，不是唯一学习界面。

## 正式目录

```text
Road-to--embedded/
├─ PROJECT.md
├─ ROADMAP.md
├─ CONTRIBUTING.md
├─ docs/
├─ 00-Project/
├─ 01-Knowledge-Base/
├─ 02-Learning-Path/
├─ 03-Interactive-Labs/
├─ 04-Missions/
├─ 05-Projects/
├─ 06-Debugging-Cases/
├─ 07-OpenMAIC/
├─ 08-Resources/
└─ 09-Progress/
```

V2.1 的迁移历史记录在 [`docs/MIGRATION-V2.1.md`](docs/MIGRATION-V2.1.md)。

## 一节课的理想体验

```text
Hook / Mission Brief
↓
Before You Start
↓
Predict
↓
Observe / Visualize
↓
Explain
↓
Break It
↓
Debug with Evidence
↓
Transfer
↓
Mission Report
```

一个 Stage 的正式闭环继续向后包含：

```text
Single-topic Missions
→ Debug Cases
→ Mixed Challenge
→ Boss Project
→ Exit Check
→ Quality Gate
```

Stage 01 已建立 C/Memory 闭环；Stage 02 已把虚拟模型接到真实 MCU；Stage 03 正把同一证据方法扩展到通信、采样和数据搬运。

## 五级能力模型

```text
L1 见过     知道这个词
L2 理解     能解释它解决什么问题
L3 操作     能完成实验
L4 排错     出现异常能够定位
L5 迁移     换芯片、换项目仍能使用
```

目标不是“课程看完”，而是逐步达到 L4～L5。

## 维护者入口

继续维护前优先阅读：

1. [`PROJECT.md`](PROJECT.md)
2. [`ROADMAP.md`](ROADMAP.md)
3. [`09-Progress/Current.md`](09-Progress/Current.md)
4. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
5. [`docs/CONTENT-DESIGN.md`](docs/CONTENT-DESIGN.md)
6. [`docs/BEGINNER-READABILITY.md`](docs/BEGINNER-READABILITY.md)
7. [`docs/DEVELOPMENT-PLAN.md`](docs/DEVELOPMENT-PLAN.md)
8. [`CONTRIBUTING.md`](CONTRIBUTING.md)

新增内容前先判断最合适的媒介，不要默认创建新的长篇 Markdown。

## OpenMAIC

OpenMAIC 是互动课堂载体之一，不是唯一内容源。技术事实保存在 Knowledge Base，教学任务保存在 Mission。

当前已有 Stage 01 第一份 OpenMAIC 样板：

[`07-OpenMAIC/Stage-01-C-and-Memory/01-Memory-Detective/prompt.md`](07-OpenMAIC/Stage-01-C-and-Memory/01-Memory-Detective/prompt.md)

## 最终目标

```text
PC / 上位机
    ↕
Network / Serial / Bus
    ↕
MCU / Embedded Linux
    ↕
FPGA
    ↕
Sensor / Actuator / Real Device
```

面对异常时，不只是猜“软件还是硬件”，而是能够跨层观察证据、缩小范围并找到根因。

---

**Learn it. Break it. Debug it. Build it.**