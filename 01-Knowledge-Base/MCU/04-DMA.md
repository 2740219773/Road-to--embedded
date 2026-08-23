# DMA — CPU 不亲自搬，数据为什么还能进入 RAM

## 先用一句人话理解

DMA 的全称是 Direct Memory Access，直接存储器访问。

可以把 MCU 想成一个工作间：

- CPU：负责判断和控制；
- Peripheral：UART、ADC、SPI 等不断产生或需要数据；
- RAM：存数据的工作区；
- DMA：按照提前配置好的规则批量搬数据的硬件搬运器。

没有 DMA 时，CPU 可能不断做：

```text
read peripheral data
→ write RAM
→ read next data
→ write RAM
→ ...
```

有 DMA 后，CPU 先设置：

```text
谁来触发
从哪里搬
搬到哪里
搬多少个
每个数据多宽
什么时候停止 / 循环
```

然后 DMA 执行重复搬运。

## DMA 在系统哪里

继续沿用 Stage 03 的分层：

```text
Peripheral Event
↓
DMA Request
↓
DMA Controller
↓
Source / Destination Address
↓
Transfer Count / Data Width
↓
Memory changes
↓
Half / Complete / Error Event
↓
CPU handles the result
```

因此 DMA 不是“自动魔法”。链上的任何一段配置错了，都可能导致：

- 完全没搬；
- 搬错方向；
- 搬错地址；
- 搬少了；
- 搬太多越界；
- 数据宽度错导致内容错位；
- 搬完了但 CPU 没收到通知。

## Request 是什么

DMA 通常不是自己随时去读某个外设。

Peripheral 在“有数据可取”或“需要数据发送”时，会产生 DMA Request（DMA 请求）。

例如 ADC 每完成一次转换：

```text
ADC conversion complete
→ DMA request
→ DMA reads ADC data register
→ DMA writes next RAM slot
```

如果 ADC 根本没有开始转换，或者 Request Mapping 配错：

```text
DMA enabled
≠ data will move
```

必须先有正确的触发源。

## Source / Destination / Direction

以 ADC → RAM 为例：

```text
Source      = ADC Data Register
Destination = adc_buffer[]
Direction   = Peripheral → Memory
```

如果 Direction 写反，DMA Controller 即使启用了，也不代表会得到你想要的结果。

所以调查时不要只问“DMA 开了吗”，还要问：

> 它认为数据应该从哪儿搬到哪儿？

## Transfer Count 和 Buffer Capacity 不是一回事

这是 DMA 很危险的一点。

假设：

```c
uint16_t buffer[64];
```

Buffer Capacity 是 64 个 `uint16_t`。

如果 DMA 被配置：

```text
Transfer Count = 128 half-words
```

DMA 可能非常听话地搬完 128 个，然后报告 Complete。

问题是后 64 个已经写到 Buffer 外面。

所以：

```text
DMA Complete
≠ Destination memory was safe
```

完成事件只能证明“DMA 完成了你要求它做的数量”，不能证明这个数量本身正确。

## Data Width 是什么

DMA 通常可以按 8 / 16 / 32 bit 等宽度搬数据。

例如 ADC Data Register 产生 16-bit 数据，而 DMA Destination Width 被配置成 8-bit，可能出现截断、排列或地址递增行为与预期不一致。

不同 MCU 对 Source Width、Destination Width、地址对齐的限制不同，必须看芯片 Reference Manual / Datasheet。

初学阶段先建立：

```text
Count = number of transfer units
Width = size of each transfer unit
```

不要把“128 bytes”和“128 half-words”当成同一个概念。

## Address Increment 是什么

连续写数组时，Destination Address 通常需要每次递增：

```text
buffer[0]
buffer[1]
buffer[2]
...
```

如果 Memory Increment 没开，DMA 可能不断覆盖同一个位置。

反过来，某些 Peripheral Data Register 地址通常应该保持不变。

因此：

```text
Peripheral address fixed
Memory address increments
```

是常见模式，但不是所有 DMA 任务都完全一样。

## Normal 与 Circular

### Normal

搬完指定 Count 后停止。

```text
start
→ N transfers
→ complete
→ stop
```

### Circular

到 Buffer 末尾后重新从开头继续，常用于持续 ADC / Audio / UART 接收。

```text
buffer start
→ ...
→ buffer end
→ buffer start again
```

Circular 很方便，也意味着 CPU 必须理解“哪一半 Buffer 当前可以安全处理”，否则会与 DMA 同时访问同一片数据。

Half Complete / Complete Event 经常用于这种协作。

## DMA 和 Interrupt 是替代关系吗

不是。

```text
DMA → moves data
Interrupt/Event → tells CPU something happened
```

常见组合：

```text
DMA moves 1024 samples
→ Half Complete
→ CPU processes first half
→ Complete
→ CPU processes second half
```

所以“没进入回调”不一定表示 DMA 没搬；也可能只是 Event/Interrupt 配置有问题。

反过来，“Complete Callback 进了”也不证明内存边界安全。

## DMA Transfer Simulator

进入：[DMA Transfer Simulator](../../03-Interactive-Labs/DMA-Transfer-Simulator/README.md)

重点做两类实验：

```text
No Transfer:
Request / Enable / Direction / Count 任一断开

Memory Corruption:
Transfer Count > Buffer Capacity
```

这样把“没搬”和“搬坏了”分成两种完全不同的故障。

## 真机调试顺序

遇到 DMA Buffer 不变化：

```text
1. Peripheral itself is producing/consuming data?
2. DMA request really generated?
3. Request mapping / channel / stream correct?
4. Direction correct?
5. Source address correct?
6. Destination address correct?
7. Transfer count > 0?
8. Data width / increment correct?
9. DMA enabled?
10. Memory actually changes?
11. Completion/error event configured as expected?
```

遇到 DMA 完成后程序随机异常：

```text
1. Transfer count vs buffer capacity
2. Width / alignment
3. Memory increment
4. Wrong destination address
5. Who else writes this region?
```

## 关于 Cache

某些高性能 MCU/SoC 有 Data Cache。

这时可能出现：

```text
DMA changed RAM
but CPU cache still contains old data
```

或者 CPU 改了 Cache，但 DMA 从 RAM 看到的还是旧内容。

这是后续进阶的 Cache Coherency 问题。Stage 03 先知道它存在，不要求展开所有平台细节。

## Learning Loop

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[DMA No Transfer](../../04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md)
- Interactive Lab：[DMA Transfer Simulator](../../03-Interactive-Labs/DMA-Transfer-Simulator/README.md)
- Debug Case：[DMA Wrong Length](../../06-Debugging-Cases/DMA-Wrong-Length/CASE.md)

完成后，你应该能把 DMA 问题拆成 Trigger、Transfer Rule、Memory Result、Completion 四层，而不是只看“初始化函数成功没成功”。