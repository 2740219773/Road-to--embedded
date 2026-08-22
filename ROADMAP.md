# Road to Embedded — Development Roadmap

## 当前说明

项目当前仍处于 **V2.1 架构重构阶段**。

需要特别区分两件事：

1. **版本里程碑是否完成**；
2. **某个后续阶段是否已经提前做了样板内容**。

为了验证新架构，我们已经提前制作了 MCU、Debugging、RTOS、Embedded Linux、FPGA 的部分 Knowledge / Mission / Lab 样板。这些内容属于 **vertical-slice prototype（纵向样板）**，用于验证架构，不代表 V2.3～V2.7 已经完成。

---

## V2.1 — Architecture Refactor

目标：完成从“文档教程仓库”到“交互式学习系统”的结构转换，并建立长期可维护的内容模型。

### 已完成

- [x] 建立 Project Charter；
- [x] 建立架构文档；
- [x] 建立长期开发计划与维护规范；
- [x] 将 Knowledge Base 与 Learning Path 分离；
- [x] 建立 Mission / Lab / Debug Case / OpenMAIC 标准模板；
- [x] 建立 Stage 00～08 技能地图；
- [x] 建立旧目录迁移映射；
- [x] 完成 System / Embedded C 第一轮迁移；
- [x] 建立 Beginner Readability 规范与 Glossary；
- [x] 通过 MCU / Debug / RTOS / Linux / FPGA 样板验证新架构可扩展性；
- [x] 建立多份可运行 HTML Interactive Lab 原型。

### V2.1 当前剩余

- [ ] 统一 Mission 命名与 Stage 归属；
- [ ] 修复 README / Stage / Mission / OpenMAIC 的陈旧路径；
- [ ] 全仓检查重复知识和双轨导航；
- [ ] 给旧目录明确 Legacy / Deprecated 标识；
- [ ] 检查新手首次出现术语的解释完整性；
- [ ] 检查所有关键内部链接；
- [ ] 确认旧内容都有新归属后清理旧目录；
- [ ] 更新 V2.1 Audit / Migration Status；
- [ ] Draft PR 完成 Review 后合并 `main`。

### V2.1 验收标准

一个新维护者只阅读以下文件，就能理解项目结构、当前状态和下一步：

```text
README.md
PROJECT.md
ROADMAP.md
CONTRIBUTING.md
docs/ARCHITECTURE.md
docs/CONTENT-DESIGN.md
docs/BEGINNER-READABILITY.md
docs/DEVELOPMENT-PLAN.md
docs/MIGRATION-V2.1.md
09-Progress/V2.1-Migration-Status.md
```

一个新学习者从 `02-Learning-Path/` 进入时，不需要理解旧目录，也不会被维护结构干扰。

---

## V2.2 — Stage 01 Interactive Pilot

目标：完整验证“知识底稿 + Mission + Interactive Lab + OpenMAIC + Debug Challenge + Boss”的教学闭环。

核心内容：

- Memory Detective；
- Bit Hacker；
- Volatile Mystery；
- Struct Explorer；
- Linker Detective；
- Stage 01 Boss：Virtual GPIO Controller。

核心互动：

- Memory Visualizer；
- Register Playground。

其中前两关和两个核心互动已经提前形成原型，V2.2 的重点将是把它们整理成完整、连续、可验证的学习体验，而不是重新从零制作。

---

## V2.3 — MCU / STM32 Learning Path

目标：进入真实 MCU 硬件，并把“代码 → 寄存器 → 引脚 → 仪器 → 真实设备”打通。

计划主题：

- 开发环境与烧录调试；
- GPIO；
- External Interrupt；
- Clock Tree；
- Timer / PWM；
- UART；
- ADC；
- SPI；
- I2C；
- DMA；
- Watchdog；
- Flash。

每个核心主题最终应拥有：

```text
Beginner Concept
Knowledge Source
Mission
Interactive / Visual Aid
Real Lab
Failure Injection
Debug Challenge
Review
```

阶段 Boss：多外设数据采集节点。

当前已有 GPIO、Interrupt、Timer/PWM、Clock、ADC、DMA、UART、I2C、SPI 等部分样板，但仍需后续补真实开发板实验和统一验收。

---

## V2.4 — Debugging Track

目标：把“会调试”提升为独立核心能力。

重点：

- Evidence-driven debugging；
- Build / Link Error；
- Watchpoint；
- GPIO no response；
- UART garbled data；
- SPI wrong timing/data；
- I2C NACK；
- Interrupt storm / not firing；
- DMA abnormal / memory corruption；
- HardFault；
- Stack / memory corruption；
- Oscilloscope / Logic Analyzer evidence；
- Timing / wiring / power / ground issue。

当前已有多份方法页、Mission 和 Debugging Case 原型，后续重点是形成成套 Evidence Pack 和可重复练习工程。

---

## V2.5 — FreeRTOS

目标：理解并发系统为什么需要 RTOS，以及如何避免并发把系统变得不可控。

重点：

- Task / Scheduler；
- Queue；
- Semaphore / Mutex；
- ISR → Task collaboration；
- Race Condition；
- Priority Inversion；
- Deadlock；
- Queue Overflow；
- Task Stack；
- Deadline / Timing。

核心互动：Scheduler Timeline、Race Interleaving、后续 Queue / Mutex 动画。

Boss：把裸机采集系统改造成多任务系统。

---

## V2.6 — Embedded Linux

目标：建立从 Boot 到 Application 的完整系统链路。

主线：

```text
Bootloader
→ Kernel
→ Device Tree
→ Driver
→ Device Node / User Space
→ Cross Compilation
→ Buildroot / Yocto
→ Network / Device Service
```

当前已有系统分层、Process/File/Device、Boot、Device Tree、Cross Compilation、Buildroot/Yocto 等入门样板。

---

## V2.7 — FPGA

目标：完成从“软件执行”到“硬件并行逻辑”的认知转换。

主线：

- FPGA 是什么；
- combinational / sequential logic；
- RTL / Verilog mindset；
- simulation；
- counter / PWM；
- FSM；
- FIFO / BRAM；
- clock / reset；
- CDC；
- timing constraints；
- AXI；
- MCU / CPU + FPGA 协同。

当前已建立第一批“FPGA 不是更快 MCU”“组合/时序逻辑”“RTL 思维”样板。后续重点必须继续保持波形、结构图和仿真优先，避免退化成 Verilog 语法教材。

---

## V2.8 — System Integration

目标：把 PC、MCU、Embedded Linux、FPGA、网络和真实设备连接成一个可观测、可调试的完整系统。

重点：接口定义、数据流、控制流、时序预算、日志、自动化测试、跨层故障定位和恢复策略。

---

## V3.0 — Integrated Learning Platform

目标：形成完整可浏览的学习产品，而不只是 GitHub 文件目录。

可能包含：

- 静态课程站点；
- Stage 技能地图；
- 可运行 Interactive Labs；
- OpenMAIC 课程入口；
- 学习进度；
- Challenge / Boss 系统；
- 故障案例搜索；
- 项目作品集。

是否开发独立 Web 前端，在 V2.x 内容体系和真实学习流程验证成熟后再决定，避免过早投入 UI。