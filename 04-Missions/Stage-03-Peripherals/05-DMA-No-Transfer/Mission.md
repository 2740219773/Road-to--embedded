# Mission 05 — DMA No Transfer：初始化成功，为什么 Buffer 一个字节都没变？

## Beginner Guide

- 适合：已完成 ADC Jitter 的学习者；
- 前置：Peripheral Request、地址、长度、Buffer、Completion；
- 预计：75 分钟；
- 本关产出：DMA Request、Transfer Contract、Memory 和 Completion 证据；
- 上一关：ADC Jitter；当前关：DMA No Transfer；下一关：CAN Arbitration。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录 Request、Direction、Count、Buffer Capacity 和越界/无传输原因。

## If You Are Stuck

先确认外设是否产生 Request，再检查地址、长度、Buffer 边界和完成标志。

## Ready to Continue

能够区分 DMA Complete、实际搬运和 Memory Safety 后，再进入 CAN Arbitration。

> 学习路径：[Stage 03 — Peripheral Engineer](../../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md) · 知识支撑：[DMA](../../../01-Knowledge-Base/MCU/04-DMA.md) · 互动实验：[DMA Transfer Simulator](../../../03-Interactive-Labs/DMA-Transfer-Simulator/README.md)

## Mission Brief

UART RX 已经能收到数据。

DMA 初始化也返回成功。

你期待：

```text
UART RX Data Register
→ DMA
→ rx_buffer[]
```

但 Debugger 里 `rx_buffer` 一直不变。

很多人的第一反应是：

> “DMA 回调是不是没进？”

这关要先把“数据搬运”和“完成通知”分开：

```text
Peripheral Event
→ DMA Request
→ Mapping
→ Direction
→ Source / Destination
→ Count / Width / Increment
→ Enable
→ Memory Result
→ Complete / Error Event
```

如果 Memory 根本没变化，先调查前面的搬运链，而不是从 Callback 开始。

---

## Before You Start

第一次看到这些词先建立最小概念：

- DMA：Direct Memory Access，硬件数据搬运器；
- Request：Peripheral 告诉 DMA“现在有一次搬运机会”；
- Source / Destination：数据从哪儿搬到哪儿；
- Transfer Count：搬多少个数据单位；
- Data Width：每个单位是 8/16/32 bit 等多宽；
- Increment：一次搬完后地址是否自动前进；
- Completion Event：搬完后通知 CPU 的事件/中断。

先读：[DMA Knowledge](../../../01-Knowledge-Base/MCU/04-DMA.md)

---

## 1. Predict — DMA Enable 了，为什么仍可能不动

假设：

```text
DMA enabled = Yes
Destination = rx_buffer
Count = 16
```

回答：

1. 如果 UART 根本没有收到一个 Byte，DMA 会凭空开始搬吗？
2. 如果 Request Mapping 指向了另一个 Peripheral，Buffer 会怎样？
3. 如果 Direction 写成 Memory → Peripheral，当前 UART RX 任务会发生什么？
4. 如果 DMA 正常搬完，但 Completion Interrupt 没开，Buffer 会不会仍然变化？

---

## 2. Visualize — 把“没搬”和“搬坏了”分开

打开：[DMA Transfer Simulator](../../../03-Interactive-Labs/DMA-Transfer-Simulator/README.md)

### A — Normal Transfer

```text
DMA block transfer
Request valid
DMA enabled
Peripheral → Memory
Count = 12
Capacity = 12
```

### B — No Request

只关闭 Request。

观察 Memory 是否变化。

### C — Wrong Direction

恢复 Request，只把 Direction 改错。

### D — Count = 0

观察“初始化正常”但没有任何搬运目标时的结果。

### E — Overflow

```text
Count = 16
Capacity = 8
```

观察：DMA 可以 Complete，同时已经写坏 Buffer 后面的内存。

---

## 3. Observe — 先证明 Peripheral 真的在产生事件

以 UART RX 为例：

在开启 DMA 前，先证明：

```text
RX Pin has valid waveform
→ UART receives byte
→ RX data/status indicates data available
```

