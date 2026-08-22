# Embedded Linux — 为什么有些板子不用 RTOS，而是跑 Linux？

## 先建立第一印象

Embedded Linux 可以先理解成：**把 Linux 操作系统运行在一块嵌入式硬件板上，用它管理 CPU、内存、设备、文件、网络和应用程序。**

如果 MCU + RTOS 更像一台“功能明确、资源有限、直接控制硬件的小机器”，那么 Embedded Linux 更像一台“更完整的小型计算机”。

常见场景：

```text
ARM SoC
├─ CPU
├─ DDR Memory
├─ Flash / eMMC
├─ Ethernet / USB
├─ Linux Kernel
├─ Drivers
└─ User Applications
```

树莓派、很多工业网关、智能摄像头、路由器、HMI 设备，都属于或接近这一类系统。

## 为什么不用 MCU？

当系统需要：

- 复杂网络；
- 文件系统；
- 多进程；
- 大内存；
- USB / Ethernet；
- 图形界面；
- 丰富软件生态；

Linux 往往比从零在 MCU 上实现这些能力更合适。

## MCU / RTOS / Linux 怎么选？

不是谁“更高级”，而是解决的问题不同。

```text
MCU Bare-metal → 简单、直接、资源少
RTOS           → 多任务、实时控制
Embedded Linux → 复杂系统、网络、文件、应用生态
```

## 第一次需要认识的几个词

- `Bootloader`：上电后先运行的一段启动程序，用来初始化硬件并启动 Linux；
- `Kernel`：Linux 内核，负责 CPU、内存、设备、进程等核心管理；
- `Driver`：让内核知道如何控制某个硬件设备；
- `Device Tree`：描述板上有哪些硬件、地址、中断、GPIO 等信息；
- `Root Filesystem`：Linux 用户空间使用的目录和程序集合；
- `User Space`：普通应用程序所在的运行空间。

## 学习目标

Stage 06 第一阶段只要求回答：

> 一块 Linux 板从上电到运行我的应用，中间经过了哪些层？

暂时不需要钻进内核源码。