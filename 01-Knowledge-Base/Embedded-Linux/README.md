# Embedded Linux Knowledge Base

这里保存 Embedded Linux 的技术知识真相源。学习主入口：`02-Learning-Path/Stage-06-Embedded-Linux/`。

## 知识范围

- Shell / filesystem / process / thread；
- GCC / Make / CMake / cross compile；
- Bootloader；
- Kernel；
- Device Tree；
- Driver；
- GPIO / I2C / SPI / UART；
- Buildroot / Yocto；
- user-space application。

## 统一系统模型

```text
Power On
↓
Boot ROM / Bootloader
↓
Kernel
↓
Device Tree / Drivers
↓
Root Filesystem
↓
Services / Applications
↓
Network / Device / User Interface
```

学习重点是理解每一层负责什么，以及故障发生时应该在哪一层寻找证据。

## 适合的互动形式

- Boot 流程动画；
- Device Tree 与设备树节点可视化；
- 用户态调用到驱动的调用链；
- “设备节点为什么不存在”故障实验；
- 网络服务与设备数据流可视化。

不要求初期阅读大量内核源码。先建立系统边界和调试链路，再根据项目深入。
