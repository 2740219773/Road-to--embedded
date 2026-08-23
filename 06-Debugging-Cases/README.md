# Debugging Cases — 故障案例库

这里保存可以重复训练的真实工程故障。案例不是教程，而是 Evidence Pack：先给现象和证据，再要求学习者自己判断。

标准过程：

```text
Symptom
→ Hypotheses
→ Evidence
→ Eliminate / Confirm
→ Root Cause
→ Fix
→ Regression
```

## 当前已实现案例

### Stage 03 / 外设与通信

- [UART Garbled](UART-Garbled/CASE.md) — 从 bit time 反推真实 Baud Rate。
- [I²C No ACK](I2C-No-ACK/CASE.md) — 先判断电气层是否具备合法总线条件，再解释 Address / ACK。
- [SPI Wrong Mode](SPI-Wrong-Mode/CASE.md) — 波形存在但 Sample Edge 与 Datasheet 不一致。
- [ADC Unstable Reference](ADC-Unstable-Reference/CASE.md) — Vin 稳定但 Vref 变化导致 ADC Code 整体漂移。
- [DMA Wrong Length](DMA-Wrong-Length/CASE.md) — DMA 正常完成但越界覆盖内存。

### Stage 04 / Debug Hunter

- [HardFault Bad Pointer](HardFault-Bad-Pointer/CASE.md) — 从 Stacked PC 回到非法地址访问。
- [Interrupt Storm](Interrupt-Storm/CASE.md) — 中断源没有被正确清除/确认。
- [Stack Overflow](Stack-Overflow/CASE.md) — 崩溃位置变化，但根因来自任务栈不足。

### Stage 05 / RTOS

- [RTOS Race Lost Update](RTOS-Race-Lost-Update/CASE.md) — 两个 Task 的读改写交错导致更新丢失。
- [RTOS Deadlock](RTOS-Deadlock/CASE.md) — Task 都存在、CPU 也正常，但资源形成循环等待。

## 使用方式

建议顺序是：先完成对应 Stage 的 Mission，再进入 Case。Case 中不要先看 Diagnosis；先写自己的调查顺序和下一步测量，再与案例结论比较。

案例应尽量提供日志、波形、寄存器快照、任务状态或代码片段，让学习者依据证据判断，而不是猜答案。

后续新增案例必须明确连接到对应 Stage / Mission / Knowledge Base；尚未实现的案例不在这里伪装成“已完成”。