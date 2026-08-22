# Debugging Case — DMA 完成了，程序却随后崩溃

## Symptom

ADC DMA Complete 回调正常触发，buffer 前面的采样值也正确，但稍后系统出现随机状态异常甚至 HardFault。

## Evidence Pack

```c
uint16_t adc_buffer[64];
```

DMA configured transfer count: 128 half-words.

Debugger memory view shows values beyond `adc_buffer` changing during transfer.

## Your Task

为什么 DMA “成功完成”反而不能证明配置正确？最有价值的证据是什么？

## Diagnosis

目标 buffer 只能容纳 64 个 half-word，但 DMA 被要求写入 128 个，导致 DMA 在 CPU 不参与的情况下持续覆盖后续内存。

## Verification

修正 transfer count，并使用 memory watch / guard / map file 检查 buffer 边界。确认被覆盖对象恢复稳定。

## Lesson

内存破坏的写入者不一定是 CPU 指令。调查“谁能写这个地址”时必须包含 DMA 和其他 bus master。

## Learning Links

- [Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- [Mission — DMA No Transfer](../../04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md)
- [DMA Knowledge](../../01-Knowledge-Base/Protocols/05-DMA.md)
- [DMA Transfer Simulator](../../03-Interactive-Labs/DMA-Transfer-Simulator/README.md)
