# Stage 03 Boss Project — Multi-Peripheral Sensor Node

## 项目目标

构建一个小型数据采集节点，把 Stage 03 的多个外设真正串起来。

## Suggested System

```text
Analog Input → ADC ─┐
I2C Sensor ─────────┼→ MCU → UART / RS-485 → PC
SPI Device ─────────┘
          Timer / DMA
```

没有真实传感器时允许使用电位器、模拟数据或简单外设替代，但通信链路和调试过程必须真实可观察。

## Requirements

- 周期采样至少两类数据源；
- 至少使用 UART 输出；
- 至少完成 I2C 或 SPI 中一种真实外设通信；
- 使用 Timer 组织周期任务；
- 选做 DMA；
- PC 能看到结构化数据；
- 保留波形/日志/寄存器等调试证据。

## Failure Injection

从 UART Baud、I2C Pull-up/Address、SPI Mode、ADC Noise/Sampling、DMA Mapping 中选择至少四种故障主动注入并定位。

## Acceptance

最终提交物不是只有代码，而是：系统框图、接口表、运行证据、故障记录、复盘。

通过标准：面对任意一个预设故障，能够解释应该先观察哪一层，以及为什么。