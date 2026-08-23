# Stage 02 Boss Project — GPIO Control Node

## Navigation

- [Stage 02 — MCU Rookie](../../../02-Learning-Path/Stage-02-MCU-Rookie/README.md)
- [Mission — First LED](../../../04-Missions/Stage-02-MCU/01-First-LED/Mission.md)
- [GPIO Knowledge](../../../01-Knowledge-Base/MCU/01-GPIO.md)
- [Timer & PWM Knowledge](../../../01-Knowledge-Base/MCU/03-Timer-PWM.md)

## 项目目标

做一个最小但完整的 MCU 控制节点：按钮作为输入，LED 作为输出，Timer 提供系统节拍；程序不能依赖长时间阻塞式 delay。

## Requirements

- Button 改变 LED 工作状态；
- 至少两种 LED 模式：常亮 / 周期闪烁；
- Timer 驱动时间逻辑；
- 能处理按钮抖动；
- Debugger 可观察关键状态；
- 提供一份故障定位记录。

## Required Failure Injection

至少主动制造并修复三项：GPIO Clock 未开、Pin Mode 错误、LED 极性理解错误、按钮抖动、Timer 周期错误。

## Acceptance

不仅演示“能工作”，还必须解释：输入如何进入 MCU、状态如何变化、Timer 如何驱动行为、输出寄存器如何影响引脚，以及每个故障如何被证据定位。

## 能力覆盖

C bit operations、GPIO、Interrupt/Polling、Timer、Debugger、Datasheet/Schematic、基本系统调试。
