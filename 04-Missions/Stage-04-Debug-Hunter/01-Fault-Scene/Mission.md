# Mission 01 — Fault Scene：先别改，先把现场变成证据

> 学习路径：[Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md) · 方法：[Evidence-Driven Debugging](../../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)

## Mission Brief

设备运行十几分钟后偶尔停止正常工作。

现场的人已经形成习惯：

```text
异常
→ Reset
→ 再跑
→ 如果暂时正常，就继续测试
```

这样确实能让设备“恢复”，但每次 Reset 都把最有价值的信息一起清掉。

这一关的目标不是马上找到根因，而是学会两件更基础的事：

```text
Preserve the scene
+
Make the failure reproducible
```

---

## Before You Start

第一次先认识：

- Fault Scene：故障发生时系统留下的现场状态；
- Reproduction：能描述什么条件、什么步骤会触发问题；
- Snapshot：某一时刻保存下来的状态快照；
- Repro Rate：重复实验时问题出现的比例；
- Trigger：导致故障出现的输入、事件或条件；
- Heisenbug：观察/加日志后行为发生变化的一类难调问题。这里只需要知道“观察本身可能改变 Timing/Memory 等条件”。

先读：[Evidence-Driven Debugging](../../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)

---

## 1. Predict — Reset 会让你失去什么？

面对下面三个现场，分别写出 Reset 前最应该保存的证据。

### Scene A — HardFault

```text
CPU entered HardFault_Handler
```

### Scene B — UART 偶发停止发送

```text
program still running
TX line no longer changes
```

### Scene C — system_state 变成非法值

```text
expected: IDLE / RUN / ERROR
observed: 0x7F
```

不要只写“看变量”，要具体：

```text
PC / Call Stack / Fault Status / Peripheral Status / Buffer / Error Counter / Pin waveform ...
```

---

## 2. Preserve — 先保存会消失的现场

建立自己的“故障发生后第一分钟清单”。

一个通用模板：

```text
1. 不做会清除现场的操作
2. 记录精确 Symptom
3. 记录时间 / 输入 / 运行阶段
4. Pause / Halt（如果不会进一步破坏问题）
5. 保存关键变量 / registers / buffers
6. 保存 error/status counters
7. 保存 Call Stack / PC（如果适用）
8. 保存外部波形 / bus capture（如果适用）
9. 记录 Firmware / Hardware version
10. 再决定是否 Reset
```

不是每次都需要全部十项。关键是先判断：

> 哪些证据 Reset 后就再也拿不到？

---

## 3. Observe — 同一个“设备死了”可能有完全不同现场

模拟或真机观察下面几种状态：

```text
A. CPU halted in fault handler
B. CPU running but stuck in ISR
C. CPU running in main loop but peripheral stopped
D. CPU running normally, external device no response
```

它们都可能被用户描述成：

> “设备卡死了。”

但 Debugger、Peripheral State、Pin/Bus 波形会完全不同。

所以第一条规则：

```text
User description
≠ precise technical symptom
```

---

## 4. Build a Reproduction Record

选择一个你能重复制造的小故障，例如：

- UART 使用错误 Clock / Baud；
- I²C 断开 Pull-up；
- GPIO 写错 Pin；
- 数组在特定长度下越界；
- 某个输入序列触发异常状态。

不要立刻修。

先记录：

```text
Firmware version:
Hardware / board:
Power-on state:
Input / load:
Steps:
Expected:
Observed:
Time to failure:
Repro count:
Attempts:
Repro rate:
```

例如：

```text
8 / 10 attempts fail
```

比：

```text
“经常失败”
```

更有价值。

---

## 5. Change One Condition — 什么条件真正影响发生概率？

一次只改变一个主要条件，例如：

```text
Packet length
Baud rate
Input frequency
Optimization level
Logging enabled/disabled
Power-cycle vs soft reset
```

每次记录 Repro Rate。

你不是在“乱试”，而是在回答：

> 哪个条件和故障出现有稳定关联？

注意：关联仍然不是 Root Cause，但它能帮助缩小调查范围。

---

## 6. Heisenbug — 为什么加日志后问题不见了？

假设：

```text
without printf → failure 7/10
with printf    → failure 0/10
```

不要得出：

```text
“缺少 printf 是根因”
```

列出至少三种 `printf` 可能改变的系统条件：

```text
Timing
Stack usage
Memory layout
Interrupt timing
Optimization / code layout
```

这类“观察改变现象”的证据仍然有价值，但需要继续解释它改变了什么。

---

## 7. Break It — 故意破坏你的调查质量

分别做一次错误调查方式，然后比较信息损失。

### Anti-pattern A — First Action Reset

故障一出现马上 Reset。

记录：哪些现场永远丢了？

### Anti-pattern B — Simultaneous Changes

一次同时改两个或三个主要变量。

即使问题消失，问自己：

> 我现在能证明是哪一个改变起作用吗？

### Anti-pattern C — Vague Symptom

只写：

```text
“程序不正常”
```

然后尝试让另一位学习者设计下一步调查。

观察为什么信息不足。

---

## 8. Debug — 建立“先保存什么”的优先级

对下面场景写第一分钟行动：

```text
HardFault
Random state corruption
No UART output
I²C timeout
DMA buffer changed unexpectedly
CAN error counter increasing
```

要求每个场景回答：

```text
What evidence can disappear?
What should be captured first?
What action is safe before reset?
```

这一步不是再教 UART/I²C/CAN，而是在训练“现场价值判断”。

---

## 9. Transfer — 从“恢复设备”转向“保留解释能力”

工程现场有时确实需要自动恢复，例如 Watchdog Reset。

但恢复机制和根因调查是两个目标：

```text
Recovery
让系统继续服务
```

```text
Diagnosis
解释系统为什么失败
```

成熟系统应该尽量在恢复前保留必要 fault record / reset reason / error counter 等证据。

Stage 04 暂不展开 Watchdog 课程，只建立这个系统思维。

---

## 10. Mission Report

提交：

```text
Original vague symptom:
Precise symptom:
Expected behavior:
What evidence would disappear after reset:
Preservation checklist:
Reproduction steps:
Attempts / failures:
Repro rate:
One condition changed:
How occurrence changed:
What this evidence supports:
What it does NOT prove:
```

## Achievement Unlocked

完成后，遇到未知问题的第一反应应该从：

```text
“先让它恢复”
```

变成：

```text
“先保存哪些会消失的证据？
怎样把它变成一个可重复调查的问题？”
```

下一关：**Mission 02 — Layer & Hypothesis Tree**。