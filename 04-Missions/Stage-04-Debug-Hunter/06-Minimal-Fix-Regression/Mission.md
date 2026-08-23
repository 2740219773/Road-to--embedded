# Mission 06 — Minimal Fix & Regression：问题消失了，怎么证明你真的修对了？

> 学习路径：[Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md) · 方法：[Evidence-Driven Debugging](../../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)

## Mission Brief

你终于找到一个修改方案：

```text
改了几个参数
加了一个 delay
顺手重构了一段代码
换了一根线
```

然后问题不再出现。

最诱人的结论是：

> “修好了。”

Stage 04 最后一关要训练：

```text
problem disappeared
≠ root cause proven
```

真正闭环需要：

```text
Evidence
→ Root Cause
→ Minimal Fix
→ Original Trigger
→ Regression
→ Boundary / Related Checks
```

---

## Before You Start

第一次认识：

- Minimal Fix：只修改足以消除已证明根因的最小范围；
- Regression：修复后重新验证原始故障及相关行为；
- Boundary Condition：系统参数接近范围边界时的条件；
- Negative Test：故意使用无效/异常输入，确认系统仍按预期处理；
- Control Experiment：用对照条件证明“改变哪个因素才会改变结果”；
- Workaround：绕开症状但未消除底层原因的方法；
- Root-cause Fix：真正消除导致故障条件的修复。

---

## 1. Workaround 还是 Root-Cause Fix？

### Example A — UART

原问题：真实 UART Baud 只有目标的一半。

做法 1：

```text
PC 端也改成一半 Baud
```

现象消失。

这更像：

```text
Workaround
```

因为 MCU Clock 假设仍然错误。

做法 2：

```text
修正 Clock Tree / Divider
→ 实测 bit time 恢复目标值
```

这才更接近 Root-cause Fix。

---

## 2. 为什么 Minimal Fix 更容易证明

假设一次修改包含：

```text
Clock change
Buffer resize
Driver rewrite
Delay added
Logging changed
```

问题消失后，你不知道：

```text
Which change mattered?
Which change is unnecessary?
Which change introduced side effects?
```

如果证据已经指出：

```text
DMA Count = 128
Buffer Capacity = 64
```

最直接的验证修改应先围绕 Count/Buffer Contract，而不是重写整个 DMA Driver。

---

## 3. Re-run the Original Trigger

修复后必须保留原始触发条件。

如果原问题是：

```text
packet length = 80
→ memory corruption
```

修复后只测试：

```text
packet length = 16
```

没有证明任何关键事情。

必须重新执行：

```text
same firmware context
same input/load
same failure trigger
```

再比较证据。

---

## 4. Evidence Before vs After

不要只记录：

```text
Before: FAIL
After: PASS
```

要尽量比较同一个物理/软件量：

### UART

```text
Before bit time: 17.36 µs
After bit time:   8.68 µs
```

### ADC

```text
Before Vref ripple / code spread
After  Vref ripple / code spread
```

### DMA

```text
Before guard overwritten
After  guard unchanged under same transfer
```

### CAN

```text
Before ACK absent / error counter rises
After  ACK present / error counter stable
```

这叫 Evidence Closure。

---

## 5. Boundary Regression

只测试“正常值”容易漏掉相邻错误。

例如 Buffer 修复后测试：

```text
length = 0
length = 1
length = capacity - 1
length = capacity
length = capacity + 1
```

系统应该：

- 合法范围正确工作；
- 超范围被拒绝/限制，而不是静默写坏内存。

类似地：

```text
I²C quantity / address boundaries
Modbus quantity boundaries
ADC input near rails
Timer min/max period
```

都可以建立 Boundary Regression。

---

## 6. Related Regression — 修 A 会不会破坏 B

修复往往改变共享资源：

```text
Clock
Interrupt timing
Memory layout
DMA channel
Pin mux
Buffer ownership
```

所以修 UART Clock 后，还要考虑：

```text
Timer frequency changed?
PWM changed?
Other peripherals using same clock changed?
```

Regression 不等于“把整个产品所有功能全测一遍”，而是根据变更影响范围选择相关验证。

---

## 7. Re-introduce the Fault — 一个很强的根因实验

在安全、可控的实验环境里，如果可能：

```text
Apply fix → failure disappears
Re-introduce original faulty condition → failure returns
Apply fix again → failure disappears
```

这种 A/B 对照会显著增强因果证据。

例如：

```text
correct DMA count → guards stable
wrong DMA count   → guards overwritten
correct count     → stable again
```

比“改完跑了一次正常”强得多。

---

## 8. Break It — 三种“假修复”

### False Fix A — Add Delay

加入 delay 后 I²C/SPI/RS-485 问题消失。

问：

```text
delay changed what timing?
which requirement was previously violated?
can we measure it?
```

不要把“需要 delay”直接当最终解释。

### False Fix B — Increase Stack Forever

Stack 从 512 改成 4096 后不崩。

这是重要证据，但还应调查：

```text
actual usage
large local buffers
call depth
unexpected recursion
```

避免无限放大资源掩盖设计问题。

### False Fix C — Clear All State / Reset More Often

频繁 Reset 可以隐藏内存泄漏、状态机错误或累计计数问题，却没有消除根因。

Recovery ≠ Diagnosis。

---

## 9. Regression Matrix

为一个修复建立小型矩阵：

| Test | Condition | Expected | Evidence |
|---|---|---|---|
| Original trigger | same as failure | no failure | key measurement |
| Normal case | common load | pass | output/state |
| Boundary | edge input | controlled behavior | guard/error |
| Related feature | shared resource | unchanged | waveform/state |
| Long run | repeated load | stable | counter/log |

不需要大量测试项；重点是每项都能解释“为什么要测”。

---

## 10. Root Cause Statement

一个好的 Root Cause Statement 应该包含：

```text
Condition
+ mechanism
+ resulting failure
```

例如：

```text
DMA transfer count was configured as 128 half-words while the destination buffer held only 64; DMA therefore wrote beyond the buffer and corrupted adjacent state, which later caused the crash.
```

而不是：

```text
DMA bug
```

或者：

```text
buffer issue
```

---

## 11. Fix Statement

同样需要明确：

```text
Changed what?
Why does this remove the mechanism?
What evidence proves it?
```

例如：

```text
Transfer count is now derived from destination capacity and checked before start; the original 128-sample test no longer overwrites guards, and invalid counts are rejected.
```

---

## 12. Remaining Uncertainty

工程调查允许写：

```text
Root cause strongly supported
but long-term environmental margin not yet tested
```

比假装：

```text
100% solved forever
```

更可靠。

最终报告应明确哪些已经证明，哪些仍需长期验证。

---

## 13. Mission Report

选择一个 Stage 01～03 或 Stage 04 Case，完成完整闭环：

```text
Original symptom:
Original trigger:
Evidence before fix:
Root cause statement:
Minimal fix:
Why this fix targets the mechanism:
Evidence after fix:
Re-introduced fault result (if safe):
Boundary regression:
Related regression:
Long-run check:
Remaining uncertainty:
```

## Achievement Unlocked

完成后，调试不再结束于：

```text
“现在能跑了。”
```

而结束于：

```text
“这条证据证明这个机制导致原始故障；
最小修复消除了这个机制；
同一触发条件、边界和相关功能已经回归通过。”
```

接下来进入 Stage 04 Mixed Unknown-Failure Challenge 和 Broken Firmware Investigation Boss。