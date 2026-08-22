# Stage 07 — FPGA

FPGA 不是“更高级的 MCU”。这一阶段切换思维：从顺序执行的软件，进入并行数字逻辑和时序设计。

## 主线

数字逻辑 → Verilog/SystemVerilog → 组合/时序逻辑 → FSM → Clock/Reset → Simulation → Constraint → Timing → CDC → FPGA 外设与 MCU 协作。

## 互动重点

波形、时钟、FSM、流水线和 CDC 优先使用可视化和仿真，而不是长篇文字。

## Mission 示例

- 为什么两个 always 块可以“同时工作”？
- 仿真正确，为什么上板不工作？
- 两个时钟域之间直接传信号为什么危险？

## Boss

实现一个 FPGA 数据采集/处理模块，与 MCU 通过明确接口通信，并使用仿真、ILA/逻辑分析工具完成验证。