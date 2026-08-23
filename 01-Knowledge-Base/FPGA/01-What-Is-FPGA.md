# FPGA — 不是“更快的 MCU”，而是可以搭数字电路的芯片

## 先建立最重要的区别

MCU 通常已经有一个 CPU。你写 C 程序，CPU 按照指令一条一条执行。

FPGA（Field-Programmable Gate Array）则更像一大片可以由你重新连接的数字逻辑资源。你描述想要什么电路，工具把这些逻辑映射到 FPGA 内部资源中。

```text
MCU
C Program → CPU executes instructions over time

FPGA
HDL / RTL description → Digital Logic → many operations can exist in parallel
```

因此 FPGA 不是简单意义上的“主频更高 MCU”。两者的思考方式不同。

## 一个直觉例子

如果要同时监视 8 路数字输入：

MCU 常见思路是 CPU 在时间上不断执行程序处理这些输入；FPGA 可以直接搭出 8 组同时存在的逻辑电路。

可以把 MCU 想成一个非常快的工人按照任务清单做事；FPGA 更像你直接搭建了一条由很多工位同时工作的生产线。

这个类比并不覆盖所有细节，但非常适合建立第一印象。

## FPGA 里面有什么

初学阶段先认识四类东西：

- LUT：实现组合逻辑的小型逻辑资源；
- Flip-Flop / FF：在时钟边沿保存 0/1 状态；
- Block RAM：芯片内部的存储资源；
- Routing：把不同逻辑资源连接起来的可编程线路。

后面还会遇到 DSP、PLL/MMCM、高速收发器等专用资源。

## HDL 是什么

HDL 是 Hardware Description Language，硬件描述语言，例如 Verilog/SystemVerilog/VHDL。

它看起来像代码，但目标不是告诉 CPU“第一步做什么、第二步做什么”，而是描述数字电路的结构和行为。

## Stage 07 第一目标

不是马上写复杂 Verilog，而是彻底建立：组合逻辑、时序逻辑、Clock、Register、并行执行这几个数字电路概念。