# RS-485 与 Modbus RTU — 先分清“怎么传”和“传什么”

## 先用一句人话理解

RS-485 和 Modbus RTU 经常一起出现，所以很多新人会把它们当成同一个东西。其实它们解决的是不同问题。

RS-485 更像“电话线怎么传声音”：它主要规定电气层怎样把 0/1 可靠地送到较远距离、多设备共享的总线上。

Modbus RTU 更像“电话里大家约定说什么格式的话”：它规定站号、功能码、寄存器地址、数据和 CRC 怎样组织成一帧。

```text
Application wants register data
↓
Modbus RTU Frame
↓
UART Bytes
↓
RS-485 Transceiver
↓
A / B Differential Bus
```

## 第一次先认识四层

- UART：MCU 内部常用的串行字节接口；
- RS-485：把串行数据转换成适合总线传输的差分电气信号；
- Modbus RTU：定义一帧数据“是什么意思”；
- Device：最终真正保存参数、状态或测量值的设备。

这四层分清以后，排查问题会容易很多。

## RS-485 为什么常有 A/B 两根线

RS-485 常用差分传输：接收端关注两根线之间的电压差，而不是只看某一根线对地的电压，因此更适合工业现场和较长距离通信。

很多系统使用 Half Duplex（半双工），意思是同一组线路在某一时刻主要朝一个方向传输，所以 MCU 往往需要控制收发器什么时候发送、什么时候接收。

## Modbus RTU 一帧里有什么

一个常见请求可以先简化理解成：

```text
Slave Address
→ Function Code
→ Register Address
→ Data / Quantity
→ CRC
```

Slave Address 表示“和哪台设备说话”；Function Code 表示“想读还是想写什么”；Register Address 表示“操作哪个位置”；CRC 用来帮助发现传输过程中出现的错误。

## 为什么 40001 经常把新人搞糊涂

一些设备手册把 Holding Register 写成 `40001`、`40002` 这样的“人类显示编号”，而 Modbus 报文里的实际地址字段可能从 0 开始。不同软件又可能要求你输入不同形式的地址。

因此遇到地址问题时，要明确区分：

```text
Manual display number
≠ necessarily software input value
≠ necessarily Modbus PDU address
```

不要只凭“40001”猜。

## 推荐互动

进入 `03-Interactive-Labs/Modbus-Frame-Builder/`，生成一个 FC03 请求，观察站号、功能码、起始地址、数量和 CRC 最终怎样变成实际字节。

## 故障视角

排查时按三层分开：UART 是否真的产生了正确字节；RS-485 A/B 总线上是否有正确电气波形；Modbus 帧的站号、功能码、地址和 CRC 是否正确。

学习入口：`02-Learning-Path/Stage-03-Peripheral-Engineer/README.md`。