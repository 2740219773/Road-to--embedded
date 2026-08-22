# Mission — SPI 有波形，但数据为什么是错的？

## 故障现场

逻辑分析仪上 SCLK、MOSI、MISO、CS 都有波形，程序也确实收到字节，但设备 ID 应该是 `0xA5`，你读到的却总是错误值。

## Hypotheses

- CPOL/CPHA 不匹配；
- Clock 太快；
- CS 时序不符合 Datasheet；
- MSB/LSB 顺序错误；
- Command/Address/Data 阶段理解错误；
- MISO 电气连接或设备状态异常。

## Investigation

先使用 SPI Timing Playground 切换 Mode 0～3，理解“改变边沿”和“采样边沿”。然后对照 Datasheet 的时序图检查真实波形。

不要只看逻辑分析仪自动解码结果；必要时直接看原始 SCLK/MISO 边沿关系。

## Break It

保持数据不变，只切换 CPHA 或 CPOL，观察接收结果如何改变。再单独改变 CS 的拉低/拉高时机。

## Boss

给出 Datasheet 时序图和一张真实 SPI 波形，不提供初始化代码。判断当前 SPI Mode 是否匹配，并指出至少两个仍需确认的参数。

## Achievement

从“SPI 有数据就是通信正常”升级为能够用时序证据判断一帧 SPI 是否真的符合器件要求。