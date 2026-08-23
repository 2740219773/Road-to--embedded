# Oscilloscope & Logic Analyzer — 先决定要证明什么，再决定拿什么仪器

Stage 04 不把示波器和逻辑分析仪当成“高级工具清单”。

真正的问题是：

> 当前 Hypothesis 需要什么证据？
>
> 哪个 Measurement Point 最能区分候选原因？
>
> 哪个工具能可靠地看到这个量？

所以顺序应该是：

```text
Question
→ Measurement Point
→ Quantity / Event
→ Tool
→ Trigger / Time Scale
→ Evidence
```

而不是：

```text
我有示波器
→ 随便找个点测一下
```

---

## 1. Debugger、Multimeter、Logic Analyzer、Oscilloscope 各回答什么

### Debugger

更擅长回答软件与数字硬件内部状态：

```text
CPU 在哪里？
变量是什么值？
寄存器有没有配置？
Call Stack 是什么？
Buffer 有没有变化？
```

但：

```text
GPIO Output Register = 1
```

不能直接证明：

```text
Physical Pin = valid HIGH voltage
```

### Multimeter

更擅长稳定或缓慢变化的电气量：

```text
Supply voltage
DC pin voltage
Resistance / continuity（在适当断电条件下）
```

它不适合证明一个 115200 Baud UART bit 的真实时间。

### Logic Analyzer

更擅长：

```text
digital 0/1 sequence
multiple digital channels
long capture
protocol decode
relative event order
```

常用于 UART / I²C / SPI 等数字总线。

### Oscilloscope

更擅长：

```text
real voltage
rise/fall time
overshoot / ringing
noise
jitter
analog/reference quality
timing boundary
```

它能回答“这个所谓 High/Low 真的像一个可靠数字信号吗？”

---

## 2. “发了什么”与“信号质量怎样”是两个不同问题

例如 SPI 读错数据。

Logic Analyzer 可以快速回答：

```text
CS 什么时候有效？
Clock 有多少个？
Decoder 认为收到什么字节？
```

Oscilloscope 可以进一步回答：

```text
高频时边沿是否太慢？
是否有明显 Ringing？
实际电平是否达到门限？
Data 在采样边沿附近是否稳定？
```

所以：

```text
Protocol Evidence
+
Electrical Evidence
```

经常需要组合，而不是争论“到底哪个仪器更好”。

---

## 3. Measurement Point 比 Tool 更重要

假设 PC 收不到 UART Frame。

你可以测：

```text
A. MCU TX pin
B. USB-UART adapter input
C. PC application log
```

同一台 Logic Analyzer，测在不同 Boundary 上，能排除的范围完全不同。

### Boundary Thinking

```text
MCU UART
→ TX Pin
→ Cable / Adapter
→ USB Driver
→ PC App
```

如果 MCU TX Pin 已经有完整正确 Frame，但 Adapter 后没有：

```text
MCU application / UART generation
```

就不再是最高优先级。

---

## 4. Trigger — 为什么“看不到”不一定说明“没有”

Oscilloscope/Logic Analyzer 都需要正确 Capture 条件。

如果：

```text
Time Scale wrong
Trigger level wrong
Trigger source wrong
Capture window too short
Probe point wrong
```

你可能得到：

```text
No waveform observed
```

但真正含义只是：

```text
measurement did not capture it
```

因此 Negative Evidence 必须先证明测量方法本身可靠。

---

## 5. Time Scale — 你要观察的是 10 ns 还是 10 s？

不同问题需要完全不同时间尺度。

```text
UART bit          → µs scale
PWM period        → µs/ms scale
Button bounce     → µs/ms scale
Boot sequence     → ms/s scale
random reset      → seconds/minutes
power droop       → event-dependent
```

如果时间窗口选择错误，再好的仪器也只会产生无关截图。

---

## 6. Protocol Decoder 是助手，不是物理事实本身

Logic Analyzer Decoder 显示：

```text
SPI = 0xA5
```

它依赖你告诉软件：

```text
CPOL
CPHA
bit order
sampling interpretation
```

如果配置错，Decoder 可以非常自信地给出错误结果。

所以遇到关键问题时，要能回到：

```text
raw SCLK / MOSI / MISO / CS
```

直接解释边沿关系。

同理，UART Decoder 配错 Baud 时，乱码不等于真实线路就是乱码。

---

## 7. Oscilloscope Measurement Safety

真实工程里，示波器探头地通常与仪器保护地/大地存在关系，具体取决于仪器类型。

因此不能把普通接地示波器的 Ground Clip 随意接到任意：

```text
high-side node
floating power stage
mains-referenced circuit
differential bus conductor
```

本项目只在安全低压实验平台上进行基础测量。

遇到不确定参考关系的系统，应先确认：

- 仪器输入结构；
- DUT Ground / Protective Earth 关系；
- 是否需要差分探头或隔离测量方案；
- 当前测量是否会短路原电路。

“得到波形”从来不值得拿设备和人身安全冒险。

---

## 8. 高信息量测量的例子

### UART Garbled

Question：真实 Baud 对吗？

```text
Point: MCU TX Pin
Quantity: bit time
Tool: Oscilloscope / Logic Analyzer raw timing
```

### I²C No ACK

Question：总线是否先具备合法 High/Low？

```text
Point: SDA / SCL
Quantity: idle voltage + START/address/ACK
Tool: Multimeter/Oscilloscope + Logic Analyzer
```

### ADC Scale Drift

Question：输入变了还是参考变了？

```text
Point: Vin + Vref
Quantity: real voltage
Tool: Multimeter / Oscilloscope
```

### Memory Corruption

Question：谁第一次写坏这个地址？

```text
Point: memory address
Quantity: CPU write event
Tool: Debugger Watchpoint
```

这里根本不需要先拿示波器。

---

## 9. Tool Selection Matrix

可以用下面问题快速选择：

```text
Need CPU control-flow evidence?
→ Debugger / Breakpoint / Call Stack

Need “who wrote this address?”
→ Watchpoint / Memory evidence

Need stable DC electrical evidence?
→ Multimeter

Need raw voltage/timing/signal quality?
→ Oscilloscope

Need long digital sequence/protocol relation?
→ Logic Analyzer

Need expected timing/meaning?
→ Datasheet / Protocol Spec
```

通常最终会组合多个工具，但第一条证据应该优先选择信息量最高的那个。

---

## 10. Before Measuring, Write This

Stage 04 推荐在连接仪器前先写：

```text
Hypothesis:
Question:
Measurement point:
Expected result if hypothesis is true:
Expected result if false:
Tool:
Trigger / time scale:
```

如果这几项写不出来，先不要急着采集波形。

---

## 11. Stage 04 的真正目标

从：

```text
“这个问题一般用示波器。”
```

升级为：

```text
“我要在这个 Boundary 验证真实 bit time；
如果正确就排除发送端 Timing 分支，
如果错误就继续追 Clock/Divider，
所以这里用示波器/逻辑分析仪最有信息价值。”
```

工具只是证据获取方式，调查逻辑才是核心。