# Boot / Kernel / RootFS — Linux 板子上电后发生了什么

## 先看完整链路

一块 Embedded Linux 板子从上电到你看到命令行，通常不是一步完成的。

```text
Power On
↓
Boot ROM / First-stage code
↓
Bootloader
↓
Linux Kernel
↓
Root Filesystem
↓
Init / Services
↓
Your Application
```

## Bootloader 是什么

Bootloader（引导程序）负责在 Linux 真正启动前做准备，例如初始化必要硬件、找到 Kernel、准备启动参数，然后把控制权交给 Kernel。

可以把它理解成“开机接力赛的第一棒”。

## Kernel 是什么

Kernel 接管 CPU 和 Memory，并建立进程、驱动、文件系统等运行环境。

## RootFS 是什么

RootFS（Root Filesystem，根文件系统）可以理解成 Linux 启动后看到的那棵文件目录树及其中的程序、配置和库。

如果 Kernel 像操作系统的核心管理者，那么 RootFS 更像它启动后真正要使用的“工具箱和生活环境”。

## 为什么这条链重要

当设备“起不来”时，必须先判断它卡在哪一棒：Bootloader 没跑、Kernel 没启动、RootFS 挂载失败，还是应用服务没有起来。

Stage 06 后续的调试会始终沿这条启动链收集证据，而不是把所有启动失败都叫做“Linux 坏了”。
