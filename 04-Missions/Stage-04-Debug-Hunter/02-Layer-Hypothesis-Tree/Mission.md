# Mission 02 — Layer & Hypothesis Tree：别列二十个原因，先把问题切成几层

> 学习路径：[Stage 04 — Debug Hunter](../../../02-Learning-Path/Stage-04-Debug-Hunter/README.md) · 方法：[Evidence-Driven Debugging](../../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)

## Mission Brief

你收到一句问题描述：

> “设备通信不稳定，有时候收不到数据。”

团队很快列出了一堆可能性：

```text
Clock
Driver bug
Cable
Buffer
Device address
Interrupt
Power
Protocol
DMA
PC software
```

每一项都“有可能”，但这张清单几乎没有告诉你下一步该做什么。

这一关训练的是把无序猜测变成：

```text
System Layer Map
↓
Hypothesis Tree
↓
Measurement that can eliminate a whole branch
```

---

## Before You Start

第一次认识：

- Layer Map：数据、信号或控制实际经过哪些系统层；
- Hypothesis：对现象的一种可验证解释；
- Hypothesis Tree：按照层级组织假设，让一条证据可以排除一整组可能；
- Boundary：两个系统层之间的边界，例如 Driver → Peripheral、Pin → Cable；
- Binary Split：一次证据把调查方向明显分成两个分支，例如“Pin 有波形 / 没波形”。

这不是要求所有故障都画漂亮的树，而是训练：**别让假设停留在脑子里的一团列表。**

---

## 1. Symptom First — 先把问题描述精确

把：

```text
设备通信不稳定
```

改写成至少包含：

```text
Expected:
Observed:
When:
Which direction:
How often:
What still works:
```

例如：

```text
Expected: MCU every 100 ms sends one 16-byte frame to PC
Observed: about 1 in 50 frames is missing at PC
Still works: MCU main loop and heartbeat LED continue
Physical link: not measured yet
```

现在才开始画 Layer Map。

---

## 2. Draw the Data Path

先不猜根因，只画数据真正经过哪里：

```text
Application Data
↓
TX Buffer
↓
Driver / Peripheral
↓
TX Pin
↓
Electrical Link
↓
Receiver Pin
↓
Receiver Peripheral / Driver
↓
RX Buffer
↓
PC Application
```

不同系统可以换成：

```text
Sensor Voltage
→ ADC
→ DMA
→ RAM Buffer
→ Processing
```

或者：

```text
Button
→ GPIO
→ Interrupt
→ ISR
→ Shared State
→ Main Logic
```

关键不是模板，而是把“现实中的路径”画出来。

---

## 3. Find the Boundaries

每两个层之间都可以成为一个调查边界：

```text
Application → Driver
Driver → Peripheral
Peripheral → Pin
Pin → Physical Link
Physical Link → Receiver
Receiver → Application
```

问：

> 如果我能证明这个边界左边正确、右边错误，范围会缩小多少？

这就是为什么 Stage 02/03 反复测 Register、Pin、Waveform、Remote Response。

---

## 4. Build a Hypothesis Tree

针对：

```text
PC misses frames
```

不要直接列 15 个原因。

先按层：

```text
Missing Frame
├─ Source side never produced it
│  ├─ application timing
│  └─ buffer / state
├─ MCU produced but did not transmit it
│  ├─ driver / peripheral
│  └─ interrupt / DMA
├─ Physical transmission was corrupted
│  ├─ timing / clock
│  └─ electrical / wiring
└─ Receiver got it but application lost it
   ├─ RX buffer
   └─ PC parsing / logging
```

现在每个测量都有明确目标。

---

## 5. Choose a Split — 哪条证据能一次砍掉半棵树？

候选测量：

```text
A. 在十几个函数里加 printf
B. 在 MCU TX Pin 抓丢帧时刻附近的真实波形
C. 随机换一根线
D. 重写发送函数
```

如果能可靠触发并关联具体 frame sequence，TX Pin 上“该帧存在 / 不存在”会把问题明显分成：

```text
MCU side
vs
physical/receiver side
```

这就是高信息量 Boundary Measurement。

---

## 6. Practice A — LED 不亮

Stage 02 已经做过这个问题，现在不要再写 GPIO API。

画出：

```text
Application State
→ GPIO Clock/Mode
→ Output Register
→ Pin Voltage
→ Board Circuit
→ LED
```

然后为：

```text
LED = OFF
```

建立至少三层 Hypothesis Tree。

最后选一条第一优先测量，并写：

```text
If result A → eliminate ...
If result B → eliminate ...
```

---

## 7. Practice B — DMA Buffer 没变化

画出：

```text
Peripheral Event
→ DMA Request
→ DMA Config
→ Memory Write
→ Buffer Observation
```

然后区分：

```text
Peripheral never generates event
DMA never receives request
DMA transfer contract wrong
DMA writes elsewhere
Buffer changed but observation method wrong
```

问：哪个状态/地址最适合作为第一 Boundary Evidence？

---

## 8. Practice C — Modbus Timeout

故意把 Protocol 和 Physical 分层：

```text
Application request
→ Modbus bytes
→ UART
→ RS-485 Transceiver
→ A/B request waveform
→ Peer
→ A/B response waveform
→ UART RX
→ Modbus parse
```

如果 A/B 上连请求波形都没有：

```text
Register 40001 mapping
```

是否还是高优先级假设？为什么？

---

## 9. Break It — 让你的 Hypothesis Tree 失败

### Anti-pattern A — 按文件名分层

```text
main.c
uart.c
driver.c
utils.c
```

这不是系统层。文件组织并不等于真实信号路径。

### Anti-pattern B — 一条假设解释所有东西

例如：

```text
“可能是时序问题。”
```

要求继续细化：

```text
哪一段时序？
什么结果会支持？
什么结果会反驳？
```

### Anti-pattern C — 不允许假设被否定

如果每个新证据都能被解释成“还是可能是这个原因”，那它不是一个有用的可验证假设。

---

## 10. Evidence Update — 测完以后必须更新树

假设你测到：

```text
MCU TX pin contains the missing frame correctly
```

那么应明确写：

```text
Eliminated / reduced:
- application did not generate frame
- MCU TX buffer lost it
- transmitter never emitted it

Still plausible:
- physical corruption after measurement point
- receiver-side loss
- PC application loss
```

不要测完以后还保留原来所有猜测。

---

## 11. Transfer — 新设备也可以先画 Layer Map

以后遇到从没学过的外设，不要先问：

```text
“它常见 bug 有哪些？”
```

先问：

```text
Input / Data 从哪来？
经过哪些硬件/软件层？
最终在哪里可观察？
每个 Boundary 能测什么？
```

这就是从“经验型排错”升级到“结构化排错”。

---

## 12. Mission Report

任选一个真实或模拟故障，提交：

```text
Precise Symptom:
Expected:
System Layer Map:
Important Boundaries:
Hypothesis Tree:
First measurement:
Why it has high information value:
Possible result A → what gets eliminated:
Possible result B → what gets eliminated:
Actual evidence:
Updated hypothesis tree:
Next measurement:
```

## Achievement Unlocked

完成后，你应该从：

```text
“我能想到很多可能原因”
```

升级到：

```text
“我能组织这些原因，并用一次测量排除一整层。”
```

下一关：**Mission 03 — Choose the Measurement**。