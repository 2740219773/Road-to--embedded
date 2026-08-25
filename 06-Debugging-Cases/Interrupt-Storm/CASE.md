# Debugging Case — CPU 为什么一直困在中断里

## Symptom

开启某外设中断后，主循环几乎不再运行。Debugger 暂停时大多数时间都停在同一个 ISR。

## Context

外设中断由状态寄存器中的 pending/asserted 条件触发。不同外设的清除方式可能要求读状态、写特定位或读取数据寄存器，不能只凭通用经验修改。

## Evidence

- ISR entry counter increases extremely fast；
- Peripheral interrupt status flag remains asserted after ISR；
- ISR handles data but does not perform the peripheral-specific flag clear/acknowledge sequence；
- 主循环进度计数器几乎不增加。

## Hypotheses

- 中断源没有清除或 acknowledge；
- ISR 本身执行时间过长，导致看起来像中断风暴；
- 优先级配置让其他任务被长期阻塞；
- 外部信号确实以过高频率持续触发。

## Experiments

1. 在 ISR 入口和出口记录计数与时间；
2. 在 ISR 内读取中断状态快照；
3. 依据 Reference Manual 执行一次正确的 flag clear/acknowledge 序列；
4. 比较清除前后的 pending 位、ISR rate 和主循环进度；
5. 临时降低输入事件频率，区分“事件太多”和“请求未解除”。

## Root Cause

中断源仍处于 pending/asserted 条件，CPU 返回后立即再次响应。ISR 没有完成目标外设要求的清除或 acknowledge sequence。

## Fix

按照目标外设 Reference Manual 的顺序：

- 读取必要状态；
- 读取或写入要求的数据/清除寄存器；
- 清除 pending 条件；
- 只在必要范围内修改 ISR。

降低优先级可以改变表面行为，但不能替代解除中断源。

## Verification

- ISR entry rate 与预期事件频率一致；
- pending flag 在正确时机解除；
- 主循环和其他任务恢复运行；
- 在低频、高频、连续事件和异常事件下都不会重新进入 storm；
- 记录 CPU 占用或时间预算，确认 ISR 没有超出设计边界。

## Prevention

把外设专属清除顺序写进 Driver 注释和测试；为 ISR 增加 entry/exit 计数、最大执行时间和 pending 状态诊断；禁止只通过调整优先级隐藏持续请求。

## Lesson

“中断太多”不是完整根因。必须找到是谁持续请求中断，以及硬件要求怎样解除该请求。

## Learning Links

- [Stage 04 — Debug Hunter](../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- [Interrupt Knowledge](../../01-Knowledge-Base/MCU/02-Interrupt.md)
- [Evidence-Driven Debugging](../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)
- [Choose the Instrument Mission](../../04-Missions/Stage-04-Debug-Hunter/03-Choose-The-Instrument/Mission.md)
