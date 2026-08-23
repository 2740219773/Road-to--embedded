# RS-485 与 Modbus RTU — 先分清“怎么传”和“传什么”

## 先建立最重要的分层

RS-485 和 Modbus RTU 经常一起出现，所以很多新人会把它们当成一个东西。

其实它们解决的是不同问题：

```text
Application wants device data
↓
Modbus RTU
“这些 bytes 表示什么？”
↓
UART
“怎样按时间顺序发送这些 bytes？”
↓
RS-485 Transceiver
“怎样把逻辑信号变成差分总线信号？”
↓
A / B Bus
“真实线路上发生了什么？”
```

可以先把：

- RS-485 理解成“怎么把 0/1 可靠送到线上”；
- Modbus RTU 理解成“这些 0/1 组成的字节是什么意思”。

这也是 Stage 03 为什么先做 Mission 07 RS-485，再做 Mission 08 Modbus。

---

## 1. UART、RS-485、Modbus、Device 四层

### UART

MCU 内部常见的串行收发外设，负责按照 Baud、Data Bits、Stop Bits 等规则产生/接收逻辑字节流。

### RS-485

一种常见差分电气接口标准。工程中通常通过 RS-485 Transceiver 把 UART 逻辑信号转换成 A/B 总线上的差分信号。

### Modbus RTU

运行在串行字节流上的协议格式，定义 Slave Address、Function Code、Register Address、Data、CRC 等字段。

### Device

真正保存参数、状态、测量值或控制量的设备。它最终还会定义自己的 Register Map、单位、缩放系数和数据含义。

因此：

```text
RS-485 works
≠ Modbus request is correct
≠ register mapping is correct
≠ returned value meaning is correct
```

---

## 2. RS-485 为什么常有 A/B 两根线

RS-485 常用 Differential Transmission（差分传输）。

接收端主要关注两根线之间的电压差，而不是只看某一根线对地的电压，因此它很适合工业现场、多节点和较长距离通信。

注意：不同厂商对 A/B、+/- 的命名历史上并不总是完全一致。接线时不要只凭字母猜极性，应以设备 Datasheet / Manual 为准。

---

## 3. Half Duplex 与 Direction Control

很多 RS-485 系统使用 Half Duplex（半双工）：同一组 A/B 线路在某个时刻主要由一方发送。

典型链路：

```text
Enable local TX driver
↓
UART sends request
↓
wait until final byte is physically complete
↓
release bus / switch to receive
↓
remote node sends response
↓
local UART receives bytes
```

很多 Transceiver 有 DE（Driver Enable）和 RE（Receiver Enable）之类的控制引脚，具体极性和连接方式必须查实际器件。

一个高频错误是：

```text
UART software buffer empty
≠ last stop bit already left the pin
```

如果方向切换太早，最后一个字节可能被截断；太晚则可能一直占着总线，让对端没有机会回应。

---

## 4. Termination、Bias 和真实总线条件

真实 RS-485 还可能涉及：

- Termination；
- Bias / fail-safe；
- cable topology；
- transceiver power / standby；
- common-mode range；
- ground/reference relationship。

Stage 03 不要求一次把高速信号完整性学完，但必须建立一个习惯：

> UART TX 上有字节，不等于 A/B 总线条件正常。

所以遇到 Timeout，先看物理事实，再解释协议。

---

## 5. Modbus RTU 一帧里有什么

一个常见 FC03 请求可以简化成：

```text
Slave Address
→ Function Code
→ Start Address
→ Quantity
→ CRC
```

例如：

```text
01 03 00 00 00 02 CRC_LO CRC_HI
```

可以解释成：

```text
Slave = 1
Function = 03 / Read Holding Registers
Start PDU Address = 0
Quantity = 2
CRC = frame check
```

真正调试时，应抓实际 bytes，而不是只看程序里的变量名。

---

## 6. 为什么 40001 经常把新人搞糊涂

一些设备手册使用：

```text
40001
40002
40003
```

表示 Holding Register 的“人类显示编号”。

而 Modbus PDU 中只有一个 16-bit Address Field。

某些常见文档约定里：

```text
Manual 40001
→ PDU Address 0
```

但不同厂商、上位机软件和 API 可能要求不同输入形式。

因此一定要区分：

```text
Manual display number
Software/API input value
PDU address
Actual request bytes
```

不要把“40001 → 0”背成全世界统一规则；应以当前设备手册、软件约定和抓到的 Frame 为证据。

---

## 7. Timeout 和 Exception Response 是两类线索

### Timeout / No Response

优先考虑：

```text
UART bytes really sent?
RS-485 driver enabled?
A/B request exists?
Direction released?
Peer powered?
Slave address correct?
Response waveform exists?
```

### Modbus Exception Response

如果设备返回结构化 Exception，反而说明很多层已经工作：

```text
request reached device
→ frame was understood enough to respond
→ physical response returned
```

这时更应该调查：

```text
Function Code
Address
Quantity
Device state
```

而不是重新检查有没有 A/B 波形。

---

## 8. 推荐互动顺序

先进入：

`03-Interactive-Labs/RS485-Half-Duplex-Visualizer/`

训练：

```text
UART
→ Transceiver
→ DE/RE
→ A/B
→ Remote Node
```

再进入：

`03-Interactive-Labs/Modbus-Frame-Builder/`

训练：

```text
Manual register label
→ PDU Address
→ FC03 Frame
→ Actual bytes
```

---

## 9. Stage 03 的最终排错顺序

遇到“Modbus 读不到设备”时：

```text
1. UART 字节正确吗？
2. RS-485 Transceiver 工作吗？
3. A/B 上有真实请求吗？
4. 半双工 Direction timing 对吗？
5. 对端有真实响应吗？
6. UART 收到响应 bytes 吗？
7. Slave / Function / Address / Quantity / CRC 对吗？
8. Register Map / Scaling / Data Meaning 对吗？
```

越靠前的层没被证明，越不应该直接跳到后面的协议解释。

学习入口：`02-Learning-Path/Stage-03-Peripheral-Engineer/README.md`。