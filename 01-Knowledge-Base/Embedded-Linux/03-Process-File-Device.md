# Process / File / Device — Linux 为什么“什么都像文件”

## Process 是什么

Program 是磁盘上的程序文件；当它真正被 Linux 启动并运行起来时，就形成一个 Process（进程）。

可以先理解成：程序是菜谱，Process 是厨房里正在按照菜谱做菜的那一次实际工作。

Linux 可以同时管理很多 Process，并为它们分配 CPU 时间和 Memory。

## File 不只是文档

在 Linux 中，很多系统能力都通过类似文件的接口暴露出来。你会看到普通文件、配置、日志，以及 `/dev` 下代表设备的 Device Node。

这不意味着硬件本身真的变成了文本文件，而是 Linux 尽量提供统一的访问方式。

## Device Node 是什么

例如应用打开某个 `/dev/...` 设备节点时，背后可能连接到 Kernel Driver，再由 Driver 操作真实硬件。

```text
Application
↓ open/read/write/ioctl
/dev/xxx
↓
Kernel Driver
↓
UART / I2C / SPI / GPIO / Other Hardware
```

## 为什么这对 MCU 开发者很重要

在裸机/RTOS MCU 中，你经常直接配置 Peripheral Register；到了 Linux，应用层通常不应该直接照搬这种思路。

你需要开始学习“通过操作系统提供的接口使用设备”。

## 第一个观察任务

在 Linux 环境里观察：正在运行的 Process、普通文件和 `/dev` 下的 Device Node。暂时不要求记命令，先建立“应用—系统接口—驱动—硬件”的层级概念。
