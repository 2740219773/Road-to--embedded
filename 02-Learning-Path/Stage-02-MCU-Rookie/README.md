# Stage 02 — MCU Rookie / MCU 新兵

## 这一阶段的目标

第一次把 Stage 01 的“虚拟寄存器”接到真实 MCU：

```text
C Code
→ Firmware
→ MCU CPU
→ Peripheral Register
→ GPIO Hardware
→ Physical Pin
→ Voltage
→ LED / Button
```

这一阶段不以背 HAL API 为目标，而是建立真实硬件第一闭环：你不仅知道代码写了什么，还能证明程序已经烧录、CPU 正在运行、寄存器发生变化、引脚真的输出了电压。

## 开始前

先完成 Stage 01 Exit Check。进入 Stage 02 后首先认识：

- [MCU Bring-up](../../01-Knowledge-Base/MCU/00-MCU-Bring-Up.md)
- [GPIO](../../01-Knowledge-Base/MCU/01-GPIO.md)
- [Interrupt](../../01-Knowledge-Base/MCU/02-Interrupt.md)
- [Timer & PWM](../../01-Knowledge-Base/MCU/03-Timer-PWM.md)
- [Clock Tree](../../01-Knowledge-Base/MCU/05-Clock-Tree.md)
- [Debugger Basics](../../01-Knowledge-Base/MCU/06-Debugger-Basics.md)

不要求把这些知识页全部顺序读完。Mission 遇到问题时再进入对应 Knowledge。

## 当前 Mission Map

0. [First Contact — 先证明你真的控制住了 MCU](../../04-Missions/Stage-02-MCU/00-First-Contact/Mission.md)
1. [First LED — 代码执行了，灯为什么没亮？](../../04-Missions/Stage-02-MCU/01-First-LED/Mission.md)
2. [Button Interrupt — 按下按键，CPU 怎么知道？](../../04-Missions/Stage-02-MCU/02-Button-Interrupt/Mission.md)
3. Timer Tick — V2.3 planned
4. PWM Measurement — V2.3 planned

V2.3 先把 GPIO / Clock / Debugger / Interrupt / Timer 的主链做扎实。UART、ADC、SPI、I²C、DMA 等放在 Stage 03，不在这一阶段抢跑。

## 推荐参考平台

项目会以资料丰富、板载调试方便的 STM32 开发板作为主要叙事参考，但不把课程绑死在唯一型号。

真正要求的是你能确定：

```text
我的 MCU 是什么？
我的 Debug Probe 是什么？
LED / Button 接在哪个 Pin？
Pin 对应哪个 GPIO Port？
怎样从 Schematic / Board Manual 找到证据？
```

如果另一块开发板能完成相同能力链，它就是有效替代平台。

## 推荐学习闭环

```text
First Contact
→ Build / Flash / Reset / Run / Breakpoint
→ First LED
→ GPIO Clock / Mode / Register / Pin Voltage
→ Button / Interrupt
→ Timer Tick
→ PWM + Oscilloscope
→ Debug Challenge
→ GPIO Control Node Boss
→ Exit Check
```

## Boss Project

- [GPIO Control Node](../../05-Projects/Beginner/Stage-02-Boss-GPIO-Controller/PROJECT.md)

最终不是只要求“LED 会闪”，而是要组合 GPIO Input/Output、Timer、Button、Debugger 和故障证据。

## 完成标准

- 能区分 Build、Flash、Reset、Run；
- 能使用 Breakpoint 证明 CPU 执行位置；
- 能解释 MCU 最小系统；
- 能理解 GPIO 输入/输出和寄存器配置；
- 能从原理图确定 LED/Button 与 Pin 的关系；
- 能用万用表或示波器验证 Pin 电压/波形；
- 能区分 Polling 与 Interrupt；
- 能理解 Timer 为什么比长时间 blocking delay 更适合系统时间逻辑；
- LED 不亮时能按证据排查，而不是只反复替换代码。

完成后进入 [Stage 03 — Peripheral Engineer](../Stage-03-Peripheral-Engineer/README.md)。