# Stage 03 — Peripheral Engineer / 外设工程师

## 核心目标

Stage 02 已经建立真实 MCU 基础：Build / Flash / Debugger / GPIO / Interrupt / Timer / PWM / Pin / Voltage。

Stage 03 不再重复这些基础，而是让 MCU 和更多外部设备通信、采样、搬运数据，并训练同一个跨层调查方法。

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

PWM 基础已经属于 Stage 02；Stage 03 只在综合项目中复用，不重新作为独立主题教学。

---

## Stage 03 的统一调查模型

不管外设名字是什么，都先放回这条链：

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

因此 Stage 03 不是“八套 API 教程”，而是不断换场景训练同一种证据驱动方法。

---

## Entry Requirements

进入前应完成 Stage 02 Exit Check，并至少会使用：

- Debugger：证明程序、寄存器和 Buffer 状态；
- Schematic / Datasheet：确认 Pin、连线、时序和器件要求；
- Multimeter：测静态电压；
- Oscilloscope：测真实电压、周期和波形；
- Logic Analyzer：观察数字总线和协议时序。

如果 GPIO 不工作时仍然主要靠“换一份代码”，建议先回 Stage 02。

---

## Mission Map

1. [UART Garbled — 乱码到底从哪一层开始？](../../04-Missions/Stage-03-Peripherals/01-UART-Garbled/Mission.md) ✅
2. [I²C No ACK — 地址明明对，为什么设备不回答？](../../04-Missions/Stage-03-Peripherals/02-I2C-No-ACK/Mission.md) ✅
3. [SPI Wrong Data — 四根线都有波形，为什么数据还是错的？](../../04-Missions/Stage-03-Peripherals/03-SPI-Wrong-Data/Mission.md) ✅
4. [ADC Jitter — 读数一直抖，应该先滤波吗？](../../04-Missions/Stage-03-Peripherals/04-ADC-Jitter/Mission.md) ✅
5. [DMA No Transfer — 初始化成功，为什么 Buffer 一个字节都没变？](../../04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md) ✅
6. [CAN Arbitration — 三个节点同时发送，谁能继续？](../../04-Missions/Stage-03-Peripherals/06-CAN-Arbitration/Mission.md) ✅
7. [RS-485 No Reply — UART 发了，A/B 总线为什么没回应？](../../04-Missions/Stage-03-Peripherals/07-RS485-No-Reply/Mission.md) ✅
8. [Modbus Wrong Register — 通信明明通了，为什么读错参数？](../../04-Missions/Stage-03-Peripherals/08-Modbus-Wrong-Register/Mission.md) ✅

学习顺序中特别保留：

```text
RS-485 Physical Layer
↓
Modbus Protocol Meaning
```

避免把“线没通”和“寄存器地址错”混成同一类故障。

---

## Completed Formal Loops

### UART

```text
UART Knowledge
→ UART Frame Visualizer
→ Garbled Mission
→ 0x55 real TX bit-time measurement
→ Baud / Clock / Frame / Wiring faults
→ UART Garbled Debug Case
```

核心：`software says 115200 ≠ physical TX really is 115200`。

### I²C

```text
I²C Knowledge
→ Bus Visualizer
→ No ACK Mission
→ SDA/SCL idle + Address/ACK evidence
→ Pull-up / Power / Address / timing faults
→ I²C No ACK Debug Case
```

核心：先证明合法电气总线，再解释 Address / ACK。

### SPI

```text
SPI Knowledge
→ Timing Playground
→ Wrong Data Mission
→ Datasheet timing vs raw waveform
→ CPOL / CPHA / bit order / CS faults
→ SPI Wrong Mode Debug Case
```

核心：`waveform exists ≠ sampling rule matches the device`。

### ADC

```text
ADC Knowledge
→ Sampling Simulator
→ Jitter Mission
→ Vin + Vref + raw-code evidence
→ input/reference/sampling faults
→ ADC Unstable Reference Debug Case
```

核心：不要先用平均滤波掩盖模拟或参考问题。

### DMA

```text
DMA Knowledge
→ Transfer Simulator
→ No Transfer Mission
→ Request + contract + memory evidence
→ direction/count/capacity faults
→ DMA Wrong Length Debug Case
```

核心：`DMA Complete ≠ configuration correct ≠ memory safe`。

### CAN

```text
CAN Knowledge
→ 3-node Arbitration Visualizer
→ Arbitration Mission
→ Controller / Transceiver / CAN_H-L evidence
→ ID / Bit Timing / Peer / ACK faults
→ CAN No-ACK Debug Case
```

核心：正常失去仲裁不是通信故障；赢得仲裁也不等于有人 ACK。

### RS-485

```text
RS-485 / Modbus Knowledge
→ Half-Duplex Visualizer
→ RS-485 No Reply Mission
→ UART / DE-RE / A-B / peer evidence
→ direction / peer / bus-condition faults
→ RS-485 Direction Debug Case
```

核心：`UART bytes correct ≠ RS-485 physical bus correct`。

### Modbus RTU

```text
RS-485 / Modbus Knowledge
→ Modbus Frame Builder
→ Wrong Register Mission
→ actual request/response bytes
→ slave/function/address/quantity faults
→ Modbus Wrong Register Debug Case
```

核心：`Manual register number ≠ API value ≠ PDU address ≠ actual bytes`。

---

## Interactive Labs

- [UART Frame Visualizer](../../03-Interactive-Labs/UART-Frame-Visualizer/)
- [I²C Bus Visualizer](../../03-Interactive-Labs/I2C-Bus-Visualizer/)
- [SPI Timing Playground](../../03-Interactive-Labs/SPI-Timing-Playground/)
- [ADC Sampling Simulator](../../03-Interactive-Labs/ADC-Sampling-Simulator/)
- [DMA Transfer Simulator](../../03-Interactive-Labs/DMA-Transfer-Simulator/)
- [CAN Arbitration Visualizer](../../03-Interactive-Labs/CAN-Arbitration-Visualizer/)
- [RS-485 Half-Duplex Visualizer](../../03-Interactive-Labs/RS485-Half-Duplex-Visualizer/)
- [Modbus RTU Frame Builder](../../03-Interactive-Labs/Modbus-Frame-Builder/)

---

## 单主题结束后还没有完成 Stage 03

下一步必须组合这些能力：

```text
8 Missions
↓
Stage 03 Mixed Peripheral Debug Challenge
↓
Multi-Peripheral Sensor Node Boss
↓
Stage 03 Exit Check
↓
Stage 04 — Debug Hunter
```

综合阶段的重点不是“同时打开八个外设”，而是面对一个陌生现象时，能快速选择最高信息量的证据。

---

## Boss Project

[Multi-Peripheral Sensor Node](../../05-Projects/Beginner/Stage-03-Boss-Sensor-Node/PROJECT.md)

Boss 会组合少量代表性外设，不要求为了覆盖率把所有总线硬塞进一个工程。

---

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
- 在综合项目里留下软件证据 + 物理证据 + Root Cause + Regression。

完成综合验证后进入 [Stage 04 — Debug Hunter](../Stage-04-Debug-Hunter/README.md)。