# RS-485 与 Modbus RTU — 不要把物理层和协议混在一起

RS-485 主要定义差分电气传输方式；Modbus RTU 是可以运行在串行链路上的应用协议。两者经常一起使用，但不是同一个概念。

```text
Modbus RTU Frame
↓
UART Bytes
↓
RS-485 Transceiver
↓
A/B Differential Bus
```

## 核心问题

- UART、RS-485、Modbus 分别属于哪一层？
- Half Duplex 为什么需要方向控制？
- Slave Address、Function Code、Register Address 是什么？
- CRC 用来解决什么问题？
- 40001 这类“文档地址”为什么经常与报文中的实际地址产生 1 偏移困惑？

## 推荐互动

Modbus Frame Builder：选择站号、功能码、起始地址、数量，实时生成帧并拆解 CRC；再模拟错误波特率、错误站号、错误地址和方向控制时序。

## 故障视角

排查时把问题拆成三层：UART 是否产生正确字节、RS-485 总线上是否存在正确电气波形、Modbus 帧语义是否正确。