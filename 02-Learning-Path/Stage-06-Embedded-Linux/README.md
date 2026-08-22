# Stage 06 — Embedded Linux

这一阶段从资源受限 MCU 扩展到能够运行完整 Linux 的嵌入式平台。

## 学习主线

Linux 使用基础 → 进程/线程/文件/设备 → Boot → Kernel → Device Tree → Driver → Buildroot/Yocto → 应用与设备联调。

重点理解 Linux 与裸机/RTOS 的系统边界，而不是一开始就陷入内核源码细节。

## Mission 示例

- 一个 Linux 应用访问 GPIO 时，中间到底经过了什么？
- 驱动加载了但设备节点为什么没有出现？
- Device Tree 写错会产生什么现象？

## Boss

完成一个 Embedded Linux 设备服务：读取真实或模拟设备数据，通过网络提供给 PC 上位机，并保留完整调试记录。