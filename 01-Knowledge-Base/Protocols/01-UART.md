# UART — MCU 与 PC 的第一次对话

## 第一次看到 UART，先知道它是什么

UART 可以先把它理解成：**让两个电子设备通过两根主要信号线，一位一位地传递数据的一种基础通信方式。**

最常见场景是：

```text
MCU TX  ─────→  USB转串口 / PC
MCU RX  ←─────  USB转串口 / PC
GND     ──────  GND
```

- `TX`：Transmit，发送；
- `RX`：Receive，接收；
- `GND`：双方共同的电气参考地。

如果你第一次接触嵌入式，可以先把 UART 想象成两个人通过对讲机轮流报数字。双方虽然没有共享一只时钟，但必须提前约定“我每隔多长时间说下一位”。

UART 的全称是 **Universal Asynchronous Receiver/Transmitter**，中文常叫“通用异步收发器”。“异步”最重要的意思是：通信两端没有额外的一根共享时钟线，所以必须对数据速率和帧格式达成一致。

## 一帧数据大概长什么样

```text
Idle → Start → Data Bits → Optional Parity → Stop
```

例如常见的 `8N1`：

- 8：8 个数据位；
- N：No Parity，没有校验位；
- 1：1 个停止位。

## 核心参数

### Baud Rate

每秒传输多少个符号。常见值有 9600、115200 等。在常见 UART 场景下可以先近似理解成“每秒多少 bit”。

### Data Bits / Parity / Stop Bits

它们共同决定一帧数据怎么组织。两端配置不一致，就可能把同一串电平解释成不同数据。

## UART、串口、RS-232、RS-485 是不是一回事？

不是。

可以先这样理解：

```text
UART      → MCU 内部如何产生/接收串行 bit
TTL电平   → 引脚上的电压形式
RS-232    → 另一套电气标准
RS-485    → 适合较远距离、多节点的差分电气标准
Modbus    → 可以运行在串行链路上的更上层协议
```

所以“串口”在日常工程里经常是一个泛称，真正调试时需要继续问：到底是 TTL UART、RS-232，还是 RS-485？

## 最重要的工程认识

“串口乱码”不是一个原因，而是一种现象。

可能来自：Baud Rate 不一致、Clock 偏差、帧格式不同、电平标准不兼容、接线错误、数据编码理解错误或软件缓冲处理问题。

## 推荐互动

UART Frame Visualizer：输入一个字节，显示 Start/Data/Parity/Stop；改变 Baud Rate 后同步改变 bit 时间，并模拟接收端使用错误 Baud Rate 采样。

## 真机验证

PC 串口工具只是第一层。进一步使用示波器/逻辑分析仪测量一个 bit 的时间，并反推 Baud Rate。

学习入口：`02-Learning-Path/Stage-03-Peripheral-Engineer/`。