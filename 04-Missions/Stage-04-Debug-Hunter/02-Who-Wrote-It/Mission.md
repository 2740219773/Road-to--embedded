# Mission 02 — Who Wrote It：是谁改坏了状态？

## Beginner Guide

- 适合：已完成 Fault Scene 的学习者；
- 前置：变量地址、Watchpoint、Call Stack、数组边界和 DMA 基础；
- 预计：60 分钟；
- 本关产出：变量第一次被破坏的写入证据；
- 上一关：Fault Scene；当前关：Who Wrote It；下一关：Choose the Instrument。

## What to Submit

使用 [Learning Record Template](../../../docs/LEARNING-RECORD-TEMPLATE.md)，记录变量地址、候选写入者、Watchpoint 命中、PC/Call Stack 和修复回归。

## If You Are Stuck

先找变量地址，再设置 Watchpoint；Watchpoint 未命中时继续检查 DMA、数组边界和观察时机。

## Ready to Continue

能够区分最后读到坏值的位置和第一次写坏的位置后，再进入 Choose the Instrument。

## Hook

`system_state` 正常只能出现 `IDLE/RUN/ERROR`，但运行几分钟后偶尔变成 `0x7F`。全局搜索能找到很多“可能写入”的位置，却不一定能找到第一次破坏发生的现场。

## Mission Goal

使用变量地址、Watchpoint、PC 和 Call Stack，定位谁在什么时刻改变了状态；同时识别 CPU 直接写入、数组越界和 DMA 写入的证据差异。

## 导航

- Stage：[Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- Knowledge：[Debugger Watchpoint](../../../01-Knowledge-Base/Debugging/04-Debugger-Watchpoint.md)、[Stack & Memory Corruption](../../../01-Knowledge-Base/Debugging/03-Stack-and-Memory-Corruption.md)
- Lab：[Memory Visualizer](../../../03-Interactive-Labs/Memory-Visualizer/README.md)、[Debug Evidence Workbench](../../../03-Interactive-Labs/Debug-Evidence-Workbench/README.md)
- Boss：[Broken Firmware Investigation](../../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)

## Predict

先回答：如果搜索不到 `system_state = 0x7F`，变量仍然发生变化，最可能还有哪三类写入路径？普通 CPU Data Watchpoint 能不能保证捕获 DMA 写入？如果只在变量变化后才暂停，为什么可能已经错过第一现场？

## Explore / Observe

在 Workbench 的 Watchpoint 模式中，先观察变量初值和相邻内存，再逐步揭示候选写入者、命中地址、PC 和 Call Stack。记录每个候选者能解释哪些证据、不能解释哪些证据。

## Action

1. 记录 `system_state` 的地址、长度和相邻对象；
2. 建立潜在写入者清单；
3. 对 CPU 写入设置 Data Watchpoint；
4. 命中后记录 PC、Call Stack、旧值和新值；
5. 对未命中的变化检查数组边界、DMA destination/length 和调试器观察时机；
6. 把结论写入 Evidence Record，而不是只写“某函数有问题”。

## Break It

分别制造三种故障：直接赋值、相邻数组越界、DMA 越界。比较哪一种能被 CPU Watchpoint 捕获，哪一种需要 Memory View、Guard Pattern 或 DMA 寄存器证据。

## Debug with Evidence

用以下链路证明第一次错误写入：

```text
Corrupted Object
→ Address
→ Watchpoint / Boundary Evidence
→ PC / Call Stack / DMA Snapshot
→ First Illegal Write
→ Minimal Fix
→ Regression
```

至少排除一个“只改最后读到非法值的函数”的错误修复方案。

## Transfer / Boss

把状态变量替换成 DMA Buffer 后面的 Guard Pattern，解释为什么“DMA Complete”不能证明 Memory Safe，并迁移到 [Boss 的 DMA/Buffer 故障](../../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)。

## Review / Exit

通过标准：能记录变量地址；能区分控制流证据和数据流证据；能说明 Watchpoint 的能力边界；能提出修复后的边界回归。完成后进入 [Mission 03 — Choose the Instrument](../03-Choose-The-Instrument/Mission.md)。

## Achievement

从“哪个函数看起来可疑”升级到“在变量被破坏的第一现场抓住写入者”。
