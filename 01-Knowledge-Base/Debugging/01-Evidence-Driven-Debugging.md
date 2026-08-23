# Evidence-Driven Debugging — 用证据缩小范围，而不是用修改碰运气

Stage 04 的核心不是再学更多 API，也不是背更多“常见故障原因”。

真正要建立的是：**面对一个以前没见过的问题，仍然能有顺序地把范围缩小。**

可以先记住这条主线：

```text
Symptom
→ Expected
→ Preserve / Reproduce
→ Layer Map
→ Hypothesis Tree
→ High-value Measurement
→ Evidence
→ Eliminate / Confirm
→ Root Cause
→ Minimal Fix
→ Regression
```

后面 Stage 04 的所有 Mission 都是在训练这条链上的不同环节。

---

## 1. 先分清五个经常混在一起的词

### Symptom — 现象

你真正观察到了什么。

例如：

```text
PC 收到 UART 字节，但内容与预期不一致。
```

而不是：

```text
UART 坏了。
```

后一句已经偷偷加入了结论。

### Expected — 预期

如果系统正确，应该发生什么。

例如：

```text
发送 0x55 时，TX 应出现符合 115200 8N1 的波形。
```

没有 Expected，就无法精确描述“哪里不对”。

### Fact / Evidence — 事实 / 证据

通过观察或测量得到的结果。

例如：

```text
TX bit time = 17.36 µs
```

这是测量事实。

### Hypothesis — 假设

对现象的一种可验证解释。

例如：

```text
UART 实际 Peripheral Clock 比配置假设低一半。
```

假设必须允许被证据支持或反驳。

### Root Cause — 根因

能够同时解释关键证据，并且修复后能通过回归验证的底层原因。

例如：

```text
Clock Tree 配置错误导致 UART 实际输入时钟减半。
```

“改成 57600 后能用了”不一定是根因，它可能只是绕开了原始错误。

---

## 2. Debugging 的第一步不是改代码

面对异常时，很多人会直接进入：

```text
改参数
→ Build
→ Flash
→ 看看好了没有
→ 再改一个参数
```

这叫 Trial-and-Error（试错）并不等于有效调试。

有效调查首先要增加信息：

```text
现在知道什么？
不知道什么？
哪一次测量可以最快把候选范围砍掉一大块？
```

修改只有在已经有证据支持某个假设时才最有价值。

---

## 3. Preserve — 为什么有时不能第一时间 Reset

有些故障一 Reset 就会丢失重要现场：

- Program Counter；
- Fault Status；
- Error Counter；
- Buffer 内容；
- 某个 Peripheral 当前状态；
- 最近一次事件顺序；
- Stack / Call Stack；
- 触发问题的输入条件。

所以 Crash、HardFault、偶发状态破坏等问题，第一动作经常是：

```text
Pause / Halt
→ Capture evidence
→ then reset if needed
```

但“永远不能重启”也不对。真正原则是：

> 在会破坏证据之前，先保存最有价值的现场。

---

## 4. Reproduce — 能稳定复现，调查难度会大幅下降

Reproduce（复现）指能够明确说明：

```text
在什么前置条件下
执行什么操作
大约多久/多少次后
出现什么现象
```

例如：

```text
Power on
→ start ADC DMA
→ send 64 packets
→ system_state becomes invalid
```

比：

```text
“偶尔会坏”
```

有价值得多。

### Reproduction Record

至少记录：

```text
Firmware version:
Hardware version:
Input / load:
Trigger sequence:
Expected:
Observed:
Occurrence rate:
Time to failure:
```

如果无法稳定复现，也要记录“已知能提高/降低发生概率的条件”。

---

## 5. Layer Map — 先问“故障在哪一层”，不要先问“哪一行代码”

例如一个设备通信问题：

```text
Application Data
↓
Driver / API
↓
Peripheral Register
↓
Pin / Bus
↓
Electrical Signal
↓
Remote Device
↓
Protocol / Data Meaning
```

如果真实 Pin 上根本没有波形，那么继续调查上位机解析代码通常信息价值很低。

Stage 01～03 已经反复练过这种分层；Stage 04 要把它变成主动方法。

### 常用通用层

面对陌生系统，可以先尝试：

```text
Input / Requirement
Application State
Control Flow
Data / Memory
Driver / Peripheral
Timing / Clock
Physical / Electrical
External Device
Protocol / Data Meaning
```

不要求所有问题都套同一张模板，但必须能够画出“信号/数据实际经过哪里”。

---

## 6. Hypothesis Tree — 假设不要堆成一张无序清单

假设最好按照层组织。

例如“UART 乱码”：

```text
UART Garbled
├─ Timing
│  ├─ wrong peripheral clock
│  └─ wrong baud divider
├─ Frame
│  ├─ parity mismatch
│  └─ stop-bit mismatch
├─ Physical
│  ├─ wrong voltage standard
│  └─ wiring/reference problem
└─ Data Meaning
   └─ encoding / buffer issue
```

