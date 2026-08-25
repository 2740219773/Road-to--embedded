# Road to Embedded — Development Roadmap

## 当前说明

已完成并合并：

```text
V2.1 — Architecture Refactor
V2.2 — Stage 01 Interactive Pilot
V2.3 Phase A — Stage 02 MCU Foundation
```

**V2.3 Phase B — Stage 03 Peripheral Engineer 已完成并合并到 main。**

需要长期区分：

1. 版本里程碑是否真正完成；
2. 后续 Stage 是否只是提前存在 vertical-slice prototype。

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

## V2.3 — MCU / STM32 Learning Path ← Historical Baseline

V2.3 保留 MCU / STM32 大目标，但拆成两个连续 Phase，避免新手第一次接触开发板时同时吞下所有通信外设。

### Phase A — Stage 02 MCU Foundation ✅

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

正式完成：

- Development Board / MCU / Debug Probe；
- Build / Flash / Reset / Run / Breakpoint；
- GPIO Input / Output；
- Clock Tree 基础；
- External Interrupt；
- Timer；
- PWM 基础；
- Debugger；
- Multimeter / Oscilloscope 初步取证；
- Datasheet / Schematic 基础阅读；
- Mission 00～04；
- Mixed Hardware Debug Challenge；
- GPIO Control Node Boss；
- Stage 02 Exit Check。

状态：已完成并合并到 `main`。

### Phase B — Stage 03 Peripheral Engineer ✅

目标：在 Stage 02 的真实硬件底座上扩展外设、总线和数据链复杂度，同时保持统一调查模型。

正式主线：

```text
UART
→ I²C
→ SPI
→ ADC
→ DMA
→ CAN
→ RS-485
→ Modbus RTU
```

每个主题均要求：

```text
Beginner Knowledge
→ Mission
→ Interactive / Visual Aid
→ Real Measurement
→ Failure Injection
→ Debug Case
```

阶段综合：

```text
Stage 03 Mixed Peripheral Debug Challenge
→ Multi-Peripheral Sensor Node Boss
→ Stage 03 Exit Check
```

关键边界：

- PWM 基础属于 Stage 02，Stage 03 只复用；
- RS-485 先处理 Physical / Differential / Half-Duplex；
- Modbus 再处理 Frame / Address / Function / Register Meaning；
- 不在 Phase B 尾部临时追加 Watchdog、Flash、Ethernet 或更多协议；
- 新主题只有在后续版本存在明确学习目标和完整闭环时加入。

当前状态：内容闭环、零基础走查、导航/术语检查和质量门已完成并合并。

V2.4 Stage 04 与 V2.5 Stage 05 已完成本地质量门；V2.6 Beginner Journey Audit 已完成；当前 **V2.7 — Beginner Framework and Content Quality Gate 已通过**。Stage 06～08 仍保持 prototype 边界，正式建设暂不提前开始。

### V2.3 总验收标准

完成 V2.3 后，学习者应能面对一个新的 MCU 外设问题，从：

```text
Application / Data
→ Clock / Timing
→ Peripheral / Register
→ Pin / Bus
→ Electrical Signal
→ External Device
→ Protocol / Data Meaning
```

建立证据链，并完成一个可观察、可故障注入、可回归验证的多外设 MCU 节点。

---

## V2.4 — Debugging Track / Stage 04 ✅

目标：把 Stage 01～03 已经反复使用的“会排错”提升为独立、可迁移的方法体系，而不是继续通过增加外设制造内容量。

重点：

```text
Symptom
→ System Layer
→ Hypotheses
→ High-value Measurement
→ Evidence
→ Root Cause
→ Minimal Fix
→ Regression
```

主题包括：Evidence-driven Debugging、Build/Link Error、Watchpoint、HardFault、Stack/Memory、Interrupt、Timing、Wiring、Power/Ground，以及 Debugger / Oscilloscope / Logic Analyzer 的工具选择。

当前状态：Mission 闭环、Debug Case、Mixed Challenge、Evidence Workbench、Boss Host Fixture 和 Exit Check 已建立；内容、浏览器和 Host Fixture 质量门已通过。真实 MCU、Debugger、示波器和逻辑分析仪仍未验证。

Boss：Broken Firmware Investigation。

---

## V2.5 — RTOS Engineer / Stage 05 ✅

目标：理解并发系统为什么需要 RTOS，以及如何用证据定位调度、同步、队列和实时性问题。

重点：Task/Scheduler、Queue、Semaphore/Mutex、ISR→Task、Race Condition、Priority Inversion、Deadlock、Queue Overflow、Task Stack、Deadline/Timing。

当前状态：四个 Mission、RTOS Concurrency Workbench、Mixed Concurrency Challenge、RTOS Refactor Boss、Exit Check 和 V2.5 Quality Gate 已完成；真实 FreeRTOS、MCU、Debugger 和仪器不纳入本地质量门。

Boss：把裸机多外设采集系统改造成多任务系统。

---

## V2.6 — Beginner Journey Audit

目标：从完全没有嵌入式经验的学习者视角，验证入口、前置知识、Mission、Lab、Debug、Boss 和 Exit Check 是否连续可执行。

重点：Start Here、零基础编程热身、Stage 00 正式闭环、路线 manifest、正式内容字段一致性、GitHub 参考清单和新手走查记录。

当前状态：Start Here、路线 manifest、Stage 00 闭环、正式内容结构、浏览器回归和新手视角验收均已通过。Stage 06～08 仍保持 prototype 边界。

---

## V2.7 — Embedded Linux

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

## V2.8 — FPGA

---

## V2.9 — System Integration

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

任何阶段如果开始大量增加“会调用 API”的内容，却没有 Mission、真实证据、故障、Mixed Challenge 和 Boss，应暂停扩张并先补闭环。
