# Stage 02 — MCU Rookie / MCU 新兵

## 这一阶段的目标

第一次把“代码 → 寄存器 → 引脚 → 真实硬件”完整跑通。

学习者不以背 HAL API 为目标，而要理解 MCU 的最小运行系统以及 GPIO、Clock、Interrupt、Timer 等基础资源如何协作。

## 推荐任务

1. Mission：第一盏 LED——代码如何变成引脚电平？
2. Mission：按钮为什么按一次跳好几次？
3. Mission：不用 delay，如何让 LED 定时闪烁？
4. Lab：GPIO Register Playground。
5. Boss：实现一个不阻塞的按钮 + LED 状态控制器。

## 关键知识入口

- `01-Knowledge-Base/MCU/`
- `01-Knowledge-Base/C/`

## 完成标准

- 能解释 MCU 最小系统；
- 能理解 GPIO 输入/输出和寄存器配置；
- 能区分轮询与中断；
- 能使用 debugger 观察变量和寄存器；
- LED 不亮时能按证据排查，而不是只反复改代码。