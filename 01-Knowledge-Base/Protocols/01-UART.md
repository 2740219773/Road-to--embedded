# UART — MCU 与 PC 的第一次对话

UART 是异步串行通信。双方没有共享时钟线，因此必须对数据速率和帧格式达成一致。

```text
Idle → Start → Data Bits → Optional Parity → Stop
```

## 核心参数

Baud Rate、Data Bits、Parity、Stop Bits，以及实际硬件中的 TX/RX/GND 和电平标准。

## 最重要的工程认识

“串口乱码”不是一个原因，而是一种现象。

可能来自：Baud Rate 不一致、Clock 偏差、帧格式不同、电平标准不兼容、接线错误、数据编码理解错误或软件缓冲处理问题。

## 推荐互动

UART Frame Visualizer：输入一个字节，显示 Start/Data/Parity/Stop；改变 Baud Rate 后同步改变 bit 时间，并模拟接收端使用错误 Baud Rate 采样。

## 真机验证

PC 串口工具只是第一层。进一步使用示波器/逻辑分析仪测量一个 bit 的时间，并反推 Baud Rate。

学习入口：`02-Learning-Path/Stage-03-Peripheral-Engineer/`。