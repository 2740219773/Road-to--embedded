# DMA — CPU 不搬数据，数据为什么还能移动？

## 第一次看到 DMA，先把它理解成“搬运工”

DMA 的全称是 **Direct Memory Access，直接存储器访问**。

先不要被名字吓到。可以把 MCU 想成一个办公室：

- CPU 是工程师；
- UART / ADC / SPI 等外设不断产生或需要数据；
- RAM 是仓库；
- DMA 是专门负责搬箱子的搬运工。

没有 DMA 时，CPU 可能要不断做这样的事情：

```text
读外设一个数据
→ 写进内存
→ 再读下一个
→ 再写进去
→ ……
```

如果数据很多，CPU 大量时间都会花在重复搬运上。

有 DMA 后，CPU 可以先告诉 DMA：

> 从哪里搬、搬到哪里、搬多少个、每个数据多宽。

然后由 DMA 完成大量重复搬运，CPU 去做其他事情。

```text
Peripheral → DMA → Memory
                ↓
        Half / Complete Event
                ↓
               CPU
```

## 先认识几个词

- `Peripheral`：外设，例如 UART、ADC、SPI；
- `Memory`：这里通常指 RAM；
- `Source`：数据从哪里来；
- `Destination`：数据搬到哪里；
- `Length`：搬多少个数据；
- `Data Width`：每个数据按 8/16/32 bit 等多宽处理。

## DMA 什么时候特别有用？

例如 ADC 连续高速采样 1000 个点。如果 CPU 每个点都亲自读取并保存，会浪费很多执行时间。DMA 可以把 ADC 数据持续搬进数组，完成一半或全部后再通知 CPU。

## Normal 与 Circular

### Normal

搬完指定数量就停止。像“把这一车货搬完就下班”。

### Circular

搬到末尾后重新从 Buffer 开头继续，适合连续采样和持续通信。像一条循环传送带。

## DMA 和 Interrupt 是替代关系吗？

不是。

DMA 负责搬数据，中断可以负责通知 CPU：

- 搬到一半了；
- 搬完了；
- 出错了。

两者经常一起使用。

## 核心问题

- DMA 解决的瓶颈是什么？
- Source / Destination / Length 是什么？
- Normal 与 Circular 模式有什么区别？
- DMA 和 Interrupt 如何协作？
- Cache 存在时为什么还会出现“内存明明变了，CPU 看见的却不对”的问题？这一项属于后续进阶内容，初学阶段先知道存在即可。

## 推荐互动

DMA Transfer Simulator：显示 CPU、Peripheral、DMA 和 Memory 四个区域，让数据块移动过程可视化，并比较 Polling、Interrupt-per-byte 与 DMA 的 CPU 占用时间线。

## 故障视角

DMA 不工作时检查 Request Mapping、方向、地址、长度、数据宽度、事件/中断以及外设本身是否产生请求。

初学阶段先抓住一句话：**DMA 是替 CPU 做批量数据搬运的硬件机制。**