# Road to Embedded — Development Roadmap

## 当前说明

V2.1 架构重构已经完成并合并到 `main`。项目现在进入 **V2.2 — Stage 01 Interactive Pilot**。

需要继续区分两件事：

1. **版本里程碑是否完成**；
2. **某个后续阶段是否已经提前做了样板内容**。

MCU、Debugging、RTOS、Embedded Linux、FPGA 已存在部分 Knowledge / Mission / Lab 样板，它们仍属于 vertical-slice prototype（纵向样板），用于验证架构，不代表 V2.3～V2.7 已经完成。

---

## V2.1 — Architecture Refactor ✅

目标：完成从“文档教程仓库”到“交互式学习系统”的结构转换，并建立长期可维护的内容模型。

状态：已完成并合并到 `main`。

完成内容包括：Project Charter、Architecture、Knowledge Base / Learning Path 分离、Mission / Lab / Debug Case / OpenMAIC 模型、Stage 00～08 技能地图、Beginner Readability、Glossary、Legacy 迁移与清理、内部导航 P0 验证以及多份 Interactive Lab 原型。

---

## V2.2 — Stage 01 Interactive Pilot ← 当前阶段

目标：完整验证“知识底稿 + Mission + Interactive Lab + Debug Challenge + Boss”的教学闭环。

核心内容：

- Memory Detective；
- Bit Hacker；
- Volatile Mystery；
- Struct Explorer；
- Linker Detective；
- Stage 01 Debug Challenge；
- Stage 01 Boss：Virtual GPIO Controller；
- Stage 01 Review / Exit Check。

核心互动：

- Memory Visualizer；
- Register Playground。

前两关和两个核心互动已经形成原型。V2.2 不追求继续增加互动工具数量，而优先验证：学习者是否能从问题进入知识、通过操作建立直觉、故意制造错误、用证据定位问题，再把能力迁移到下一关。

### V2.2 验收标准

一个只掌握变量、if/for、函数基础的新手，从 Stage 01 README 进入后能够：

```text
Mission 01 Memory
→ Mission 02 Bit/Register
→ Mission 03 volatile
→ Mission 04 struct
→ Mission 05 compile/link
→ Debug Challenge
→ Virtual GPIO Boss
→ Exit Check
```

过程中不要求顺序阅读完整 Knowledge Base；术语第一次出现有直觉解释；每关都能回答“我为什么需要这个知识，它以后和硬件有什么关系”。

---

## V2.3 — MCU / STM32 Learning Path

目标：进入真实 MCU 硬件，并把“代码 → 寄存器 → 引脚 → 仪器 → 真实设备”打通。

计划主题：开发环境与烧录调试、GPIO、External Interrupt、Clock Tree、Timer/PWM、UART、ADC、SPI、I2C、DMA、Watchdog、Flash。

每个核心主题最终应拥有：Beginner Concept、Knowledge Source、Mission、Interactive/Visual Aid、Real Lab、Failure Injection、Debug Challenge、Review。

阶段 Boss：多外设数据采集节点。

---

## V2.4 — Debugging Track

目标：把“会调试”提升为独立核心能力。

重点包括 Evidence-driven debugging、Build/Link Error、Watchpoint、GPIO、UART、SPI、I2C、Interrupt、DMA、HardFault、Stack/Memory、示波器/逻辑分析仪，以及 Timing/Wiring/Power/Ground 问题。

---

## V2.5 — FreeRTOS

目标：理解并发系统为什么需要 RTOS，以及如何避免并发把系统变得不可控。

重点：Task/Scheduler、Queue、Semaphore/Mutex、ISR→Task、Race Condition、Priority Inversion、Deadlock、Queue Overflow、Task Stack、Deadline/Timing。

Boss：把裸机采集系统改造成多任务系统。

---

## V2.6 — Embedded Linux

目标：建立从 Boot 到 Application 的完整系统链路。

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

---

## V2.7 — FPGA

目标：完成从“软件执行”到“硬件并行逻辑”的认知转换。

主线：FPGA 基础、组合/时序逻辑、RTL/Verilog、Simulation、Counter/PWM、FSM、FIFO/BRAM、Clock/Reset、CDC、Timing Constraints、AXI、MCU/CPU + FPGA 协同。

---

## V2.8 — System Integration

目标：把 PC、MCU、Embedded Linux、FPGA、网络和真实设备连接成一个可观测、可调试的完整系统。

重点：接口定义、数据流、控制流、时序预算、日志、自动化测试、跨层故障定位和恢复策略。

---

## V3.0 — Integrated Learning Platform

目标：形成完整可浏览的学习产品，而不只是 GitHub 文件目录。

可能包含静态课程站点、Stage 技能地图、Interactive Labs、OpenMAIC、学习进度、Challenge/Boss、故障案例搜索和项目作品集。

独立 Web 前端仍放在 V2.x 内容体系和真实学习流程验证成熟后决定，避免过早投入 UI。
