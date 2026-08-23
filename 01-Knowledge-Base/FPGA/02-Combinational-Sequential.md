# Combinational vs Sequential Logic — FPGA 学习的第一道分水岭

## Combinational Logic：现在的输入决定现在的输出

最简单例子是 AND：

```text
A ─┐
   AND → Y
B ─┘

Y = A AND B
```

只考虑理想逻辑模型时，输出由当前输入组合决定，不需要“记住上一次是什么”。这类逻辑叫 Combinational Logic（组合逻辑）。

加法器、选择器、编码器等都可以由组合逻辑构成。

## Sequential Logic：系统开始拥有记忆

如果系统需要记住上一拍的数据，就需要状态存储。最常见基础单元之一是 Flip-Flop（触发器）。

```text
D → [ Flip-Flop ] → Q
         ↑
       Clock
```

在指定 Clock Edge 到来时，D 的值被保存到 Q。这样系统就有了“上一拍”和“下一拍”的概念。

## 为什么 Clock 如此重要

Clock 可以先理解成整个同步数字系统共同使用的节拍器。很多寄存器在同一个有效边沿更新状态。

这与 MCU 中“CPU 顺序执行语句”的时间模型不同。

## 第一次 FPGA 学习最容易犯的错误

看到 Verilog：

```verilog
assign y = a & b;
```

就把它理解成“CPU 执行到这一句时算一次”。

更准确的直觉是：综合后存在一块 AND 逻辑，只要输入变化，逻辑关系就一直存在。

## 学习目标

在开始写状态机、UART、PWM 等 RTL 前，看到需求时先问：这是纯组合关系，还是需要跨 Clock 保存状态？