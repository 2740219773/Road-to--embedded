# Learning Path — Stage Map

这里是学习者真正应该沿着走的主线。

不要把整个 Knowledge Base 当作必读目录。Knowledge Base 是参考资料，Stage 才是课程路径。

## Stage 00 — System Explorer

目标：建立整个嵌入式系统地图。

核心问题：

- MCU、MPU、SoC、FPGA 分别是什么？
- CPU、RAM、Flash、外设、总线如何配合？
- 裸机、RTOS、Linux 为什么不同？
- 一段 C 代码怎么最后跑到芯片上？

Boss：给出一块开发板和一张简化框图，能够解释程序和硬件之间的大致链路。

## Stage 01 — C & Memory Explorer

身份：从“会写 C 语法”走向“理解代码如何访问底层资源”。

核心 Mission：

1. Memory Detective — CPU 到底去哪里找数据？
2. Bit Hacker — 为什么只开一个 LED 却清掉其他位？
3. Volatile Mystery — 代码没改，值为什么自己变了？
4. Struct Explorer — `GPIOA->ODR` 到底是什么意思？
5. Linker Detective — 代码明明写了，为什么最终找不到？

Boss：Virtual GPIO Controller。

通过标准：能够逐层解释一个典型寄存器访问表达式，并完成多文件模拟 GPIO 工程。

## Stage 02 — MCU Rookie

身份：第一次让代码真正控制芯片。

核心内容：

- 开发环境；
- 烧录与调试；
- GPIO；
- 时钟基础；
- External Interrupt；
- Timer / PWM。

Boss：带按键和 PWM 的状态指示控制器。

## Stage 03 — Peripheral Engineer

身份：让 MCU 与外部世界通信和采集。

核心内容：

- UART；
- ADC；
- SPI；
- I2C；
- DMA；
- Watchdog；
- Flash。

Boss：多传感器数据采集节点。

## Stage 04 — Debug Hunter

身份：从“会写”升级为“会找问题”。

核心内容：

- Breakpoint / Watch / Memory / Register；
- Call Stack；
- JTAG/SWD；
- 示波器；
- 逻辑分析仪；
- UART/SPI/I2C 故障；
- HardFault；
- 时序、电源、接线问题。

Boss：修复一套被人为注入多个故障的 MCU 系统。

## Stage 05 — RTOS Engineer

身份：管理多个同时发生的任务。

核心内容：

- Task；
- Scheduler；
- Priority；
- Queue；
- Semaphore；
- Mutex；
- Event；
- Timer；
- Race / Deadlock；
- ISR 与 Task 协作。

Boss：把裸机采集节点重构成 FreeRTOS 系统。

## Stage 06 — Embedded Linux Explorer

身份：从 MCU 固件进入完整操作系统。

核心链路：

```text
Bootloader
→ Kernel
→ Device Tree
→ Driver
→ User Space
→ Application
```

Boss：在 ARM Linux 板上完成一个外设到应用的数据链路。

## Stage 07 — FPGA Builder

身份：从顺序执行程序进入并行硬件逻辑。

核心内容：

- Digital Logic；
- Verilog；
- Simulation；
- FSM；
- FIFO / RAM；
- Clock / Reset；
- CDC；
- Timing；
- AXI；
- FPGA 与 MCU/CPU 协同。

Boss：实现一个带缓存和通信接口的小型 FPGA 模块。

## Stage 08 — System Integrator

身份：跨层系统工程师。

最终链路：

```text
PC / 上位机
    ↕
Network / Serial / Bus
    ↕
MCU / Embedded Linux
    ↕
FPGA
    ↕
Sensor / Actuator / Real Device
```

Boss：完成一套可观察、可调试、可定位故障的跨层系统。