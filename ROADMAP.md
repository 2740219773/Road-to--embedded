# Road to Embedded — Development Roadmap

## V2.1 — Architecture Refactor

目标：完成从“文档教程仓库”到“交互式学习系统”的结构转换。

### 必做

- [ ] 建立 Project Charter；
- [ ] 建立架构文档；
- [ ] 建立长期开发计划与维护规范；
- [ ] 将 Knowledge Base 与 Learning Path 分离；
- [ ] 建立 Mission / Lab / Debug Case / OpenMAIC 标准模板；
- [ ] 建立 Stage / Mission / Boss 技能地图；
- [ ] 为旧目录建立迁移映射；
- [ ] 完成 Phase 1 第一批内容迁移；
- [ ] 检查所有内部链接；
- [ ] 合并重构分支进入 main。

### 验收标准

一个新维护者只阅读以下文件，即可理解项目如何继续建设：

```text
README.md
PROJECT.md
ROADMAP.md
docs/ARCHITECTURE.md
docs/CONTENT-DESIGN.md
docs/DEVELOPMENT-PLAN.md
CONTRIBUTING.md
```

## V2.2 — Phase 1 Interactive Pilot

目标：完整验证“知识底稿 + Mission + 交互模拟 + OpenMAIC + Challenge”的教学闭环。

计划完成：

- Memory Detective；
- Bit Hacker；
- Volatile Mystery；
- Struct Explorer；
- Linker Detective；
- Phase 1 Boss：Virtual GPIO Controller。

至少开发 2 个可直接运行的 HTML 交互模拟器：

- Memory Visualizer；
- 32-bit Register Playground。

验收标准：一个没有嵌入式经验的学习者可以不按顺序阅读所有知识文档，而是沿 Mission 主线完成 Phase 1。

## V2.3 — MCU / STM32 Learning Path

目标：正式进入真实硬件。

计划主题：

- 开发环境与烧录调试；
- GPIO；
- External Interrupt；
- Timer / PWM；
- UART；
- ADC；
- SPI；
- I2C；
- DMA；
- Watchdog；
- Flash；
- Clock Tree。

每个核心主题至少拥有：

```text
Knowledge Source
Mission
Real Lab
Failure Injection
Debug Challenge
Review
```

Phase Boss：多外设数据采集节点。

## V2.4 — Debugging Track

目标：把“会调试”从附属技能提升为独立主线。

计划：

- Build / Link Error；
- GPIO no response；
- UART garbled data；
- SPI no response；
- I2C NACK；
- interrupt not firing；
- DMA abnormal；
- HardFault；
- timing issue；
- power / wiring / ground issue。

建立故障案例库，并统一采用：

```text
Symptom
Evidence
Hypothesis
Experiment
Root Cause
Fix
Prevention
```

## V2.5 — FreeRTOS

目标：通过可视化理解实时系统，而不是只背 API。

重点交互组件：

- Scheduler Timeline；
- Priority Simulation；
- Queue Animation；
- Mutex Race Demo；
- Deadlock Challenge。

Boss：将裸机采集系统改造成多任务系统。

## V2.6 — Embedded Linux

目标：建立从 Boot 到 Application 的完整系统链路。

主题：

Bootloader → Kernel → Device Tree → Driver → User Space → Network / Application。

## V2.7 — FPGA

目标：建立“软件执行”与“硬件并行逻辑”的认知转换。

重点：

- combinational / sequential logic；
- Verilog；
- simulation；
- FSM；
- FIFO / RAM；
- clock / reset；
- CDC；
- timing constraints；
- AXI；
- MCU / CPU + FPGA 协同。

重点交互组件：FSM Visualizer、Clock Domain Visualizer、Timing Explorer。

## V3.0 — Integrated Learning Platform

目标：形成完整可浏览的学习产品，而不只是 GitHub 文件目录。

可能包含：

- 静态课程站点；
- 学习 Stage 地图；
- 可运行 Interactive Labs；
- OpenMAIC 课程入口；
- 学习进度；
- Challenge / Boss 系统；
- 故障案例搜索；
- 项目作品集。

V3.0 是否开发独立 Web 前端，在 V2.x 内容体系成熟后再决定，避免过早投入界面开发。