如果 UART 自己都没收到数据，DMA 不工作只是后果。

对于 ADC 同理：

```text
ADC conversion really runs
→ new sample appears
→ DMA request can occur
```

---

## 4. Inspect the Transfer Contract

把 DMA 配置写成一张表，不要只看初始化 API：

```text
Trigger / Request source:
Request mapping / channel / stream:
Direction:
Source address:
Destination address:
Transfer count:
Source width:
Destination width:
Source increment:
Destination increment:
Mode: Normal / Circular
Enabled:
```

然后逐项问：它是否符合当前任务？

### UART RX 常见直觉

```text
Source = UART RX data register
Source increment = No
Destination = rx_buffer
Destination increment = Yes
Direction = Peripheral → Memory
```

具体寄存器和命名因 MCU 而异，但模型一致。

---

## 5. Memory Evidence — 不要只等 Callback

在 Debugger Memory View 里直接观察目标 Buffer。

开始传输前：

```text
rx_buffer = known pattern
```

例如先填：

```text
0xCC 0xCC 0xCC ...
```

传输后检查：

```text
哪些位置变了？
变了几个？
是否按顺序写入？
Buffer 后面的对象有没有被改？
```

这比“回调进没进”提供的信息更多。

---

## 6. Break It — 主动制造六类 DMA 故障

一次只改变一个条件。

### Fault A — Request Mapping Wrong

Peripheral 正常产生数据，但 DMA 收不到对应 Request。

### Fault B — Direction Wrong

检查 Source/Destination 语义。

### Fault C — Transfer Count = 0 / Too Small

比较 Buffer 变化数量。

### Fault D — Transfer Count Too Large

让 Count > Buffer Capacity。

观察 DMA 可以 Complete，但 Memory 已越界。

### Fault E — Destination Increment Off

观察是否一直覆盖同一个 Buffer 元素。

### Fault F — Completion Interrupt Off

观察：Memory 可以正确变化，但 Callback 不执行。

这一步必须能解释：

```text
DMA transfer
≠ DMA interrupt
```

---

## 7. Debug — Buffer 不变时的优先顺序

```text
1. Peripheral itself has data/event?
2. DMA request generated?
3. Request mapping correct?
4. Direction correct?
5. Source address correct?
6. Destination address correct?
7. Count > 0?
8. Width / increment correct?
9. DMA enabled?
10. Memory actually changed?
11. Completion/error event configured?
```

如果第 10 步显示 Memory 已经正确变化，而 Callback 不进，问题已经缩小到通知链，不是搬运链。

---

## 8. Debug Case — DMA Complete 为什么仍然可能是坏消息

进入：[DMA Wrong Length Debug Case](../../../06-Debugging-Cases/DMA-Wrong-Length/CASE.md)

Case 中：

```c
uint16_t adc_buffer[64];
```

但 DMA Count = 128 half-words。

重点回答：

> 为什么 Complete 只能证明“要求的 128 次搬完了”，不能证明 Buffer 安全？

---

## 9. Transfer — 下一关为什么是 CAN

DMA 是 Stage 03 第一次把“外设产生数据”和“CPU 搬数据”解耦。

接下来 CAN 会把问题从 MCU 内部数据路径重新扩展到共享物理总线：

```text
MCU CAN Controller
→ Transceiver
→ Differential Bus
→ Multiple Nodes
→ Arbitration
```

你仍然要沿着层级拿证据。

---

## Mission Report

提交：

```text
Board / MCU:
Peripheral source:
DMA request mapping:
Direction:
Source address meaning:
Destination buffer:
Buffer capacity:
Transfer count / unit width:
Increment settings:
Memory before / after:
Complete / error event evidence:
One Simulator observation:
Four injected faults:
Evidence separating no-transfer / wrong-transfer / notification failure:
Root cause:
Minimal fix:
Regression check:
```

---

## Achievement Unlocked

完成后，你应该能把 DMA 分成：

```text
Trigger
→ Transfer Contract
→ Memory Effect
→ Completion
```

并明确：

```text
DMA Complete
≠ DMA configuration is correct
```

下一关：**Mission 06 — CAN Arbitration**。
