# Projects — 综合工程

Project 与 Mission 不同：Mission 训练一个主要能力，Project 要求把多个能力组合起来完成可运行系统。

## 分级

- Beginner：PC 模拟器、GPIO/UART 小系统。
- Intermediate：多外设、RTOS、协议、数据采集。
- Advanced：MCU + FPGA / Linux / 上位机系统级联调。

每个项目至少包含需求、接口、验收标准、故障场景和复盘，不以“代码能运行”作为唯一完成标准。

## 当前建设

- [Stage 04 Boss — Broken Firmware Investigation](Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)：平台无关的 Host Fault Fixture、五份 Evidence Pack 和 System Fault Map 训练。
- [Stage 05 Boss — RTOS Refactor](Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)：把 Stage 03 多外设采集节点重构为可观察的并发系统，并用确定性 Host Fixture 验证 Race、Priority、Deadlock、Queue、ISR 和 Stack 证据。

Boss Fixture 的 PC 侧结果与真实 Cortex-M 寄存器、示波器和逻辑分析仪证据分开记录；没有编译器时只保留静态验证结论。
