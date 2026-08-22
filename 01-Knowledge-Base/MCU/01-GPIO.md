# GPIO — 从寄存器到真实引脚

GPIO 是最适合第一次把“软件 → 寄存器 → 硬件”连接起来的 MCU 外设。

## 最小模型

```text
C 代码
↓
GPIO 配置/输出寄存器
↓
MCU GPIO 外设逻辑
↓
Pin
↓
高/低电平
↓
LED / Relay / External Device
```

## 需要理解的核心问题

- 输入和输出模式有什么区别？
- Push-Pull 与 Open-Drain 为什么不同？
- Pull-up / Pull-down 解决什么问题？
- 为什么配置 GPIO 前通常需要打开 Peripheral Clock？
- 为什么代码执行了，LED 仍然可能不亮？
- `ODR`、`IDR`、`BSRR` 一类寄存器分别代表什么思想？

## 不建议的学习方式

不要一开始背 STM32 HAL 函数或所有寄存器位。

先完成最小闭环：

```text
设置输出 → 引脚电平变化 → 万用表/示波器观察 → 修改配置 → 观察差异
```

## 故障视角

GPIO 不动作时至少检查：程序是否运行、外设时钟、Pin Mapping、Mode、Output Level、LED 极性、供电和物理连线。

## 推荐表现形式

- Interactive Lab：虚拟 GPIO + LED；
- Mission：第一盏 LED 为什么不亮？
- 真机：开发板 LED + Debugger + 万用表/示波器。

学习入口：`02-Learning-Path/Stage-02-MCU-Rookie/`。