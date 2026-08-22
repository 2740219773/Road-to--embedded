# Debugging Case — CPU 为什么一直困在中断里

## Symptom

开启某外设中断后，主循环几乎不再运行。Debugger 暂停时大多数时间都停在同一个 ISR。

## Evidence Pack

- ISR entry counter increases extremely fast
- Peripheral interrupt status flag remains asserted after ISR
- ISR handles data but does not perform the peripheral-specific flag clear/acknowledge sequence

## Your Task

解释为什么 CPU 从 ISR 返回后会很快再次进入同一个中断。这个问题应该通过降低中断优先级解决吗？

## Diagnosis

中断源仍处于 pending/asserted 条件，CPU 返回后立即再次响应。降低优先级可能改变表面行为，但没有消除中断源。

## Verification

按照目标外设 Reference Manual 要求正确读取/写入相应状态并清除或 acknowledge 中断源，再观察 ISR rate 和主循环执行时间。

## Lesson

“中断太多”不是完整根因。必须找到是谁持续请求中断，以及硬件要求怎样解除该请求。

## Learning Links

- [Stage 04 — Debug Hunter](../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- [Interrupt Knowledge](../../01-Knowledge-Base/MCU/02-Interrupt.md)
- [Evidence-Driven Debugging](../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)
- [Choose the Instrument Mission](../../04-Missions/Stage-04-Debug-Hunter/03-Choose-The-Instrument/Mission.md)
