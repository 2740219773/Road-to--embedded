# Mission 04 — Who Wrote It：状态最后在这里坏掉，第一笔错误写入在哪？

> 学习路径：[Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md) · Watchpoint：[Debugger Watchpoint](../../../01-Knowledge-Base/Debugging/04-Debugger-Watchpoint.md) · Memory：[Stack & Memory Corruption](../../../01-Knowledge-Base/Debugging/03-Stack-and-Memory-Corruption.md)

## Mission Brief

系统运行几分钟后：

```text
system_state
```

从合法值：

```text
IDLE / RUN / ERROR
```

变成：

```text
0x7F
```

代码里没有明显的：

```c
system_state = 0x7F;
```

你可以继续全局搜索所有赋值，也可以换一个问题：

> 这个内存地址第一次什么时候被写成异常值？

这就是本关要训练的 Data-flow Debugging。

---

## Before You Start

先认识：

- Data Flow：数据从哪里来、被谁读写、最后流向哪里；
- Data Watchpoint：监视某个内存地址的访问/写入；
- Memory Corruption：某次错误写入破坏了不应该被修改的内存；
- Writer：任何能修改目标地址的执行者，不只显式变量赋值；
- Guard / Canary：放在目标区域边界附近、用来检测越界的已知模式；
- First Bad State：系统状态第一次从正确变成错误的时刻。

---

## 1. Predict — 搜索变量名为什么可能找不到根因

列出至少五种不用写：

```c
system_state = ...;
```

却仍可能修改它所在内存的方法。

提示：

```text
pointer
array overflow
memcpy
DMA
stack corruption
```

然后回答：

> 你真正应该监视的是变量名，还是地址？

---

## 2. Establish the First Bad State

不要一开始就在最终 Crash 处下断点。

先确认：

```text
Last known good value:
First observed bad value:
Approximate time/window:
Trigger conditions:
```

如果能把：

```text
“运行几分钟后偶尔坏”
```

缩小成：

```text
“每次处理长度 > 64 的数据包后 1~2 次循环内变坏”
```

调查已经前进了一大步。

---

## 3. Find the Address

用 Debugger 记录：

```text
&system_state = ?
size = ?
current value = ?
```

同时查看它周围的 Memory。

问：

```text
附近有没有 buffer？
异常值有没有重复 pattern？
是否像 0xAA / 0x00 / packet content？
```

Memory Pattern 可能给出 Writer 类型线索。

---

## 4. Build the Writer Map

不要只列函数。

建立：

```text
Target Address
├─ direct CPU writes
├─ pointer / alias writes
├─ array / memcpy writes
├─ ISR / callback
├─ DMA
└─ other platform-specific writers
```

对每个 Writer 写：

```text
Can it reach this address?
Under what condition?
What evidence would prove it?
```

---

## 5. Observe — Set a Write Watchpoint

如果怀疑 CPU Write：

```text
Set Watchpoint on target address
→ continue
→ wait for write
→ inspect halt scene
```

每次命中记录：

```text
PC:
Source line / instruction:
Call Stack:
Old value:
New value:
Pointer / index / length:
Why this write happened:
```

合法写入也要记录。

目标是找到：

```text
first write that violates expected state contract
```

而不是第一个命中就宣布根因。

---

## 6. Twist A — 相邻数组越界

故障不是：

```c
system_state = 0x7F;
```

而可能是：

```c
for (i = 0; i < received_length; i++)
{
    buffer[i] = input[i];
}
```

其中：

```text
received_length > buffer capacity
```

当越界刚好覆盖目标地址时，Watchpoint 会把你带到真正的写指令附近。

问：

> Root Cause 是“system_state 被改了”，还是“Buffer Contract 允许 Length 越界”？

---

## 7. Twist B — Watchpoint 永远不命中

现在假设：

```text
system_state still changes
CPU write watchpoint never hits
```

不要立即得出：

```text
Debugger 坏了
```

更新 Hypothesis Tree：

```text
DMA writes?
Watchpoint coverage/alignment issue?
Target is observed incorrectly?
Memory object moved/optimized?
Another bus master?
```

Stage 03 已经学过 DMA，因此检查：

```text
DMA Destination
Count
Data Width
Increment
Buffer boundary
```

---

## 8. Guard Experiment

对一个容易越界的 Buffer 增加实验性 Guard：

```text
0xDEADBEEF
BUFFER
0xCAFEBABE
```

运行原始 Trigger。

如果 Guard 变化：

```text
Boundary violation evidence = YES
```

但注意：

```text
Guard corrupted
≠ writer identity known
```

它可以与 Watchpoint/Memory Evidence 组合。

---

## 9. Break It — 故意制造三种写坏方式

### Fault A — Direct Wrong Write

显式错误赋值。

目标：Watchpoint 能否直接抓到？

### Fault B — Array Overflow

让相邻 Memory 被覆盖。

目标：为什么搜索变量名失败，但 Watchpoint 成功？

### Fault C — DMA Wrong Count

让 DMA Count 超过 Buffer Capacity。

目标：为什么 CPU Watchpoint 可能不能直接抓住 DMA Write？

---

## 10. Debug — Crash Point vs Corruption Point

假设：

```text
buffer overflow at t = 1s
program crashes at t = 8s
```

最终 Crash 的 PC 可能只是第一个真正使用损坏状态的位置。

所以写出两条时间线：

```text
First Cause Timeline
```

和：

```text
Visible Failure Timeline
```

这会为下一关 Crash Context 做准备。

---

## 11. Transfer — “Who Wrote It”不只适用于 RAM

同样方法可以迁移到：

```text
Peripheral register unexpectedly changed
configuration flag changes
queue index corrupted
GPIO output toggles unexpectedly
```

核心问题始终是：

```text
What is the first state transition that should not have happened?
Who/what can cause it?
How can I catch that transition?
```

---

## 12. Mission Report

提交：

```text
Corrupted object:
Address:
Expected state contract:
Last known good:
First bad state:
Writer map:
Watchpoint configuration:
First illegal write evidence:
PC / Call Stack:
Pointer / index / length:
Root cause:
Why variable-name search was insufficient:
Could DMA/non-CPU writer matter?:
Regression plan:
```

## Achievement Unlocked

完成后，你应该从：

```text
“最后哪个函数发现变量坏了？”
```

转向：

```text
“状态第一次在哪一笔写入后变坏？”
```

下一关：**Mission 05 — Crash Context**。