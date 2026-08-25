# Stage 02 — MCU Rookie / MCU 新兵

## 当前状态与适合谁

正式阶段。适合通过 Stage 01 Exit Check、能够解释指针/bit/Register 基础的学习者。

## 学习环境与阶段产出

- 环境：MCU 开发板、Debug Probe、编译/烧录工具；万用表和示波器按 Mission 使用。
- 必做产出：五个硬件 Mission Record、一份 Mixed Hardware Debug Record、GPIO Boss 和 Exit Check。
- 必须阅读：当前 Mission 的 Before You Start、板卡原理图和对应芯片手册。
- 选读内容：其他 MCU Knowledge 在遇到对应故障时查询，不要求预读完。

## 这一阶段的目标

第一次把 Stage 01 的“虚拟寄存器”接到真实 MCU：

```text
C Code
→ Firmware
→ MCU CPU
→ Peripheral Register
→ GPIO / Timer Hardware
→ Physical Pin
→ Voltage / Waveform
→ LED / Button / Instrument
```

这一阶段不以背某个芯片厂商库的 API 为目标，例如 STM32 HAL（Hardware Abstraction Layer，硬件抽象层）里的函数名；真正目标是建立真实硬件第一闭环：你不仅知道代码写了什么，还能证明程序已经烧录、CPU 正在运行、寄存器发生变化、引脚真的输出了电压或波形。

## 开始前

先完成 Stage 01 Exit Check。进入 Stage 02 后按需使用：

- [Hardware Setup — 第一次准备开发板](HARDWARE-SETUP.md)
- [Recovery Guide — 新手故障恢复手册](RECOVERY-GUIDE.md)

- [MCU Bring-up](../../01-Knowledge-Base/MCU/00-MCU-Bring-Up.md)
- [GPIO](../../01-Knowledge-Base/MCU/01-GPIO.md)
- [Interrupt](../../01-Knowledge-Base/MCU/02-Interrupt.md)
- [Timer & PWM](../../01-Knowledge-Base/MCU/03-Timer-PWM.md)
- [Clock Tree](../../01-Knowledge-Base/MCU/05-Clock-Tree.md)
- [Debugger Basics](../../01-Knowledge-Base/MCU/06-Debugger-Basics.md)

不要求顺序背完 Knowledge。Mission 先制造问题，再回来查对应概念。

## Mission Map

0. [First Contact — 先证明你真的控制住了 MCU](../../04-Missions/Stage-02-MCU/00-First-Contact/Mission.md)
1. [First LED — 代码执行了，灯为什么没亮？](../../04-Missions/Stage-02-MCU/01-First-LED/Mission.md)
2. [Button Interrupt — 按下按键，CPU 怎么知道？](../../04-Missions/Stage-02-MCU/02-Button-Interrupt/Mission.md)
3. [Timer Tick — 为什么系统不能一直靠 delay 等时间？](../../04-Missions/Stage-02-MCU/03-Timer-Tick/Mission.md)
4. [PWM Measurement — LED 变暗了，就能证明 PWM 配对了吗？](../../04-Missions/Stage-02-MCU/04-PWM-Measurement/Mission.md)

五关形成一条连续能力链：

```text
先证明程序真的跑在板子上
→ 再把一个 bit 变成真实电压
→ 再让外部世界主动输入事件
→ 再让硬件自己管理时间
→ 最后用仪器验证真实波形
```

## 为什么这里暂时不继续加 UART / SPI / I²C

Stage 02 只负责建立“真实 MCU 基础层”。

后续所有外设都依赖同一个底座：

```text
Clock
→ Peripheral
→ Register
→ Pin / Bus
→ Electrical Signal
→ External Device
```

所以 V2.3 Phase A 先把 GPIO / Clock / Debugger / Interrupt / Timer/PWM 做扎实。UART、ADC、SPI、I²C、DMA、CAN、Modbus 在 Stage 03 / V2.3 Phase B 继续扩展。

## 推荐参考平台

课程会以资料丰富、板载调试方便的 STM32 开发板作为主要叙事参考，但不把学习绑定到唯一型号。

真正要求的是你能确定：

```text
我的 MCU 是什么？
我的 Debug Probe 是什么？
LED / Button 接在哪个 Pin？
Pin 对应哪个 GPIO Port？
Timer/PWM 输出在哪个 Pin？
怎样从 Schematic / Board Manual 找到证据？
```

如果另一块开发板能完成相同能力链，它就是有效替代平台。

## Stage 02 综合验证

完成五个 Mission 后，不直接进入 Stage 03：

1. [Stage 02 Mixed Hardware Debug Challenge](../../06-Debugging-Cases/Stage-02-Mixed-Hardware-Failures/CASE.md)
2. [GPIO Control Node Boss](../../05-Projects/Beginner/Stage-02-Boss-GPIO-Controller/PROJECT.md)
3. [Stage 02 Exit Check](EXIT-CHECK.md)

完整闭环：

```text
First Contact
→ First LED
→ Button Interrupt
→ Timer Tick
→ PWM Measurement
→ Mixed Debug Challenge
→ GPIO Control Node Boss
→ Exit Check
→ Stage 03 Peripheral Engineer
```

## 完成标准

- 能区分 Build、Flash、Reset、Run；
- 能使用 Breakpoint 证明 CPU 执行位置；
- 能解释 MCU 最小运行链路；
- 能理解 GPIO 输入/输出和寄存器配置；
- 能从原理图确定 LED/Button 与 Pin 的关系；
- 能用万用表或示波器验证 Pin 电压/波形；
- 能区分 Polling 与 Interrupt；
- 能解释 Button Bounce；
- 能计算 Timer 的 Clock / Prescaler / Period；
- 能测量 PWM Frequency / Duty Cycle；
- 能把软件证据与物理证据放进同一条 Debug 链；
- 硬件不工作时不会只反复替换代码。

完成后进入 [Stage 03 — Peripheral Engineer](../Stage-03-Peripheral-Engineer/README.md)。
