# Mission — Software or Hardware：这段 Verilog 到底变成了什么？

## Related

- [Stage 07 — FPGA](../../../02-Learning-Path/Stage-07-FPGA/README.md)
- [Knowledge — What Is FPGA](../../../01-Knowledge-Base/FPGA/01-What-Is-FPGA.md)
- [Knowledge — Combinational vs Sequential Logic](../../../01-Knowledge-Base/FPGA/02-Combinational-Sequential.md)
- [Knowledge — RTL / Verilog Mindset](../../../01-Knowledge-Base/FPGA/03-RTL-Verilog-Mindset.md)

> Stage 07 当前仍是 V2.1 的纵向样板阶段，FPGA Interactive Lab、Debug Case 和 Boss Project 尚未建设，因此这里不创建空链接。

## Scene

你已经会 C/C#，第一次看到：

```verilog
assign y = (a & b) | c;
```

最危险的理解是：“程序执行到这里，先算 a & b，再和 c 做 OR，然后赋值给 y。”

## Mission

不用运行任何工具，先把它画成数字电路：

```text
a ─┐
   AND ─┐
b ─┘    OR → y
c ──────┘
```

然后回答：如果 `a/b/c` 改变，这块逻辑什么时候存在？

答案不是“CPU 再执行一次”。这块组合逻辑在 FPGA 中作为电路持续存在。

## Round 2

再观察：

```verilog
always @(posedge clk)
    q <= d;
```

画出 D Flip-Flop，并说明 q 为什么只在指定 Clock Edge 更新。

## Boss

给出三个需求：LED 跟随按键、每个时钟计数一次、两个输入相加。判断哪些需要状态，哪些可以纯组合实现，并画出最小硬件框图。

## Achievement

第一次真正从“代码执行顺序”切换到“代码描述电路结构与时序”。