# GPIO — 让程序第一次碰到真实世界

## GPIO 到底是什么

GPIO 是 General-Purpose Input/Output，中文通常叫“通用输入输出”。它可以先简单理解成 MCU 芯片上由程序控制的一组引脚。

一个引脚可以被配置成 Input，用来“看外面的电平”；也可以配置成 Output，用来“向外输出高/低电平”。

最直观的例子：

```text
Button → GPIO Input → MCU Program → GPIO Output → LED
```

按键把现实世界的信息送进程序，LED 则让程序的结果重新回到现实世界。

所以 GPIO 是非常适合初学者理解“软件为什么能够控制硬件”的第一站。

## 从代码到 LED 中间发生了什么

```text
C Code
↓
Register（芯片内部的一小块控制状态）
↓
GPIO Hardware
↓
Physical Pin
↓
Voltage High / Low
↓
LED / Relay / Other Device
```

Register（寄存器）暂时可以理解成 MCU 内部的一些“硬件控制格子”。程序修改这些格子，硬件模块就按照里面的设置工作。

## 第一次只需要掌握四件事

1. Input：读取外部高/低电平；
2. Output：主动输出高/低电平；
3. High/Low：通常代表两种电压状态，不等同于抽象的“开/关”；
4. Pin：芯片真正连接到外部电路的物理引脚。

之后再逐步认识 Push-Pull、Open-Drain、Pull-up、Pull-down、Alternate Function 等模式。

## 为什么写了代码 LED 还可能不亮

因为代码只是链路中的第一部分。还可能存在：GPIO 外设时钟没打开、Pin 选错、模式错误、LED 是低电平点亮、没有供电或线路接错。

这也是本项目反复强调“证据链”的原因。

## 第一次真机实验

不要急着背 HAL API 或所有寄存器位。

完成这个闭环就够了：

```text
配置一个 Output
→ 输出 High
→ 测量 Pin 电压
→ 输出 Low
→ 再测一次
→ 连接 LED 并解释结果
```

之后再进入 `04-Missions/Stage-02-MCU/01-First-LED/`，调查“代码执行了，LED 为什么没亮”。