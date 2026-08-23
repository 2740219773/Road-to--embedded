# Stage 02 — MCU Rookie / MCU 新兵

## 这一阶段的目标

第一次把“代码 → 寄存器 → 引脚 → 真实硬件”完整跑通。

学习者不以背 HAL API 为目标，而要理解 MCU 的最小运行系统以及 GPIO、Clock、Interrupt、Timer 等基础资源如何协作。

## 先认识这些核心知识

- [GPIO](../../01-Knowledge-Base/MCU/01-GPIO.md)
- [Interrupt](../../01-Knowledge-Base/MCU/02-Interrupt.md)
- [Timer & PWM](../../01-Knowledge-Base/MCU/03-Timer-PWM.md)
- [Clock Tree](../../01-Knowledge-Base/MCU/05-Clock-Tree.md)

不要求先把四篇全部读完；Mission 遇到概念时再回来查。

## 当前 Mission

- [第一盏 LED：代码执行了，灯为什么没亮？](../../04-Missions/Stage-02-MCU/01-First-LED/Mission.md)

## Boss Project

- [GPIO Control Node](../../05-Projects/Beginner/Stage-02-Boss-GPIO-Controller/PROJECT.md)

## 推荐学习闭环

```text
先理解 GPIO 最小模型
→ 真机点灯
→ 故意关闭时钟 / 配错 Pin / 反转 LED 极性
→ 用 Debugger + 万用表/示波器定位
→ Timer 驱动非阻塞行为
→ 完成 GPIO Control Node
```

## 完成标准

- 能解释 MCU 最小系统；
- 能理解 GPIO 输入/输出和寄存器配置；
- 能区分轮询与中断；
- 能使用 Debugger 观察变量和寄存器；
- LED 不亮时能按证据排查，而不是只反复改代码。

完成后进入 [Stage 03 — Peripheral Engineer](../Stage-03-Peripheral-Engineer/README.md)。