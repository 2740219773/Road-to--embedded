# Mission — Modbus 通了，为什么读到的寄存器不对？

## 导航

- Stage：`02-Learning-Path/Stage-03-Peripheral-Engineer/`
- Knowledge：`01-Knowledge-Base/Protocols/05-RS485-Modbus.md`
- Lab：`03-Interactive-Labs/Modbus-Frame-Builder/`

## 故障现场

设备手册写“Holding Register 40001”，你在程序中把起始地址直接填写为 40001，设备返回 Illegal Data Address 或读到完全不相关的数据。

## Investigation

先拆层：

```text
Manual Display Number
→ Protocol Address
→ Modbus PDU
→ UART Bytes
→ RS-485 Electrical Bus
```

很多文档使用 4xxxx 作为人类可读寄存器编号，而实际 Modbus PDU 地址字段可能从 0 开始。不同设备和软件的输入约定并不完全一致，因此不能只凭“40001”猜。

## Lab

使用 Modbus Frame Builder，分别输入协议地址 `0x0000` 和其他地址，观察 FC03 请求帧中的实际两个 Address Byte。

## Boss

给出设备手册表格、抓到的请求帧和异常响应，判断问题发生在物理层、CRC、功能码还是地址语义，并说明证据。

## Achievement

以后遇到 Modbus 地址问题，会先确认“文档编号、软件输入值、协议 PDU 地址”三者的映射关系。