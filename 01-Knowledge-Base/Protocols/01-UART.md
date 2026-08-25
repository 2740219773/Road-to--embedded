# UART — MCU 与 PC 的第一次串行对话

## 先用一句人话理解

UART 可以先理解成：**两个设备提前约定好速度和帧格式，然后通过一根发送线、一根接收线，一位一位地传数据。**

最常见的实验连接是：

```text
MCU TX  ─────→  USB-to-UART Adapter RX
MCU RX  ←─────  USB-to-UART Adapter TX
MCU GND ──────  Adapter GND
                         ↓
                         PC
```

- TX：Transmit，发送；
- RX：Receive，接收；
- GND：双方共同的电气参考地。

第一次学习 UART，先不要从某个 HAL API 开始，而要把这条链看清楚：

```text
Byte in software
→ UART Peripheral
→ TX Pin waveform
→ Wire / Adapter
→ RX sampling
→ Byte on the other side
```

## UART 在系统哪里

UART 的全称是 Universal Asynchronous Receiver/Transmitter，中文常叫“通用异步收发器”。

它通常是 MCU 内部的一个 Peripheral（外设模块）。CPU 把数据交给 UART 外设，UART 再按照配置自动生成串行波形。

```text
CPU / Program
↓
UART Register / Driver State
↓
UART Hardware
↓
TX / RX Pin
↓
Electrical Signal
```

这和 Stage 02 的 GPIO 思路是一致的：软件配置只是起点，最终还要落到真实 Pin 和真实电压。

## “异步”是什么意思

UART 两端通常没有额外的一根共享 Clock 线。

所以双方必须提前约定：

> 每一个 bit 应该持续多长时间？

这就是 Baud Rate 最重要的作用。

例如 115200 Baud，在常见 UART 场景里可以先近似理解成每秒 115200 个 bit：

```text
bit time ≈ 1 / 115200
         ≈ 8.68 µs
```

如果发送端真实 bit time 约 17.36 µs，那么真实速率更接近 57600，而不是 115200。

## 一帧数据长什么样

最常见的入门格式是 8N1：

```text
Idle → Start → D0 D1 D2 D3 D4 D5 D6 D7 → Stop
```

其中：

- 8：8 个 Data Bits；
- N：No Parity，没有校验位；
- 1：1 个 Stop Bit；
- LSB first：通常最低有效位先发送。

UART Line 在空闲时通常保持 High。发送开始时先出现一个 Low 的 Start Bit，接收端用这个变化判断“一帧开始了”。

## 为什么推荐用 `0x55`

`0x55` 的二进制是：

```text
01010101
```

因为数据位不断交替，TX 波形会产生很多规则边沿，所以很适合：

- 在示波器上测 bit time；
- 在逻辑分析仪上检查帧结构；
- 观察 Baud Rate 是否正确。

这比持续发送全 0 或全 1 更容易观察。

## 接收端为什么会解错数据

UART 接收端通常在检测到 Start 后，按照自己认为的 bit time 去各个数据位中间附近采样。

如果 TX 和 RX 的 Baud 不一致：

```text
TX bit boundary: |----|----|----|----|----|
RX sample:          ^    ^     ^      ^
                         drift →
```

采样点会逐渐漂移，最后可能读到相邻 bit，甚至 Stop Bit 检查失败。

所以“乱码”不是一个神秘的软件现象，而可能是**物理采样时刻已经错位**。

## UART Frame Visualizer

进入 [UART Frame Visualizer](../../03-Interactive-Labs/UART-Frame-Visualizer/README.md)。

推荐先做：

```text
Byte = 0x55
TX Baud = 115200
RX Baud = 115200
```

然后只把 RX 改成 57600。

观察每个 RX sample 实际落到了 TX 的哪一位。

这一步是进入真机前的直觉训练。

## UART、TTL、RS-232、RS-485 是不是一回事

不是。

可以先按层区分：

```text
UART
→ MCU 内部如何组织和收发串行 bit

Logic-level UART / TTL-like level
→ MCU Pin 上常见的 3.3 V / 5 V 数字电平形式

RS-232
→ 另一套串行电气标准

RS-485
→ 差分、电缆距离更长、适合多节点的物理层

Modbus
→ 可以运行在串行链路上的更上层协议
```

因此把 MCU 3.3 V UART Pin 直接接到真正的 RS-232 电气接口，可能不仅通信失败，还可能损坏器件。

第一次接线前必须确认双方的电气标准。

## Clock 为什么会影响 UART

程序可能写着：

```text
Baud = 115200
```

但 UART 外设要根据 Peripheral Clock 计算真实 bit time。

如果真实 Clock 与软件假设不同：

```text
Configured Baud
≠
Real TX Baud
```

因此遇到“差一倍、差很多”的 UART 速度问题，要把 Stage 02 的 [Clock Tree](../MCU/05-Clock-Tree.md) 拿回来使用。

## 串口乱码应该怎么分层

不要一上来不停试 Baud Rate。

至少拆成：

```text
1. Firmware running?
2. UART clock / configuration correct?
3. TX Pin really toggling?
4. Bit time matches expected Baud?
5. Frame = 8N1 / other format?
6. Voltage level compatible?
7. TX / RX / GND wired correctly?
8. Sent byte / text encoding really what you think?
9. PC side configured the same way?
```

## 真机最小实验

建议发送重复的 `0x55` 或 ASCII `U`（也是 `0x55`），然后：

1. Debugger 证明发送代码真的执行；
2. 示波器测 TX High / Low 电压；
3. 测一个 bit 的持续时间；
4. 用 `Baud ≈ 1 / bit time` 反推真实 Baud；
5. 再连接 PC 串口工具比较结果。

这样你第一次真正建立：

```text
Software Configuration
→ Peripheral Timing
→ Pin Waveform
→ Instrument Measurement
→ Receiver Interpretation
```

## Learning Loop

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[UART Garbled](../../04-Missions/Stage-03-Peripherals/01-UART-Garbled/Mission.md)
- Interactive Lab：[UART Frame Visualizer](../../03-Interactive-Labs/UART-Frame-Visualizer/README.md)
- Debug Case：[UART Garbled](../../06-Debugging-Cases/UART-Garbled/CASE.md)

Stage 03 的目标不是记住 UART API，而是能拿到一段乱码后，用软件状态和真实 TX 波形把原因逐层缩小。
