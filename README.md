# Road to Embedded

> 面向工程实践的交互式嵌入式学习系统：从 C、MCU、RTOS、Embedded Linux 到 FPGA，在“观察、操作、故障、调试、项目”中建立真正的工程能力。

## 当前状态

项目目前处于 **V2.1 架构重构分支** `refactor/v2.1-learning-system`。

这意味着：新架构和大量样板内容已经写入 GitHub，但尚未正式合并到 `main`。重构前状态保存在 `backup/pre-v2.1-restructure`。

V2.1 现在的重点不是继续无止境增加课程，而是统一导航、命名、内部链接、新手可读性和旧目录清理。

## 为什么做这个项目

互联网上不缺嵌入式教程。更常见的问题是：不知道先学什么、理论太枯燥、跟着教程能跑但不会排错、学了很多概念却不知道它们在真实系统中的位置。

Road to Embedded 希望把学习变成：

**看到现象 → 产生疑问 → 做出预测 → 互动验证 → 动手实验 → 故意弄坏 → 使用证据排查 → 找到根因 → 完成工程任务。**

## 学习者从哪里开始

不要从仓库第一个文件开始顺序阅读。

从 [`02-Learning-Path/README.md`](02-Learning-Path/README.md) 进入。

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

如果第一次看到 MCU、UART、DMA、ISR、Mutex、FPGA 等术语，先查 [`01-Knowledge-Base/Glossary.md`](01-Knowledge-Base/Glossary.md)。核心内容遵循 [`docs/BEGINNER-READABILITY.md`](docs/BEGINNER-READABILITY.md)：先解释“它是什么、在哪儿、为什么需要”，再进入正式术语和参数。

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

旧的 `01-Fundamentals`、旧 MCU/RTOS/Linux/FPGA/Protocols 等目录仍处于迁移期，仅作为 Legacy 参考，不再作为学习者正式入口。迁移规则见 [`docs/MIGRATION-V2.1.md`](docs/MIGRATION-V2.1.md)。

## 一节课的理想体验

```text
Hook        一个值得追究的现象
↓
Predict     操作前先猜
↓
Visualize   图、动画或交互建立直觉
↓
Action      自己操作
↓
Break It    故意制造错误
↓
Debug       用证据定位原因
↓
Boss        独立解决新问题
↓
Review      短复盘
```

Stage 01 当前入口：

- [`Memory Detective`](04-Missions/Stage-01-C-and-Memory/01-Memory-Detective/Mission.md)
- [`Bit Hacker`](04-Missions/Stage-01-C-and-Memory/02-Bit-Hacker/Mission.md)
- `03-Interactive-Labs/Memory-Visualizer/`
- `03-Interactive-Labs/Register-Playground/`

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
3. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
4. [`docs/CONTENT-DESIGN.md`](docs/CONTENT-DESIGN.md)
5. [`docs/BEGINNER-READABILITY.md`](docs/BEGINNER-READABILITY.md)
6. [`docs/DEVELOPMENT-PLAN.md`](docs/DEVELOPMENT-PLAN.md)
7. [`docs/MIGRATION-V2.1.md`](docs/MIGRATION-V2.1.md)
8. [`09-Progress/V2.1-Migration-Status.md`](09-Progress/V2.1-Migration-Status.md)
9. [`CONTRIBUTING.md`](CONTRIBUTING.md)

新增内容前先判断最合适的媒介，不要默认创建新的长篇 Markdown。

## OpenMAIC

OpenMAIC 是互动课堂载体之一，不是唯一内容源。技术事实保存在 Knowledge Base，教学任务保存在 Mission。

Stage 01 第一份 OpenMAIC 源：

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