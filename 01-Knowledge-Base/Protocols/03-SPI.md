# SPI — 时钟边沿上的数据交换

SPI 常见信号：SCLK、MOSI、MISO、CS/SS。主机提供时钟，双方在规定边沿改变和采样数据。

## 核心问题

- CPOL / CPHA 到底改变了什么？
- Full Duplex 是什么意思？
- CS 为什么经常是协议的一部分，而不仅是“选芯片”？
- 字节顺序与 bit 顺序如何影响结果？

## 推荐互动

SPI Timing Playground：切换 Mode 0～3，观察 Clock Idle Level、数据改变边沿和采样边沿；故意选择错误 Mode，展示接收位如何错位。

## 故障视角

能读到某些值并不代表 SPI 正确。需要结合 Datasheet、CS 时序、Clock Frequency、Mode、Frame Length 和逻辑分析仪波形判断。

Stage 03 的重点是从“调用 SPI API”升级到“看懂一帧真实 SPI 波形”。