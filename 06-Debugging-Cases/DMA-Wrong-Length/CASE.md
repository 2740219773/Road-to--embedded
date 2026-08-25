# Debugging Case — DMA Wrong Length：搬运成功，为什么程序随后崩溃？

## Symptom

ADC DMA Complete 回调每次都正常触发。

`adc_buffer` 前面的采样值也看起来正确。

但系统随后出现：

- 某个无关状态变量突然变化；
- 函数返回后行为异常；
- 偶发 HardFault；
- 修改日志或优化等级后崩溃位置又变了。

这很容易让人去怀疑 Stack、Pointer 或“编译器不稳定”。

## Evidence Pack

```c
uint16_t adc_buffer[64];
```

配置：

```text
DMA direction:      Peripheral → Memory
DMA data width:     half-word / 16 bit
DMA transfer count: 128
DMA completion:     Yes
ADC samples:        valid at buffer beginning
```

Debugger Memory View：

```text
adc_buffer[0..63]  changes as expected
memory immediately after adc_buffer also changes
```

## Your Task

在看 Diagnosis 前回答：

1. DMA Complete 能证明哪件事？
2. 它不能证明哪件事？
3. `uint16_t adc_buffer[64]` 能容纳多少个 half-word？
4. 谁在写 Buffer 后面的内存——CPU 还是 DMA？
5. 为什么崩溃点可能离真正越界写发生的位置很远？

## Calculate the Contract

```text
Buffer capacity = 64 × uint16_t
                = 64 half-words
                = 128 bytes
```

但 DMA 被要求：

```text
128 half-word transfers
= 256 bytes
```

因此 DMA 会继续写出数组边界：

```text
valid buffer:  64 half-words
requested:    128 half-words
overflow:      64 half-words
```

## Layer Classification

```text
ADC conversion
✓ samples generated

DMA request / mapping
✓ transfer happens

Direction / source
✓ front of buffer looks valid

Completion
✓ requested count finished

Transfer count vs destination capacity
✗ count is twice the buffer capacity

Memory safety
✗ following memory overwritten
```

## Diagnosis

根因是 DMA Transfer Count 与 Buffer Capacity 不匹配。

DMA 不知道 C 数组边界。

它只知道：

> “你要求我写 128 个 half-word，我就写 128 个。”

因此：

```text
DMA Complete
=
requested transfer count finished
```

而不是：

```text
DMA Complete
=
application memory usage was safe
```

## Why the Crash Looks Random

Buffer 后面可能恰好放着：

- 另一个全局变量；
- 控制状态；
- Pointer；
- 堆/栈相关数据；
- RTOS Object；
- 其他 Buffer。

被覆盖对象不同，后续表现就不同。

真正越界发生在 DMA 搬运期间，但系统可能过一会儿使用到被破坏的数据才崩溃。

所以：

```text
crash location
≠ corruption location
```

## High-Value Evidence

最有价值的证据不是 Complete Callback，而是：

```text
Debugger Memory View
→ observe exact boundary
→ see memory after adc_buffer change while DMA runs
```

如果平台支持 Watchpoint/Memory protection，也可以用来辅助定位，但需要记住 DMA 写入不一定像普通 CPU store 那样被所有调试机制捕获。

## Minimal Fix

让：

```text
Transfer Count
≤
Destination Capacity in matching transfer units
```

例如：

```text
buffer = uint16_t[64]
DMA width = 16 bit
DMA count = 64
```

同时检查：

- Memory Increment；
- Source/Destination Width；
- Circular mode boundary；
- Half/Complete 处理区间。

## Regression Check

修复后：

1. Buffer 前先放 Guard Pattern；
2. Buffer 后再放 Guard Pattern；
3. 连续运行多轮 DMA；
4. 确认 Guard 不变化；
5. 确认所有 64 samples 都合理；
6. 确认 Half/Complete 事件和处理区间正确；
7. 再恢复原系统负载，确认随机异常消失。

## Lesson

```text
Memory writer
≠ only CPU
```

调查内存破坏时，必须把 DMA 和其他 Bus Master 也列进“谁能写这个地址”的候选者。

同时记住：

```text
Transfer Count is expressed in transfer units,
not automatically in bytes.
```

## Learning Links

- [Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [Mission 05 — DMA No Transfer](../../04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md)
- [DMA Knowledge](../../01-Knowledge-Base/MCU/04-DMA.md)
- [DMA Transfer Simulator](../../03-Interactive-Labs/DMA-Transfer-Simulator/README.md)

完成 Case 后，回到 Mission Report，再比较一次“DMA 完全没搬”和“DMA 搬完但越界”的证据差异。
