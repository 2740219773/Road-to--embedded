# RTL / Verilog Mindset — 不要把 Verilog 当成 C 语言写

## RTL 是什么

RTL（Register Transfer Level，寄存器传输级）是一种描述数字系统的方法：数据存在哪里，在 Clock 到来时怎样从一组 Register 变到另一组 Register，中间经过什么组合逻辑。

```text
Register A
   ↓
Combinational Logic
   ↓
Register B
```

## 为什么 Verilog 看起来像程序却不是普通程序

例如：

```verilog
assign led = button;
```

这不是“执行一次把 button 赋给 led”。它描述的是一条持续存在的硬件连接关系。

而时钟逻辑：

```verilog
always @(posedge clk)
    q <= d;
```

表达的是每个有效时钟上升沿，由寄存器把 D 的状态采样到 Q。

## 软件思维最常见的迁移错误

- 把 HDL 行号理解成 CPU 的执行顺序；
- 忽略多个硬件模块天然并行；
- 用大量软件式循环思考硬件资源；
- 不考虑 Clock、Reset 和 Timing；
- 仿真能跑就认为真实 FPGA 一定能工作。

## 正确的第一步

每写一小段 RTL，都问自己：

> 如果这段代码真的变成电路，我能不能把它画出来？

如果完全画不出数据路径、Register 和组合逻辑，通常说明还在用软件思维理解 HDL。

## 后续路线

组合逻辑 → Register → Counter → PWM → FSM → UART → FIFO → CDC → Timing Constraint。

先把硬件思维建立起来，再追求复杂语法。
