# FPGA Knowledge Base

这里保存 FPGA / 数字逻辑相关的技术知识真相源。学习主入口：`02-Learning-Path/Stage-07-FPGA/`。

## 知识范围

- Binary / Boolean Logic；
- Combinational / Sequential Logic；
- Clock / Reset；
- Verilog / SystemVerilog；
- Testbench / Simulation；
- FSM；
- FIFO / RAM；
- CDC；
- Timing Constraint；
- Static Timing Analysis；
- UART / SPI 等接口逻辑；
- AXI；
- MCU / CPU / FPGA 协同。

## 最重要的思维切换

FPGA 不是“另一种写软件的方法”。HDL 描述的是硬件结构和并行关系。

```text
Software
指令按时间执行

FPGA
多个逻辑结构同时存在并并行工作
```

## 验证闭环

```text
设计意图
↓
HDL
↓
Simulation
↓
Synthesis / Implementation
↓
Timing Analysis
↓
Programming
↓
ILA / Oscilloscope / Logic Analyzer
```

“仿真通过”不等于“硬件一定正确”，“能综合”也不是完成标准。

## 适合的互动形式

FSM 动画、波形时间轴、流水线、Clock Domain Crossing、Setup/Hold 与 Timing Path 都优先可视化。