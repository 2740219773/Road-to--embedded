# Road to Embedded

> 面向工程实践的交互式嵌入式学习系统：从 C、MCU、RTOS、Embedded Linux 到 FPGA，在“观察、操作、故障、调试、项目”中建立真正的工程能力。

## 为什么做这个项目？

互联网上并不缺嵌入式教程、书籍和视频。

真正的问题往往不是“没有资料”，而是：

- 内容太多，不知道先学什么；
- 大段理论很难长期坚持；
- 看懂了，却不会动手；
- 跟着教程能运行，出现异常就不知道怎么办；
- 学了很多知识，却不知道它在真实工程中的位置。

因此 Road to Embedded 不希望成为另一本电子教材。

我们更希望把学习变成：

**看到一个现象 → 产生疑问 → 做出预测 → 动手验证 → 故意弄坏 → 使用工具排查 → 找到根因 → 完成工程任务。**

## 项目定位

Road to Embedded 是一套可以长期迭代的 **Interactive Embedded Learning System**。

它由三层组成：

```text
Knowledge Base
知识底稿 / 查询手册
        ↓
Interactive Lesson
Slides / Quiz / HTML Simulation / AI 多角色课堂
        ↓
Engineering Lab
代码 / 开发板 / 仪器 / 故障注入 / 综合项目
```

Markdown 仍然重要，但它不再要求学习者从头硬啃到尾。它主要负责保证知识准确、提供查询入口，并作为互动课程的可靠内容源。

## 学习方式

传统课程可能叫：

> 第 3 章：位运算

在这里，它更可能叫：

> **Mission：只想打开一个 LED，为什么其他灯全灭了？**

传统课程可能叫：

> 指针基础

在这里，它会变成：

> **Mission：内存侦探——CPU 到底去哪里找数据？**

知识仍然严谨，但学习入口从“定义”变成“问题”。

## 五级能力模型

```text
L1 见过     知道这个词
L2 理解     能解释它解决什么问题
L3 操作     能完成实验
L4 排错     出现异常能够定位
L5 迁移     换芯片、换项目仍能使用
```

项目最终追求的是 L4～L5，而不是“课程看完了”。

## 总体路线

`C → 计算机与电子基础 → MCU → STM32 → 外设 → 中断/DMA → 通信协议 → FreeRTOS → 调试 → Embedded Linux → FPGA → 系统级联调`

FPGA 会从早期保留数字逻辑入口，但前期主线仍优先建立 MCU 与嵌入式系统的完整工程认知。

## 仓库结构

```text
Road-to--embedded/
├─ 00-Roadmap/          路线、进度、教学系统设计
├─ 01-Fundamentals/     C、计算机组成、数字电路、Linux 基础
├─ 02-MCU/              MCU 原理、STM32、外设与调试
├─ 03-RTOS/             RTOS 与 FreeRTOS
├─ 04-Embedded-Linux/   Linux 系统、驱动与构建系统
├─ 05-FPGA/             数字逻辑、Verilog、Vivado 与 FPGA 项目
├─ 06-Protocols/        UART、SPI、I2C、CAN、Ethernet、Modbus 等
├─ 07-Projects/         分阶段工程项目
├─ 08-Debugging/        调试工具、故障案例与定位方法
├─ 09-Resources/        书籍、课程、开源项目与工具
└─ 10-Interactive-Labs/ 互动课程、挑战与 OpenMAIC 材料
```

## 互动课堂

互动内容可结合 OpenMAIC 等平台实现：

- Slides；
- Quiz；
- HTML Simulation；
- AI Teacher / Rookie Engineer / Debug Mentor；
- PBL 项目课堂。

平台只是载体，核心教学设计和课程源材料保存在本仓库，因此未来可以迁移到其他技术方案。

详细设计见：[`00-Roadmap/Interactive-Learning-System.md`](00-Roadmap/Interactive-Learning-System.md)

## 每一课的理想体验

```text
Hook        一个值得追究的现象
  ↓
Predict     先猜会发生什么
  ↓
Visualize   图、动画或交互建立直觉
  ↓
Play        自己操作
  ↓
Break It    故意制造错误
  ↓
Debug       用证据定位原因
  ↓
Boss        独立完成一个小挑战
  ↓
Review      一页核心知识复盘
```

## 工程化学习原则

1. 先建立系统地图，再深入细节。
2. 能用图和实验说明的内容，不优先使用长篇文字。
3. 操作前先预测，操作后解释现象。
4. 每个重要知识点尽可能设计故障场景。
5. 调试能力与开发能力同等重要。
6. 每个阶段最终用项目串联，而不是用考试结束。
7. 游戏化服务于工程能力，不追求无意义的积分和签到。
8. 从 PC 模拟逐渐进入 MCU、仪器、FPGA 和真实系统。

## 当前阶段

当前进入 **Phase 1：C 与底层基础**，并开始把已有知识底稿改造成互动课程。

第一关：[`Memory Detective — 内存侦探`](10-Interactive-Labs/Phase-1-C/01-Memory-Detective/Mission.md)

详细学习路线：[`00-Roadmap/Learning-Roadmap.md`](00-Roadmap/Learning-Roadmap.md)

学习进度：[`00-Roadmap/Progress.md`](00-Roadmap/Progress.md)

## 最终目标

最终把能力连接成一条完整链路：

```text
PC / 上位机
    ↕
网络 / 串口 / 总线
    ↕
MCU / Embedded Linux
    ↕
FPGA
    ↕
传感器 / 执行器 / 真实设备
```

面对系统异常时，不只是说“软件可能有问题”或“硬件可能有问题”，而是能够跨层观察证据、缩小范围并逐步找到根因。

---

**Learn it. Break it. Debug it. Build it.**