这样下一条证据可以一次排除整个分支。

无序地列 20 个可能原因，很容易变成“每个都试一下”。

---

## 7. High-Value Measurement — 什么叫高信息量测量

不是“最贵的仪器”，而是能最大幅度缩小假设空间的证据。

例如：

```text
UART 乱码
```

测一次 TX bit time，可能同时回答：

- UART 有没有输出；
- 实际 Baud 大约是多少；
- Clock/Divider 是否整体错误；
- PC 端问题是不是最高优先级。

这比先修改十个软件参数信息量更高。

### 一个简单判断方法

在测量前问：

> 如果结果是 A，我接下来排除什么？
>
> 如果结果是 B，我接下来排除什么？

如果无论测到什么，你都不知道下一步怎么走，这个测量可能信息量不高。

---

## 8. Positive Evidence 与 Negative Evidence

### Positive Evidence

明确看到某件事发生：

```text
Breakpoint hit
Pin toggled
ACK appeared
DMA buffer changed
```

### Negative Evidence

明确证明某件应该发生的事没有发生：

```text
No clock on SCL
No ACK bit
No write to watched address
No response waveform
```

“我没看到”只有在测量方法本身足够可靠时，才是有效 Negative Evidence。

例如示波器触发条件错了导致没抓到波形，不能直接证明波形不存在。

---

## 9. Correlation 不是 Root Cause

例如：

```text
加 printf 后不崩了
```

这是一个重要 Observation，但不等于：

```text
缺少 printf 是根因
```

日志可能改变：

- Timing；
- Stack usage；
- Optimization；
- Memory layout；
- Interrupt timing。

所以任何“改了 A 后问题消失”都应该继续问：

> A 到底改变了系统的什么？

---

## 10. Change One Variable — 一次只改一个主要变量

如果你同时：

```text
改 Clock
换 Cable
改 Driver
加 Delay
```

然后问题消失，你几乎无法知道谁是真正关键因素。

实验应该尽量：

```text
Hypothesis
→ one controlled change / measurement
→ observe
→ update belief
```

这不是要求永远只能改一行代码，而是要求实验有可解释性。

---

## 11. First Bad State — 不要只盯着最后崩溃点

很多故障是延迟表现：

```text
Array writes out of bounds
↓
Memory silently corrupted
↓
program continues
↓
function later returns
↓
PC becomes invalid
↓
HardFault
```

最后的 HardFault 只是结果。

调查目标应该尽量从：

```text
Where did it finally crash?
```

前移到：

```text
When did system state first become wrong?
```

Watchpoint、Guard、Memory Pattern、DMA register snapshot 等工具都服务于这个目标。

---

## 12. Minimal Fix — 为什么不鼓励“大重构后好了”

如果修复一次改了 30 个地方：

```text
problem disappeared
```

你仍然很难证明：

- 哪一处是根因；
- 有没有隐藏副作用；
- 同类问题是否还存在。

更好的方式是：

```text
Evidence points to one cause
→ make smallest change that removes that cause
→ reproduce original condition
→ verify symptom disappears
```

之后再做架构重构，是另一项工程任务。

---

## 13. Regression — “现在正常”还不够

Regression（回归验证）至少要回答：

```text
原始现象消失了吗？
原始触发条件还在吗？
边界条件通过了吗？
相关功能有没有被破坏？
错误计数 / 波形 / 内存状态真的恢复了吗？
```

### Good Regression

例如修 UART Clock 后：

```text
measure bit time again
→ verify multiple Baud settings
→ verify long transfer
→ verify receiver data
```

而不是只看：

```text
Hello 打印出来了
```

---

## 14. 一份标准 Investigation Record

Stage 04 开始，推荐所有重要故障使用：

```text
Symptom:
Expected:
Reproduction:
Preserved evidence:
Layer map:
Hypotheses:
First high-value measurement:
Evidence:
What was eliminated:
Root cause:
Minimal fix:
Regression:
Remaining uncertainty:
```

`Remaining uncertainty` 很重要：工程调查不需要假装所有事情都已经 100% 确定。

---

## 15. 什么时候算“定位完成”

至少能够形成闭环：

```text
Root Cause
↓ explains
Observed Evidence
↓ predicts
Failure Behavior
↓ removed by
Minimal Fix
↓ verified by
Regression
```

如果只是“改了某个参数，暂时没再出现”，调查还没有真正闭环。

---

## Stage 04 最终目标

你应该逐渐从：

```text
我以前遇到过这个问题，所以我知道答案
```

升级到：

```text
我没遇到过这个问题，
但我知道怎样把系统分层、提出可验证假设、
选择高信息量证据并逐步逼近根因。
```

这才是可以迁移到新芯片、新设备和新项目的 Debugging 能力。