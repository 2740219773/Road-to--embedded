# Stage 03 — Peripheral Engineer / 外设工程师

## 核心目标

让 MCU 真正开始和外部世界通信、采样和控制。

主线：UART → I²C → SPI → ADC → PWM → DMA，并在此基础上继续认识 CAN 与 RS-485 / Modbus。

每个外设都采用同一种学习方式：先观察信号和任务，再理解协议，再配置 MCU，最后故意制造故障并用工具定位。

## Mission Map

1. [UART 乱码：到底是谁的波特率错了？](../../04-Missions/Stage-03-Peripherals/01-UART-Garbled/Mission.md)
2. [I²C No ACK：地址明明对，为什么设备不回答？](../../04-Missions/Stage-03-Peripherals/02-I2C-No-ACK/Mission.md)
3. [SPI 有波形，但数据为什么是错的？](../../04-Missions/Stage-03-Peripherals/03-SPI-Wrong-Data/Mission.md)
4. [ADC 为什么一直抖？](../../04-Missions/Stage-03-Peripherals/04-ADC-Jitter/Mission.md)
5. [DMA 配好了，为什么一个字节都没搬？](../../04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md)
6. [两个 CAN 节点同时说话，为什么没有撞车？](../../04-Missions/Stage-03-Peripherals/06-CAN-Arbitration/Mission.md)
7. [Modbus 通了，为什么读到的寄存器不对？](../../04-Missions/Stage-03-Peripherals/07-Modbus-Wrong-Register/Mission.md)

## Interactive Labs

- [UART Frame Visualizer](../../03-Interactive-Labs/UART-Frame-Visualizer/)
- [I²C Bus Visualizer](../../03-Interactive-Labs/I2C-Bus-Visualizer/)
- [SPI Timing Playground](../../03-Interactive-Labs/SPI-Timing-Playground/)
- [ADC Sampling Simulator](../../03-Interactive-Labs/ADC-Sampling-Simulator/)
- [PWM Visualizer](../../03-Interactive-Labs/PWM-Visualizer/)
- [DMA Transfer Simulator](../../03-Interactive-Labs/DMA-Transfer-Simulator/)
- [CAN Arbitration Visualizer](../../03-Interactive-Labs/CAN-Arbitration-Visualizer/)
- [Modbus Frame Builder](../../03-Interactive-Labs/Modbus-Frame-Builder/)

## Boss Project

- [Multi-Peripheral Sensor Node](../../05-Projects/Beginner/Stage-03-Boss-Sensor-Node/PROJECT.md)

## 完成标准

不是“每个 API 都调用过”，而是至少能对 UART/I²C/SPI/ADC/PWM 中的典型异常进行分层取证，并完成一个多外设数据采集节点。

完成后进入 [Stage 04 — Debug Hunter](../Stage-04-Debug-Hunter/README.md)。