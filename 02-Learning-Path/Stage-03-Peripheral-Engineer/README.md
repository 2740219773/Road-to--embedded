# Stage 03 — Peripheral Engineer / 外设工程师

## 当前状态与适合谁

正式阶段。适合已经完成 Stage 02 Exit Check，能够使用 Debugger、Datasheet 和基本仪器取证的学习者。

## 学习环境与阶段产出

- 环境：MCU 开发板、串口/总线设备、逻辑分析仪或示波器；具体设备按 Mission 标注。
- 必做产出：八个外设 Mission Record、一份 Mixed Peripheral Record、Sensor Node Boss 和 Exit Check。
- 必须阅读：当前 Mission 的 Before You Start、对应协议或 MCU Knowledge。
- 选读内容：其他协议页面作为查询资料，不要求一次读完。

## 核心目标

Stage 02 已经建立真实 MCU 基础：Build / Flash / Debugger / GPIO / Interrupt / Timer / PWM / Pin / Voltage。

Stage 03 不再重复这些基础，而是让 MCU 和更多外部设备通信、采样、搬运数据，并持续训练同一个跨层调查方法。

```text
UART ✅
→ I²C ✅
→ SPI ✅
→ ADC ✅
→ DMA ✅
→ CAN ✅
→ RS-485 ✅
→ Modbus RTU ✅
```

PWM 基础属于 Stage 02；Stage 03 只在综合项目中复用。

## 统一调查模型

不管外设叫什么，都先放回：

```text
Application / Data Meaning
↓
Peripheral Configuration
↓
Clock / Timing
↓
Register / Driver State
↓
Pin / Bus
↓
Electrical Signal
↓
External Device
↓
Protocol / Data Meaning
```

Stage 03 不是“八套 API 教程”，而是不断换场景训练同一种证据驱动方法。

## Entry Requirements

进入前应完成 Stage 02 Exit Check，并至少会使用：

- [Instrument Basics — 新手第一次使用测量工具](../../01-Knowledge-Base/Debugging/00-Instrument-Basics.md)

- Debugger：证明程序、寄存器和 Buffer 状态；
- Schematic / Datasheet：确认 Pin、连线、时序和器件要求；
- Multimeter：测静态电压；
- Oscilloscope：测真实电压、周期和波形；
- Logic Analyzer：观察数字总线和协议时序。

如果 GPIO 不工作时仍然主要靠“换一份代码”，建议先回 Stage 02。

## Mission Map

1. [UART Garbled — 乱码到底从哪一层开始？](../../04-Missions/Stage-03-Peripherals/01-UART-Garbled/Mission.md) ✅
2. [I²C No ACK — 地址明明对，为什么设备不回答？](../../04-Missions/Stage-03-Peripherals/02-I2C-No-ACK/Mission.md) ✅
3. [SPI Wrong Data — 四根线都有波形，为什么数据还是错的？](../../04-Missions/Stage-03-Peripherals/03-SPI-Wrong-Data/Mission.md) ✅
4. [ADC Jitter — 读数一直抖，应该先滤波吗？](../../04-Missions/Stage-03-Peripherals/04-ADC-Jitter/Mission.md) ✅
5. [DMA No Transfer — 初始化成功，为什么 Buffer 一个字节都没变？](../../04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md) ✅
6. [CAN Arbitration — 三个节点同时发送，谁能继续？](../../04-Missions/Stage-03-Peripherals/06-CAN-Arbitration/Mission.md) ✅
7. [RS-485 No Reply — UART 发了，A/B 总线为什么没回应？](../../04-Missions/Stage-03-Peripherals/07-RS485-No-Reply/Mission.md) ✅
8. [Modbus Wrong Register — 通信明明通了，为什么读错参数？](../../04-Missions/Stage-03-Peripherals/08-Modbus-Wrong-Register/Mission.md) ✅

特别保持：

```text
RS-485 Physical Layer
↓
Modbus Protocol Meaning
```

避免把“线没通”和“寄存器地址错”混在一起。

## 每条正式闭环在训练什么

```text
UART
software config → frame → real bit time → receiver sampling

I²C
electrical idle → address/RW → ACK → device state

SPI
CS → CPOL/CPHA → sample edge → bit order → device timing

ADC
Vin / Vref → sampling → quantization → raw code → software value

DMA
peripheral event → request → transfer contract → memory → completion

CAN
ID/arbitration + controller → transceiver → bus → peer → ACK

RS-485
UART → transceiver → DE/RE → A/B → remote node

Modbus
manual label → API value → PDU address → actual bytes → data meaning
```

## Interactive Labs

- [UART Frame Visualizer](../../03-Interactive-Labs/UART-Frame-Visualizer/)
- [I²C Bus Visualizer](../../03-Interactive-Labs/I2C-Bus-Visualizer/)
- [SPI Timing Playground](../../03-Interactive-Labs/SPI-Timing-Playground/)
- [ADC Sampling Simulator](../../03-Interactive-Labs/ADC-Sampling-Simulator/)
- [DMA Transfer Simulator](../../03-Interactive-Labs/DMA-Transfer-Simulator/)
- [CAN Arbitration Visualizer](../../03-Interactive-Labs/CAN-Arbitration-Visualizer/)
- [RS-485 Half-Duplex Visualizer](../../03-Interactive-Labs/RS485-Half-Duplex-Visualizer/)
- [Modbus RTU Frame Builder](../../03-Interactive-Labs/Modbus-Frame-Builder/)

## 综合验证

完成 8 个单主题 Mission 后，按下面顺序继续：

1. [Stage 03 Mixed Peripheral Debug Challenge](../../06-Debugging-Cases/Stage-03-Mixed-Peripheral-Failures/CASE.md)
2. [Multi-Peripheral Sensor Node Boss](../../05-Projects/Beginner/Stage-03-Boss-Sensor-Node/PROJECT.md)
3. [Stage 03 Exit Check](EXIT-CHECK.md)

完整闭环：

```text
8 Missions
→ topic Debug Cases
→ Mixed Challenge
→ Boss
→ Exit Check
→ Stage 04 Debug Hunter
```

综合阶段的重点不是“同时打开八个外设”，而是面对一个陌生现象时，能快速选择最高信息量的证据。

## Stage 03 最终完成标准

学习者至少能够：

- UART：从 bit time / frame / clock / wiring 定位乱码；
- I²C：从 SDA/SCL / Address / ACK / Pull-up 定位 No ACK；
- SPI：从 CS / Clock / CPOL / CPHA / bit order 定位错误数据；
- ADC：从输入电压、Vref、采样和噪声解释数字码；
- DMA：从 request、address、length、buffer、completion 调查搬运问题；
- CAN：区分 Arbitration、ACK、Controller、Transceiver 与真实总线；
- RS-485：证明 UART、方向控制和 A/B 差分链；
- Modbus：区分物理通信、Frame、地址映射和数据语义；
- 在综合项目里留下 Software Evidence + Physical Evidence + Root Cause + Regression。

当前 Stage 03 内容已进入最终质量验收。通过 Exit Check 后进入 [Stage 04 — Debug Hunter](../Stage-04-Debug-Hunter/README.md)。
