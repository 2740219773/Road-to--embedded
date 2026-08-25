# Stage 02 Hardware Setup — 第一次准备开发板

Stage 02 是本路线第一次进入真实 MCU。不要在没有确认板卡、工具和恢复方法之前直接复制 LED 代码。

## 推荐主路线

课程主路线固定为 **STM32 NUCLEO-F401RE**：

```text
STM32 NUCLEO-F401RE
→ STM32CubeIDE
→ 板载 ST-LINK/V2-1
→ First Contact
→ First LED
→ Button Interrupt
→ Timer Tick
→ PWM Measurement
```

官方资料：[NUCLEO-F401RE 产品页](https://www.st.com/en/evaluation-tools/nucleo-f401re.html) · [UM1724 User Manual](https://www.st.com/resource/en/user_manual/dm00105823-nucleo-f401re-user-manual-stmicroelectronics.pdf)

参考板事实（执行前仍以手册和板卡版本为准）：

- MCU：STM32F401RE；
- 板载 Debug Probe：ST-LINK/V2-1；
- 用户 LED LD2：PA5 / Arduino D13；
- 用户按键 B1：PC13；
- 默认供电：通过 ST-LINK USB 连接供电；
- PWM：优先使用可从定时器 Alternate Function 和板卡引脚复用表确认的空闲引脚，不把 LD2 当作通用 PWM 引脚。

第一次购买或接线时固定记录具体板卡信息：

```text
Board:
MCU:
板载 Debug Probe:
LED 标号与 MCU Pin:
Button 标号与 MCU Pin:
PWM Timer / Channel / Pin:
Board revision:
```

其他板卡也可以使用，但必须先从 User Manual / Schematic 找到同样的信息。不要把 NUCLEO-F401RE 的 Pin 号直接复制过来。

## 最小物品清单

- 开发板；
- 能传输数据的 USB 线；
- 对应 IDE 或 Build Tool；
- 板载或外接 Debug Probe；
- 板卡 User Manual / Schematic；
- 万用表；
- 示波器或逻辑分析仪，按 PWM Mission 再准备。

第一次只需要完成 Build、Flash、Breakpoint 和 LED 证据，不要求一开始买齐所有仪器。

## 第一次准备顺序

```text
确认板卡型号
→ 安装 IDE / 编译工具
→ 安装或确认 Debug Probe 驱动
→ 用 USB 连接开发板
→ 在工具中确认芯片型号
→ 打开官方或课程最小工程
→ Build
→ Flash
→ Reset / Run
→ 在 main 或 while 中命中 Breakpoint
```

第一个可接受的真机证据是：Build 成功、Flash 日志成功、Breakpoint 命中，且能观察到一个变量或寄存器。LED 亮不亮不是第一条证据。

## 没有开发板时

先完成：

```text
MCU Bring-up 阅读
→ Register / GPIO 模型
→ PWM Visualizer
→ Recovery Guide 阅读
→ Learning Record
```

记录必须标注：

```text
软件模型已完成
真实 Pin / Voltage / Waveform 未验证
```

没有开发板时可以学习概念和完成模拟任务，但不能把 Stage 02 Exit Check 标记为完整通过。

## 进入 Mission 00 前必须记录

```text
Board / MCU:
IDE / Build Tool:
Compiler:
Debug Probe:
USB 连接方式:
工程来源:
Build result:
Flash result:
Breakpoint result:
```

## 不同板卡的替换规则

可以替换板卡，但必须重新确认：

1. MCU 型号和 Flash / RAM 信息；
2. Debug Probe 类型和连接方式；
3. LED、Button、PWM 的真实 Pin；
4. LED 是 Active High 还是 Active Low；
5. GPIO、Timer 和 Pin Alternate Function 的对应关系；
6. 电源电压和测量参考地。

只要替换了其中一项，Mission Record 就要重新记录，不能只写“代码一样”。

## 安全边界

- 只在板卡手册允许的电压范围内供电；
- 不确定引脚功能时，不要外接电源或负载；
- 示波器地夹接入前先确认系统的地和隔离关系；
- Stage 02 的目标是低压开发板验证，不连接高压、强电机或未知外部设备。

遇到 Build、Flash、Breakpoint 或 LED 问题时，先看 [硬件故障恢复手册](RECOVERY-GUIDE.md)，再继续 Mission。
