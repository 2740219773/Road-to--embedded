# SPI — MCU 和芯片之间的高速同步对话

## 先用一句人话理解

SPI（Serial Peripheral Interface）是一种常见的芯片间通信方式。MCU 通常作为 Master 主动发起通信，并提供一根 Clock（时钟）线，让双方按照统一节拍发送和读取数据。

它常用来连接 Flash、ADC、显示屏、传感器等器件。

```text
MCU / Master                SPI Device
   SCLK  -----------------> Clock
   MOSI  -----------------> Data to device
   MISO  <----------------- Data from device
   CS    -----------------> Select device
```

可以把 SPI 想成两个人按照节拍器交换纸条：SCLK 是节拍器，MOSI/MISO 是两个方向的纸条通道，CS 表示“现在我要和你说话”。

## 四根常见信号

- SCLK：Serial Clock，主机提供的通信节拍；
- MOSI：Master Out Slave In，主机发给从设备的数据；
- MISO：Master In Slave Out，从设备返回的数据；
- CS/SS：Chip Select / Slave Select，选择当前通信设备。

不同器件可能使用不同名称，但角色基本一致。

## 为什么会有 Mode 0～3

双方必须约定“时钟平时是高还是低”和“在哪个边沿读取数据”。这两个规则叫 CPOL 与 CPHA，它们组合成常见的 SPI Mode 0～3。

第一次学习不必死背四种模式。先记住：如果 MCU 和芯片对采样边沿理解不同，即使四根线都有波形，收到的数据仍可能是错的。

## Full Duplex 是什么

SPI 通常具备同时发送和接收的能力。MCU 每产生一组时钟，一边把 bit 推到 MOSI，一边也可以从 MISO 收 bit。这叫 Full Duplex（全双工）。

## 推荐互动

进入 `03-Interactive-Labs/SPI-Timing-Playground/`，切换 Mode 0～3，看 CPOL/CPHA 如何改变时钟空闲电平和采样边沿。

## 真机判断

不要只问“SPI API 返回成功了吗”。还要对照器件 Datasheet 的时序图，检查 CS、Clock Frequency、Mode、bit 顺序和真实波形。

Stage 03 的目标是从“会调用 SPI 函数”升级到“能看懂 MCU 和器件究竟在怎样交换 bit”。