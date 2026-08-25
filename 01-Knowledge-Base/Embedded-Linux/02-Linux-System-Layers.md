# Embedded Linux System Layers — 一块 Linux 板子里面到底有什么

## 先别把 Linux 当成一个“大程序”

当一块嵌入式板卡启动 Linux 后，里面通常不是只有一个应用程序，而是很多层共同工作。

```text
Your Application
↓
Libraries / System Services
↓
Linux Kernel
↓
Device Drivers
↓
Hardware
```

## 用电脑做类比

在 Windows 上写 C# 上位机时，你通常不会直接操作网卡寄存器。应用程序通过操作系统提供的能力使用硬件。

Embedded Linux 也类似，只是开发者往往需要比普通桌面软件更理解下面几层。

## Kernel 是什么

Kernel（内核）是 Linux 最核心的部分。它管理 CPU、Memory、Process、File、Device 等系统资源。

可以把它想成整栋楼的物业和调度中心：应用程序不能随便抢硬件，而是通过内核提供的规则使用资源。

## Driver 是什么

Driver（驱动程序）负责让操作系统知道“这个具体硬件应该怎么操作”。

例如同样是读取温度：应用可能只是读取一个系统接口，但真正的 I²C/SPI 操作可能由下面的 Driver 完成。

## User Space / Kernel Space

初学阶段可以先理解为：普通应用主要运行在 User Space；Kernel 和许多 Driver 运行在更高权限的 Kernel Space。两者之间存在明确边界。

## 为什么嵌入式工程师要理解这些层

因为问题可能发生在完全不同的位置：

```text
App 读不到数据
≠ 一定是 App bug
```

也可能是权限、设备节点、Driver、Device Tree、Bus、Pin、Clock 或硬件本身的问题。

Stage 06 的目标就是逐步建立这张系统地图，而不是一上来背 Linux 命令。
