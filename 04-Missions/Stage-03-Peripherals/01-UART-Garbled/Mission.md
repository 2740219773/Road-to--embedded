# Mission — UART 乱码：到底是谁的波特率错了？

> 学习路径：[Stage 03 — Peripheral Explorer](../../../02-Learning-Path/Stage-03-Peripheral-Explorer/README.md) · 知识支撑：[UART](../../../01-Knowledge-Base/Protocols/01-UART.md) · [Clock Tree](../../../01-Knowledge-Base/MCU/05-Clock-Tree.md) · 互动实验：[UART Frame Visualizer](../../../03-Interactive-Labs/UART-Frame-Visualizer/README.md)

## 故障现场

MCU 持续发送 `Hello`，PC 串口工具却显示乱码。

你不能直接假设是“波特率设置错了”，因为乱码只是现象。

## Hypotheses

- PC 与 MCU Baud Rate 不一致；
- MCU Clock 与软件配置假设不一致；
- Data Bits / Parity / Stop 不一致；
- TTL / RS-232 / RS-485 电平或接口理解错误；
- TX/RX/GND 连接问题；
- 实际发送的数据并不是预期编码。

## Evidence

先用 UART Frame Visualizer 建立 8N1 与 bit time 的直觉，再用示波器测 MCU TX 上一个 bit 的实际持续时间：

```text
Baud ≈ 1 / Bit Time
```

把测量值与 PC 配置、MCU 配置和 Clock Tree 对比。

## Break It

分别制造错误 Baud Rate、错误 Stop Bits、错误 Clock 假设，记录串口工具和波形有什么不同。

## Boss

只给你一根 TX 波形和 PC 端乱码截图，不给 MCU 工程配置。根据 bit time、frame 结构和电平推断最可能的配置问题，并说明还需要什么证据才能确认。

## Achievement

从“换几个波特率试试”升级到“通过波形测出真实 Baud Rate”。