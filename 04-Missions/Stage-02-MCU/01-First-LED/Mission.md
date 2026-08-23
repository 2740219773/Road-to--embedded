# Mission 01 — First LED：代码执行了，灯为什么没亮？

> 学习路径：[Stage 02 — MCU Rookie](../../../02-Learning-Path/Stage-02-MCU-Rookie/README.md) · 知识支撑：[GPIO](../../../01-Knowledge-Base/MCU/01-GPIO.md) · [Clock Tree](../../../01-Knowledge-Base/MCU/05-Clock-Tree.md) · [Debugger Basics](../../../01-Knowledge-Base/MCU/06-Debugger-Basics.md)

## Mission Brief

你已经通过 Mission 00 证明：Firmware 能 Build、Flash，MCU 能 Reset、Run，Breakpoint 也能命中。

现在你让开发板上的 LED 点亮，但它没有任何反应。

这关不是“抄一份 LED 代码”，而是第一次把 Stage 01 的寄存器模型接到真实 Pin 和真实 Voltage。

---

## 0. Before You Start

如果第一次看到这些词，先建立最小概念：

- GPIO：MCU 上可以作为数字输入/输出使用的引脚资源；
- Pin：芯片真正连接到外部电路的物理引脚；
- Peripheral Clock：很多外设工作前需要先获得时钟；
- Output Register：保存 GPIO 输出状态的硬件寄存器；
- Schematic：原理图，用来说明 LED 到底接在哪个 Pin、怎样接线；
- Multimeter：万用表，可以测静态电压；
- Oscilloscope：示波器，可以观察随时间变化的电压波形。

先读：

- [GPIO](../../../01-Knowledge-Base/MCU/01-GPIO.md)
- [Clock Tree](../../../01-Knowledge-Base/MCU/05-Clock-Tree.md)
- [Debugger Basics](../../../01-Knowledge-Base/MCU/06-Debugger-Basics.md)

---

## 1. Predict

先不要修改代码。

如果你看到：

```text
GPIO Output Register bit = 1
Pin Voltage = 0V
LED = OFF
```

最值得优先怀疑哪一层？

不要只写“GPIO 配错了”，而要尽量具体：

```text
Program / Clock / Mode / Output Register / Pin / LED Circuit
```

---

## 2. Observe — 先证明每一层

按照顺序建立证据：

```text
Firmware Running?
→ GPIO Clock Enabled?
→ Pin Mode = Output?
→ Output Register changed?
→ Pin Voltage changed?
→ LED Circuit matches expectation?
```

### Step A — Firmware Running

在 GPIO 初始化之后设置 Breakpoint。

如果能命中，说明至少：

```text
Build → Flash → Reset → Run → reached GPIO setup
```

### Step B — Peripheral Clock

查看对应 GPIO 外设的 Clock Enable 状态。

如果没有时钟，后续配置寄存器可能不会按预期工作。

### Step C — Pin Mode

确认目标 Pin 真的被配置成 Output，而不是 Input / Alternate Function / Analog。

### Step D — Output Register

让程序先写 Low，再写 High，观察 Output Register 对应 bit 是否跟着变化。

### Step E — Pin Voltage

这一步第一次离开纯软件世界。

用万用表测：

```text
Low command  → Pin ≈ ? V
High command → Pin ≈ ? V
```

不要只看 LED 是否亮。

### Step F — LED Circuit

打开开发板 Schematic，确认：

- LED 接在哪个 Pin；
- LED 是 Active High 还是 Active Low；
- 是否经过三极管/驱动器；
- Pin 名称和 Board Silk Screen 是否与你想象的一样。

Active Low 可以先理解成：GPIO 输出 Low 时 LED 才亮。

---

## 3. Explain — 信号到底走了哪条路

画出自己的真实开发板链路：

```text
C Code
↓
GPIO Register
↓
GPIO Peripheral
↓
Physical Pin
↓
Voltage
↓
Board Circuit
↓
LED
```

然后指出每一层你用什么证据验证。

---

## 4. Break It — 主动制造四种不同故障

一次只制造一个：

1. 关闭 GPIO Peripheral Clock；
2. 把 Pin 配成 Input；
3. 写错 Pin；
4. 把 LED 极性逻辑反过来。

每次记录：

```text
Register evidence:
Pin voltage:
LED behavior:
Root cause:
```

重点观察：不同故障虽然最终都表现为“LED 不亮”，但中间证据完全不同。

---

## 5. Debug — 不允许靠换代码定位

收到一个“LED 不亮”的工程时，按下面顺序调查：

```text
1. Breakpoint proves firmware reached setup?
2. Clock enabled?
3. Mode correct?
4. Register changes?
5. Pin voltage changes?
6. Schematic says what?
```

如果第 4 步正确而第 5 步错误，就不要继续在应用逻辑里乱改代码。

如果第 5 步正确但 LED 仍不亮，则重点已经移动到 Board Circuit / LED Polarity。

---

## 6. Transfer — 把 Stage 01 接到真实硬件

Stage 01 里你学过：

```c
REG32(addr) |= (1U << 5);
```

现在这句思想上的链路真正变成：

```text
Address
→ Pointer
→ Register Bit
→ GPIO Hardware
→ Physical Pin
→ Voltage
→ LED
```

这就是从 Embedded C 进入真实 MCU 的第一座桥。

---

## 7. Mission Report

提交一页证据记录：

```text
Board / MCU:
LED pin:
LED polarity:
Breakpoint evidence:
Clock evidence:
Mode evidence:
Output register Low/High:
Measured pin voltage Low/High:
One injected fault:
How I found root cause:
```

---

## Achievement Unlocked

完成后，“LED 不亮”不再是一个模糊问题，而是一个可以逐层缩小范围的问题。

你已经真正建立：

```text
Software State
→ Register State
→ Pin State
→ Electrical State
```

下一关进入 **Button / External Interrupt**：让真实世界第一次主动打断 CPU。