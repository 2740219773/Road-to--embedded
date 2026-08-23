# Road to Embedded — Development Roadmap

## 当前说明

V2.1 架构重构与 V2.2 Stage 01 Interactive Pilot 已完成并合并到 `main`。

项目当前进入 **V2.3 — MCU / STM32 Learning Path**。

需要长期区分两件事：

1. **版本里程碑是否完成**；
2. **后续 Stage 是否已经提前存在纵向样板**。

Debugging、RTOS、Embedded Linux、FPGA 已经存在部分 Knowledge / Mission / Lab 样板，它们用于验证架构，不代表对应正式版本已经完成。

---

## V2.1 — Architecture Refactor ✅

目标：完成从“文档教程仓库”到“交互式学习系统”的结构转换，并建立长期可维护的内容模型。

状态：已完成并合并到 `main`。

主要成果：Project Charter、Architecture、Knowledge / Learning Path 分离、Mission / Lab / Debug Case / OpenMAIC 模型、Stage 00～08 技能地图、新手可读性规范、Glossary、Legacy 清理和 P0 导航验证。

---

## V2.2 — Stage 01 Interactive Pilot ✅

目标：完整验证：

```text
Knowledge
→ Mission
→ Interactive Lab
→ Debug Challenge
→ Boss Project
→ Exit Check
```

正式完成：Memory Detective、Bit Hacker、Volatile Mystery、Struct Explorer、Linker Detective、Mixed Debug Challenge、Virtual GPIO Controller Boss、Stage 01 Exit Check。

状态：已完成并合并到 `main`。

---

## V2.3 — MCU / STM32 Learning Path ← 当前版本

V2.3 保留原来的 MCU / STM32 大目标，但拆成两个连续 Phase，避免新手第一次接触开发板时同时吞下所有通信外设。

### Phase A — Stage 02 MCU Foundation / MCU Rookie

目标：第一次把 Stage 01 的虚拟模型接到真实硬件。

```text
C Code
→ Firmware
→ CPU
→ Peripheral Register
→ GPIO / Timer
→ Physical Pin
→ Voltage / Waveform
→ Instrument Evidence
```

核心主题：

- Development Board / MCU / Debug Probe；
- Build / Flash / Reset / Run / Breakpoint；
- GPIO Input / Output；
- Clock Tree 基础；
- External Interrupt；
- Timer；
- PWM 基础；
- Debugger；
- Multimeter / Oscilloscope 初步取证；
- Datasheet / Schematic 基础阅读。

核心 Mission：First Contact、First LED、Button Interrupt、Timer Tick、PWM Measurement。

阶段综合：Stage 02 Mixed Hardware Debug Challenge + GPIO Control Node Boss + Exit Check。

### Phase B — Stage 03 Peripheral Engineer

Phase A 稳定后继续同一个 V2.3 版本，而不是回头把所有外设塞进 Stage 02。

核心主题：

- UART；
- I²C；
- SPI；
- ADC；
- DMA；
- CAN；
- RS-485 / Modbus；
- Watchdog / Flash 等 MCU 工程基础按需要补入。

PWM 的基础概念和真机测量已放在 Stage 02；Stage 03 只在综合项目需要时复用，不再把 PWM 当成新的主线知识重复教授。

阶段 Boss：Multi-Peripheral Sensor Node。

### V2.3 总验收标准

完成 V2.3 后，学习者应能面对一个新的 MCU 外设问题，从：

```text
Clock
→ Peripheral
→ Register
→ Pin / Bus
→ Electrical Signal
→ External Device
```

建立证据链，并完成一个多外设 MCU 节点。

---

## V2.4 — Debugging Track

目标：把“会调试”提升为独立核心能力，而不是只在每关顺带排错。

重点：Evidence-driven Debugging、Build/Link Error、Watchpoint、GPIO/UART/SPI/I²C/Interrupt/DMA 故障、HardFault、Stack/Memory、示波器/逻辑分析仪，以及 Timing/Wiring/Power/Ground 问题。

Boss：Broken Firmware Investigation。

---

## V2.5 — FreeRTOS

目标：理解并发系统为什么需要 RTOS，以及如何避免并发把系统变得不可控。

重点：Task/Scheduler、Queue、Semaphore/Mutex、ISR→Task、Race Condition、Priority Inversion、Deadlock、Queue Overflow、Task Stack、Deadline/Timing。

Boss：把裸机多外设采集系统改造成多任务系统。

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

---

## 路线守门原则

后续版本必须持续满足：

```text
先建立底层模型
→ 再增加外设数量
→ 再系统训练调试
→ 再进入并发 RTOS
→ 再进入 Linux / FPGA
→ 最后做跨层系统集成
```

任何阶段如果开始大量增加“会调用 API”的内容，却没有 Mission、真实证据、故障和 Boss，应暂停扩张并先补闭环。