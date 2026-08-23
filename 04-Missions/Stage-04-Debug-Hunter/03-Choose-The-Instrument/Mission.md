# Mission 03 — Choose the Measurement：不是“拿什么工具”，而是“先证明什么”

> 学习路径：[Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md) · 方法：[Evidence-Driven Debugging](../../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md) · 仪器知识：[Oscilloscope & Logic Analyzer](../../../01-Knowledge-Base/Debugging/05-Oscilloscope-Logic-Analyzer.md)

## Mission Brief

上一关你已经能画 Layer Map 和 Hypothesis Tree。

现在真正困难的问题是：

> 下一步到底测什么？

新手很容易按工具思考：

```text
“我有 Debugger，就先看变量。”
“我有逻辑分析仪，就先抓总线。”
“有示波器就都测一下。”
```

这一关改成按证据思考：

```text
Hypothesis
→ Question
→ Boundary / Measurement Point
→ Quantity / Event
→ Tool
→ Result A / Result B
```

---

## Before You Start

先认识几个词：

- Measurement Point：你实际观察系统的哪个位置；
- Observable：能够被工具看到的状态或信号；
- Trigger：告诉仪器“什么时候开始/保存这次事件”；
- Time Scale：要观察纳秒、微秒、毫秒还是几分钟；
- High-Value Measurement：一次结果能明显缩小候选范围的测量；
- Intrusive Measurement：观察本身可能改变 Timing/Load/Memory 等系统行为的测量。

---

## 1. Don’t Pick a Tool Yet

场景：

```text
PC 偶尔少收到一帧 UART 数据
```

候选工具：

```text
Debugger
printf log
Logic Analyzer
Oscilloscope
PC serial log
```

在选工具前先写：

```text
Question:
“丢失的那一帧有没有真正离开 MCU TX Pin？”
```

有了问题以后，Measurement Point 就自然出现：

```text
MCU TX Pin
```

然后才决定使用合适的数字捕获/示波器。

---

## 2. Result A / Result B

一条测量只有在结果能改变调查方向时才真正有价值。

继续上面的 UART 场景。

### Result A

```text
丢失的 Frame 在 MCU TX Pin 上根本不存在
```

范围移动到：

```text
Application / Buffer / Driver / Peripheral
```

### Result B

```text
TX Pin 上 Frame 完整存在
```

范围移动到：

```text
Physical Link / Adapter / Receiver / PC App
```

所以测量前必须写：

```text
If A → investigate ...
If B → investigate ...
```

---

## 3. Scene A — UART Baud Suspicious

现象：

```text
PC terminal garbled
```

Hypothesis：真实 Baud 与配置不一致。

填写：

```text
Question:
Measurement point:
Quantity:
Tool:
Expected if hypothesis true:
Expected if false:
```

推荐目标不是“看看 UART”，而是：

```text
measure real TX bit time
```

---

## 4. Scene B — I²C Decoder 一直报错

已知：

```text
Logic Analyzer decoder shows malformed frames
SDA rise looks suspicious
```

先区分两个问题：

```text
Protocol sequence wrong?
```

还是：

```text
Electrical HIGH transition not reliable?
```

可能需要：

```text
Logic Analyzer → event/order evidence
Oscilloscope   → real rise-time/voltage evidence
```

不是二选一，而是根据当前 Hypothesis 分阶段使用。

---

## 5. Scene C — `system_state` 偶发变成 0x7F

候选：

```text
Oscilloscope
Logic Analyzer
Debugger Breakpoint
Data Watchpoint
printf
```

Question 应该是：

> CPU 在哪一条写操作第一次改变了这个地址？

这时最有信息量的工具可能是 Watchpoint，而不是外部仪器。

如果 Watchpoint 一直不命中但 Memory 仍变化，反而产生新的重要证据：

```text
maybe DMA / non-CPU writer / observation issue
```

---

## 6. Scene D — SPI 只在高速时偶发错误

先建立两个主要分支：

```text
Protocol configuration wrong
vs
Signal integrity / timing margin problem
```

### Measurement 1

Raw digital edge relationship：

```text
CS / SCLK / MOSI / MISO
```

### Measurement 2

真实电气波形：

```text
rise/fall time
ringing
level margin
setup/hold neighborhood
```

要求说明为什么只看 Decoder 可能不足。

---

## 7. Scene E — ADC Code 整体漂移

现象：

```text
Raw code changes by ~4%
```

假设树：

```text
Vin changed
Vref changed
software conversion changed
ADC sampling behavior changed
```

第一条测量应该尽量区分这些分支。

例如直接测：

```text
Vin + Vref
```

通常比先增加数字滤波更有信息量。

---

## 8. Scene F — HardFault

这里最有价值的“工具”不一定是外部仪器。

Question：

```text
CPU 最后在哪里执行？
异常状态留下了什么地址/状态证据？
```

Measurement/Observation：

```text
Stacked PC
LR
xPSR
Fault Status
Fault Address
Call Stack
```

Stage 04 后续 Mission 会专门训练。

---

## 9. Trigger Matters — 没抓到不等于没发生

场景：问题每 30 秒偶发一次，但示波器窗口只有几毫秒。

如果每次手动点 Single 都没看到异常：

```text
No captured failure
```

不能直接得出：

```text
No electrical failure exists
```

你还需要设计 Trigger：

- Error flag pin；
- protocol condition；
- edge / pulse width；
- external event；
- test pin linked to software state。

Measurement design 本身就是调试能力的一部分。

---

## 10. Observability — 系统没有测量点怎么办

真实产品常常没有天然暴露所有内部事件。

可以临时或长期设计：

```text
Test Pin
Error Counter
Sequence Number
Timestamp
Event Buffer
Reset Reason
```

但新增观察点时要问：

> 它会不会改变 Timing / Stack / CPU Load，进而改变原故障？

Stage 04 不是禁止加日志，而是要求知道日志也是一次实验变量。

---

## 11. Break It — 三种低信息量调查

### Anti-pattern A — Measurement without a question

```text
“先把所有寄存器截个图。”
```

如果不知道哪些字段和哪条 Hypothesis 有关，很容易得到大量噪声。

### Anti-pattern B — Tool prestige

```text
“逻辑分析仪不够高级，直接上示波器。”
```

如果问题是“哪个 task 写了变量”，示波器并不会自动更有价值。

### Anti-pattern C — Result cannot change next step

如果：

```text
无论测到 A/B，你下一步都是“再改代码看看”
```

说明 Measurement 设计还不够明确。

---

## 12. Measurement Card

以后重要测量先写：

```text
Symptom:
Current hypothesis:
Question:
Boundary / point:
Quantity / event:
Tool:
Trigger / time scale:
If result A:
If result B:
Intrusiveness / risk:
```

这张卡比“仪器截图”本身更重要，因为它解释了为什么测。

---

## 13. Mission Report

从 Stage 01～03 任意选择三个不同类型故障：

```text
one software/data problem
one digital bus problem
one electrical/timing problem
```

为每个写：

```text
Layer map:
Hypothesis:
First measurement:
Measurement point:
Tool:
Expected A/B:
Actual evidence:
What was eliminated:
Next step:
```

## Achievement Unlocked

完成后，你不再从：

```text
“这次该拿什么工具？”
```

开始，而会从：

```text
“我下一步最需要证明什么？在哪个 Boundary 测最有信息量？”
```

开始。

下一关：**Mission 04 — Who Wrote It**。