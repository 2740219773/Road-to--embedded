# Beginner Glossary — 新手术语表

这份术语表不是为了背诵，而是为了让第一次看到某个词时，脑子里先有一个大概位置。

## MCU

Microcontroller Unit，微控制器。可以先理解成“一颗把 CPU、内存和很多常用外设集成在一起的小型计算机芯片”。STM32 就是常见 MCU 家族之一。

## CPU

执行程序指令的核心。它负责计算、判断、读写数据，但很多通信、定时、采样工作会由 MCU 内部专用外设协助完成。

## RAM

程序运行时使用的临时内存。掉电后内容通常消失。

## Flash

用于长期保存程序和部分数据的非易失存储器。MCU 固件通常烧录在 Flash 中。

## Register / 寄存器

在嵌入式上下文中，经常指硬件外设暴露给软件的一小块控制/状态存储位置。程序通过读写寄存器配置 GPIO、UART、Timer 等硬件。

## GPIO

General Purpose Input/Output，通用输入输出。可以把 MCU 某个引脚配置成输入去读高低电平，或配置成输出去控制 LED、继电器等。

## UART

基础串行通信外设。常见 TX/RX 两根主要信号线，用于 MCU 与 PC、模块等传输字节。

## I²C

两线式同步总线，常用 SDA 数据线和 SCL 时钟线，可以让多个带地址的设备挂在同一总线上。传感器、EEPROM 中很常见。

## SPI

同步串行接口，通常有时钟、发送、接收和片选信号。速度高、结构直接，常用于 Flash、ADC、显示屏、传感器等。

## Timer

定时器。它是 MCU 内部会自己按时钟计数的硬件模块，可以用于周期事件、计时、输入捕获、PWM 等。

## PWM

Pulse Width Modulation，脉宽调制。通过快速输出高低电平并改变高电平所占比例，控制 LED 亮度、电机功率等。

## ADC

Analog-to-Digital Converter，模数转换器。把模拟电压转换成程序可处理的数字码值。

## Interrupt / 中断

硬件事件发生时，让 CPU 暂停当前普通流程，转去执行一小段处理代码，完成后再回来。

## ISR

Interrupt Service Routine，中断服务程序。也就是“发生中断后 CPU 去执行的那段函数”。

## DMA

Direct Memory Access。可以先理解成 MCU 内部专门帮 CPU 批量搬数据的硬件搬运工。

## RTOS

Real-Time Operating System。把复杂 MCU 程序拆成多个 Task，并负责调度、同步和任务通信。

## Task

RTOS 中一个长期运行的工作单元，例如采样任务、通信任务。

## Queue

队列。常用于 Task 或 ISR 与 Task 之间传递数据/消息，可以理解成一个有顺序的“消息邮箱”。

## Semaphore

信号量。常用于通知“某件事发生了”或表示某种资源数量。

## Mutex

互斥锁。用于保护不能被多个 Task 同时操作的共享资源。

## FPGA

Field-Programmable Gate Array。它更像一块可以重新配置内部数字电路结构的芯片，而不是简单地顺序执行 C 程序。

## Debugger

调试器。可以暂停程序、单步、查看变量、寄存器、内存、Call Stack 等。

## Logic Analyzer

逻辑分析仪。用于观察多个数字信号随时间的高低变化，并常能解码 UART/I²C/SPI 等协议。

## Oscilloscope / 示波器

观察真实电压随时间变化的仪器。除了 0/1，还能看到上升沿、噪声、过冲、抖动和模拟波形质量。

---

规则：如果某个术语第一次出现在课程里，而初学者很可能没有直觉，正文必须先给一句人话解释，再使用专业定义。