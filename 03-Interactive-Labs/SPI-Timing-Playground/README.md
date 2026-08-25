# SPI Timing Playground

## Beginner Start

- 第一次操作：保持 CS、CPOL、CPHA 和 Bit Order 默认，运行一帧；
- 预期观察：Clock、MOSI、MISO 和采样边沿形成稳定对应关系；
- 观察不到：先恢复默认 Mode，再一次只改变 CPHA；
- Mission Integration：对应 SPI Wrong Data 的 CS / Edge / Bit Order 调查。

浏览器直接打开 `index.html`。

## 它解决什么问题

SPI 最容易出现一种误判：

> SCLK、MOSI、MISO、CS 都有波形，所以 SPI 应该没问题。

实际上 Controller 和 Device 还必须对下面几件事达成一致：

```text
Clock idle level
Sampling edge
Data-change edge
Bit order
CS selection
```

这个 Playground 允许分别设置：

- Controller SPI Mode；
- Device expected Mode；
- Controller bit order；
- Device expected bit order；
- Data Byte；
- CS 是否在当前帧有效。

工具会把 Mode 0～3 拆成：

```text
CPOL
→ clock idle HIGH / LOW

CPHA
→ sample on which edge
→ change data on which edge
```

然后直接指出 Controller 和 Device 在哪里不匹配。

## 推荐实验

### Experiment A — Match

```text
Controller Mode 0
Device expects Mode 0
MSB first / MSB first
CS active
```

### Experiment B — CPHA mismatch

只把 Device expected Mode 改成 Mode 1。

观察采样边沿为什么不再一致。

### Experiment C — CPOL mismatch

比较 Mode 0 与 Mode 2，观察 Clock idle level 的变化。

### Experiment D — Bit order mismatch

Controller = MSB first，Device = LSB first。

波形仍然存在，但同一组 8 个 bit 会被按完全不同的顺序理解。

### Experiment E — CS inactive

即使 Clock/Data 都在变化，Device 也可能直接忽略整个事务。

## Navigation

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[SPI Wrong Data](../../04-Missions/Stage-03-Peripherals/03-SPI-Wrong-Data/Mission.md)
- Knowledge：[SPI](../../01-Knowledge-Base/Protocols/03-SPI.md)
- Debug Case：[SPI Wrong Mode](../../06-Debugging-Cases/SPI-Wrong-Mode/CASE.md)

学习重点不是背 Mode 0～3，而是能拿 Datasheet 的时序要求和真实波形逐项对比。
