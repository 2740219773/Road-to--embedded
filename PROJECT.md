# Project Charter — Road to Embedded

## 项目名称

**Road to Embedded**

## 项目定位

Road to Embedded 是一套面向工程实践的交互式嵌入式学习系统。

它不是单纯的资料收藏夹，也不是一本按章节阅读的电子教材。项目的核心目标是帮助学习者通过“现象、任务、互动、实验、故障和项目”逐步建立真正可迁移的工程能力。

核心学习闭环：

```text
产生兴趣
  ↓
观察现象
  ↓
提出问题
  ↓
做出预测
  ↓
互动验证
  ↓
真实实验
  ↓
故障注入
  ↓
调试定位
  ↓
工程项目
  ↓
复盘沉淀
```

## 目标学习者

- 完全零基础，希望系统进入嵌入式方向的人；
- 已有软件开发经验，希望补足底层能力的人；
- MCU 初学者，希望进一步学习 RTOS、Embedded Linux、FPGA 的人；
- 已经会写代码，但故障定位和系统理解能力不足的人。

## 核心能力目标

学习者最终应逐步建立：

- C 与底层内存模型；
- MCU 与常见外设开发；
- UART / SPI / I2C / CAN / Ethernet 等通信能力；
- 中断、DMA、时序与实时性理解；
- FreeRTOS / RTOS 工程能力；
- Embedded Linux 基础与驱动认知；
- FPGA / Verilog / 时序逻辑基础；
- 示波器、逻辑分析仪、JTAG/SWD 等调试工具能力；
- 跨层问题定位和根因分析能力；
- PC ↔ MCU ↔ FPGA ↔ 真实设备的系统级理解。

## 五级能力模型

```text
L1 见过：知道术语
L2 理解：能解释它解决什么问题
L3 操作：能够完成实验
L4 排错：出现异常能够定位
L5 迁移：更换芯片或项目仍能使用
```

项目不以“看完课程”为完成目标，而是尽量推动学习者达到 L4～L5。

## 项目不做什么

Road to Embedded 不追求：

- 收集互联网上所有嵌入式资料；
- 重写所有经典教材；
- 为每一种 MCU、FPGA 或开发板制作完整手册；
- 通过签到、积分等形式制造虚假的学习进度；
- 用 AI 直接替代真实实验和工程思考。

## 内容分层

项目内容分为三个主要学习层：

### Knowledge Base

保证知识准确，适合查询、复习和作为 AI / OpenMAIC 的课程源。

### Interactive Learning

使用 Mission、Slides、Quiz、HTML 模拟器、AI 多角色课堂等方式降低抽象知识的理解成本。

### Engineering Practice

通过代码、开发板、仪器、故障注入和综合项目，将知识转化为工程能力。

## 内容设计原则

1. 知识点不是课程，问题和任务才是课程入口。
2. 能用图、动画和实验解释的内容，不优先使用长篇文字。
3. 操作前尽量先让学习者预测结果。
4. 重要知识点尽量设计一个典型故障。
5. 调试能力与开发能力同等重要。
6. 每个阶段使用 Boss Project 做综合验证。
7. 游戏化只服务于真实工程能力。
8. 学习路线与知识库分离，避免知识重复维护。

## 技术载体

项目允许使用多种载体：

- Markdown：知识底稿、规范、任务说明；
- HTML/CSS/JavaScript：交互模拟与可视化；
- OpenMAIC：Slides、Quiz、AI 多角色课堂、PBL；
- C / C++ / Python / Verilog 等：实验代码；
- STM32 / MCU / FPGA 开发板：真实硬件实验；
- 示波器 / 逻辑分析仪 / 万用表 / JTAG：调试实验。

平台不是项目本身。课程设计和核心知识必须能够保存在仓库中，避免锁定在单一平台。

## 当前版本目标

当前正在进行 **V2.1 架构重构**。

V2.1 的任务是把现有“技术章节式资料库”重构为：

```text
Knowledge Base
Learning Path
Interactive Labs
Missions
Projects
Debugging Cases
OpenMAIC
Resources
Progress
```

详细计划见 `ROADMAP.md` 与 `docs/DEVELOPMENT-PLAN.md`。