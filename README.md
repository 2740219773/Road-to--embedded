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

它更希望把学习变成：

**看到现象 → 产生疑问 → 做出预测 → 互动验证 → 动手实验 → 故意弄坏 → 使用证据排查 → 找到根因 → 完成工程任务。**

## 先从哪里开始？

如果你是学习者，不要从头遍历整个仓库。

从这里进入：

[`02-Learning-Path/README.md`](02-Learning-Path/README.md)

学习路线采用 Stage：

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

每个 Stage 由 Mission、Interactive Lab、Debug Challenge 和 Boss Project 组成。

## 项目内容模型

Road to Embedded 把“知识”和“学习体验”分开：

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

Markdown 仍然重要，但它主要作为课程源、知识底稿和维护文档，而不是唯一学习界面。

## V2.1 新架构

```text
Road-to--embedded/
├─ PROJECT.md              项目定位与边界
├─ ROADMAP.md              长期开发路线
├─ CONTRIBUTING.md         内容与维护规则
├─ docs/                   架构、内容设计、开发计划、迁移说明
├─ 01-Knowledge-Base/      技术知识真相源
├─ 02-Learning-Path/       Stage 学习主线
├─ 03-Interactive-Labs/    HTML / 动画 / 可视化 / 模拟器
├─ 04-Missions/            问题驱动的课程关卡
├─ 05-Projects/            阶段综合工程
├─ 06-Debugging-Cases/     故障案例与根因分析
├─ 07-OpenMAIC/            OpenMAIC 课程源和生成提示
├─ 08-Resources/           外部资料、项目和工具索引
└─ 09-Progress/            学习进度与阶段复盘
```

当前仍处于 V2.1 迁移期，旧目录暂时保留，直到新结构完成验证后再清理。

迁移说明：[`docs/MIGRATION-V2.1.md`](docs/MIGRATION-V2.1.md)

## 学习体验原则

一节核心课程尽量采用：

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

例如传统教材中的“指针基础”，在这里变成：

[`Mission 001 — Memory Detective`](04-Missions/Mission-001-Memory-Detective/Mission.md)

而不是要求学习者先阅读大量定义。

## 五级能力模型

```text
L1 见过     知道这个词
L2 理解     能解释它解决什么问题
L3 操作     能完成实验
L4 排错     出现异常能够定位
L5 迁移     换芯片、换项目仍能使用
```

项目最终追求的是 L4～L5，而不是“课程看完了”。

## 如何维护这个项目？

如果你是在维护或继续开发课程，优先阅读：

1. [`PROJECT.md`](PROJECT.md)
2. [`ROADMAP.md`](ROADMAP.md)
3. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
4. [`docs/CONTENT-DESIGN.md`](docs/CONTENT-DESIGN.md)
5. [`docs/DEVELOPMENT-PLAN.md`](docs/DEVELOPMENT-PLAN.md)
6. [`CONTRIBUTING.md`](CONTRIBUTING.md)

新增知识前先判断它最适合的媒介，不要默认创建新的长篇 Markdown。

## OpenMAIC

OpenMAIC 可以作为互动课堂载体，用于：

- Slides；
- Quiz；
- HTML Simulation；
- AI Teacher / Rookie Engineer / Debug Mentor；
- PBL 项目课堂。

但平台不是项目本身。技术事实保存在 Knowledge Base，教学任务保存在 Mission，OpenMAIC 只负责将它们转化成课堂体验。

第一份 OpenMAIC 源：

[`07-OpenMAIC/Mission-001-Memory-Detective/prompt.md`](07-OpenMAIC/Mission-001-Memory-Detective/prompt.md)

## 最终目标

最终把能力连接成：

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

面对系统异常时，不只是判断“软件可能有问题”或“硬件可能有问题”，而是能够跨层观察证据、缩小范围并逐步找到根因。

---

**Learn it. Break it. Debug it. Build it.**