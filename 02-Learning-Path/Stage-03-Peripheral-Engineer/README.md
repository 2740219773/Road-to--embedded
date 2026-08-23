# Stage 03 — Peripheral Engineer / 外设工程师

## 核心目标

Stage 02 已经完成真实 MCU 基础底座：Build / Flash / Debugger / GPIO / Interrupt / Timer / PWM / Pin / Voltage。

Stage 03 不再重复这些基础，而是让 MCU 真正开始和更多外部设备通信、采样和协作。

主线：

```text
UART ✅
→ I²C ✅
→ SPI ✅
→ ADC ✅
→ DMA ✅
→ CAN ← current
→ RS-485 / Modbus
```

PWM 可以在综合项目中复用，但基础概念和真机测量已经属于 Stage 02，不再在这里重复作为独立主线。

## Stage 03 的统一调查模型

每个新外设都放回同一条链：

```text
Application / Data
→ Peripheral Configuration
→ Clock / Timing
→ Register / Driver State
→ Pin / Bus
→ Electrical Signal
→ External Device
→ Protocol / Data Meaning
```

因此 Stage 03 不是“七套互不相关的 API 教程”，而是在重复训练同一种跨层调查方法。

## Entry Requirements

进入前应完成 Stage 02 Exit Check，并能熟练使用：

- Debugger：证明程序和寄存器状态；
- Schematic / Datasheet：确认 Pin、连接和器件关系；
- Multimeter：测静态电压；
- Oscilloscope：测真实时序/波形；
- Logic Analyzer：观察数字总线与协议时序。

如果 GPIO 不工作时仍然只会替换代码，建议先回 Stage 02。

## Mission Map

1. [UART Garbled — 乱码到底从哪一层开始？](../../04-Missions/Stage-03-Peripherals/01-UART-Garbled/Mission.md) ✅
2. [I²C No ACK — 地址明明对，为什么设备不回答？](../../04-Missions/Stage-03-Peripherals/02-I2C-No-ACK/Mission.md) ✅
3. [SPI Wrong Data — 四根线都有波形，为什么数据还是错的？](../../04-Missions/Stage-03-Peripherals/03-SPI-Wrong-Data/Mission.md) ✅
4. [ADC Jitter — 读数一直抖，应该先滤波吗？](../../04-Missions/Stage-03-Peripherals/04-ADC-Jitter/Mission.md) ✅
5. [DMA No Transfer — 初始化成功，为什么 Buffer 一个字节都没变？](../../04-Missions/Stage-03-Peripherals/05-DMA-No-Transfer/Mission.md) ✅
6. [CAN Arbitration — 两个节点同时说话，为什么没有撞车？](../../04-Missions/Stage-03-Peripherals/06-CAN-Arbitration/Mission.md) — current
7. [Modbus 通了，为什么读到的寄存器不对？](../../04-Missions/Stage-03-Peripherals/07-Modbus-Wrong-Register/Mission.md)

现有后续 Mission 仍有一部分是 V2.1 的 vertical-slice prototype。Phase B 会按上面顺序逐个正式化，而不是同时重写全部页面。

## Completed Formal Loops

### UART

```text
UART Knowledge
→ UART Frame Visualizer
→ UART Garbled Mission
→ Real 0x55 TX waveform measurement
→ Baud / Clock / Frame / Wiring failure injection
→ UART Garbled Debug Case
→ Mission Report
```

### I²C

```text
I²C Knowledge
→ I²C Bus Visualizer
→ I²C No ACK Mission
→ SDA/SCL idle + Address/ACK measurement
→ Pull-up / Power / Address / timing failure injection
→ I²C No ACK Debug Case
→ Mission Report
```

### SPI

```text
SPI Knowledge
→ SPI Timing Playground
→ SPI Wrong Data Mission
→ Datasheet timing vs raw SCLK/MOSI/MISO/CS
→ CPOL / CPHA / bit-order / CS / speed failure injection
→ SPI Wrong Mode Debug Case
→ Mission Report
```

### ADC

```text
ADC Knowledge
→ ADC Sampling Simulator
→ ADC Jitter Mission
→ Multimeter Vin + Vref + raw-code measurement
→ Vin / Vref / sampling / digital-coupling failure injection
→ ADC Unstable Reference Debug Case
→ Mission Report
```

### DMA

```text
DMA Knowledge
→ DMA Transfer Simulator
→ DMA No Transfer Mission
→ Peripheral event + request + memory evidence
→ Request / direction / count / increment / interrupt failure injection
→ DMA Wrong Length Debug Case
→ Mission Report
```

核心能力：能区分 DMA 没启动、搬运规则错误、越界写和“搬运正确但完成通知没来”；明确 `DMA Complete ≠ memory safe`。

## Interactive Labs

- [UART Frame Visualizer](../../03-Interactive-Labs/UART-Frame-Visualizer/)
- [I²C Bus Visualizer](../../03-Interactive-Labs/I2C-Bus-Visualizer/)
- [SPI Timing Playground](../../03-Interactive-Labs/SPI-Timing-Playground/)
- [ADC Sampling Simulator](../../03-Interactive-Labs/ADC-Sampling-Simulator/)
- [DMA Transfer Simulator](../../03-Interactive-Labs/DMA-Transfer-Simulator/) — request / direction / count / capacity / overflow
- [CAN Arbitration Visualizer](../../03-Interactive-Labs/CAN-Arbitration-Visualizer/)
- [Modbus Frame Builder](../../03-Interactive-Labs/Modbus-Frame-Builder/)

`PWM Visualizer` 仍可作为 Stage 02 PWM 的辅助工具复用，但不属于 Stage 03 的新增主题。

## Boss Project

- [Multi-Peripheral Sensor Node](../../05-Projects/Beginner/Stage-03-Boss-Sensor-Node/PROJECT.md)

Phase B 后期会重新审计 Boss，确保它组合的是已经正式完成的 Stage 03 能力，而不是简单堆更多外设。

## 完成标准

Stage 03 最终不是“每个 API 都调用过”，而是至少能够：

- UART：从 bit time / frame / clock / wiring 定位乱码；
- I²C：从 SDA/SCL / Address / ACK / Pull-up 定位 No ACK；
- SPI：从 CS / Clock / CPOL / CPHA / bit order 定位错误数据；
- ADC：从输入电压、参考、采样与噪声解释数字码；
- DMA：从 request、address、length、buffer、completion 调查搬运问题；
- CAN / RS-485 / Modbus：区分控制器、收发器、物理总线与协议语义；
- 完成一个多外设数据采集节点，并留下真实证据链。

完成后进入 [Stage 04 — Debug Hunter](../Stage-04-Debug-Hunter/README.md)。