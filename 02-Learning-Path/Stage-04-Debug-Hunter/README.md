# Stage 04 — Debug Hunter / 故障猎人

这一阶段不以新增外设为主，而是系统训练定位能力。

## 工具

Debugger / SWD / JTAG、串口日志、逻辑分析仪、示波器、万用表、Datasheet、Reference Manual。

## 训练模式

```text
给出故障现场
→ 不给答案
→ 建立假设
→ 选择工具
→ 获取证据
→ 缩小范围
→ 找到根因
→ 修复并回归
```

## 典型案例

UART 乱码、GPIO 不动作、I2C NACK、SPI 时序错误、HardFault、栈破坏、DMA 不触发、中断优先级问题。

故障案例统一沉淀到 `06-Debugging-Cases/`。

## Boss

给一个包含多个独立故障的 MCU 工程，只提供现象和有限日志，独立完成定位报告。