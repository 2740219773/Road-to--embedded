# Development Plan — V2.1

## 目标

V2.1 的核心仍然是完成架构重构和维护体系，而不是宣布所有后续课程完成。

当前分支已经提前制作了多个后续 Stage 的纵向样板，用来验证新架构是否能支持 MCU、Debugging、RTOS、Embedded Linux、FPGA。接下来必须从“继续扩内容”切回“整理、验证、收口”。

## Workstream A — Project Governance

- [x] `PROJECT.md`
- [x] `ROADMAP.md`
- [x] `CONTRIBUTING.md`
- [x] `docs/ARCHITECTURE.md`
- [x] `docs/CONTENT-DESIGN.md`
- [x] `docs/MIGRATION-V2.1.md`
- [x] `docs/BEGINNER-READABILITY.md`
- [x] 课程 / Mission / Lab / Debug Case 模板
- [x] README 已切换到新架构
- [ ] 完成本轮 Repository Audit 修订

## Workstream B — New Directory Model

新主结构已经建立：

```text
01-Knowledge-Base/
02-Learning-Path/
03-Interactive-Labs/
04-Missions/
05-Projects/
06-Debugging-Cases/
07-OpenMAIC/
08-Resources/
09-Progress/
```

当前任务不是再增加新的顶层分类，而是保持这些职责稳定。

## Workstream C — Migration & Cleanup

已完成第一轮内容迁移，但旧目录仍然存在，因此当前存在“新旧双轨”。

接下来按下面顺序收口：

1. 统一 Mission 命名为 `Stage-XX-.../NN-Mission-Name/`；
2. 修复 Stage README 中仍指向旧知识目录的说明；
3. 检查 README / Mission / OpenMAIC 的内部路径；
4. 在旧顶层目录增加明确 Legacy 标识；
5. 搜索仍引用 `01-Fundamentals`、旧 `02-MCU`～`10-Interactive-Labs` 的新内容；
6. 确认旧文件已经迁移或废弃；
7. 最后删除旧目录。

在完成第 1～6 步之前，不直接批量删除旧目录。

## Workstream D — Learning Path Consistency

Stage 主线保持：

```text
Stage 00 System Explorer
Stage 01 C & Memory
Stage 02 MCU Rookie
Stage 03 Peripheral Engineer
Stage 04 Debug Hunter
Stage 05 RTOS Engineer
Stage 06 Embedded Linux
Stage 07 FPGA Builder
Stage 08 System Integrator
```

检查每个 Stage 是否至少明确：

- 学之前要知道什么；
- 为什么现在学这个；
- 核心 Mission；
- 可用 Interactive Lab；
- Debug Challenge；
- Boss Project；
- Exit Criteria。

V2.1 不要求每个 Stage 内容完整，但不允许 Stage 顺序和技术职责互相冲突。

## Workstream E — Vertical-Slice Validation

已经完成的纵向样板包括：

- Stage 01：Memory / Register；
- Stage 02～03：GPIO、UART、I2C、SPI、ADC、PWM、DMA、CAN、Modbus；
- Stage 04：HardFault、Watchpoint、Stack、仪器取证；
- Stage 05：Scheduler、Race、Deadlock 等；
- Stage 06：Linux System / Boot / Device Tree / Cross Compilation；
- Stage 07：FPGA mindset / combinational / sequential / RTL。

这些样板用于验证：

```text
Beginner Concept
→ Knowledge
→ Mission
→ Interactive Lab
→ Real / Simulated Evidence
→ Debug Case
→ Boss
```

后续正式版本再补齐缺失环节。

## Workstream F — Beginner Readability

所有新人第一次可能遇到的术语，按以下顺序表达：

```text
它是什么
→ 在系统哪里
→ 为什么需要
→ 直觉类比
→ 英文名 / 缩写
→ 最小结构图
→ 参数 / API / 寄存器
```

当前优先反查：MCU、Protocol、Debugging、RTOS、Linux、FPGA 的第一入口页面。

## Workstream G — Quality Gate

V2.1 合并前必须满足：

- [ ] 首页只把新结构作为正式入口；
- [ ] 所有新顶层目录职责清晰；
- [ ] Stage 00～08 导航一致；
- [ ] Mission 命名一致；
- [ ] Knowledge 与 Mission 没有大段重复维护；
- [ ] OpenMAIC prompt 指向正确 Knowledge / Mission；
- [ ] 无关键死链；
- [ ] 旧目录带 Legacy 标识；
- [ ] 旧内容都有迁移去向；
- [ ] 新手关键术语有第一次解释；
- [ ] backup branch 可恢复重构前状态；
- [ ] `09-Progress/V2.1-Migration-Status.md` 与真实状态一致。

## 当前优先级

### P0

一致性、导航、命名、迁移、死链、Legacy 清理。

### P1

Stage 01 完整闭环和新手可读性。

### P2

修订现有纵向样板，使其真正引用同一套 Knowledge / Mission / Lab。

### P3

在 V2.1 合并后，再继续批量扩展新内容。

## 维护节奏

后续新增内容继续采用小闭环：

```text
一个知识主题
→ 一个 Mission
→ 一个互动或真实实验
→ 一个故障场景
→ 更新 Stage / Progress
```

避免再次出现“内容增加很快，但导航和版本说明没有同步”的情况。