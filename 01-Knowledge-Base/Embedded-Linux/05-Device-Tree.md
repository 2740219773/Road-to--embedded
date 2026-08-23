# Device Tree — Linux 怎么知道板子上接了哪些硬件

## 先用一句人话理解

Device Tree 可以先理解成一份“硬件说明清单”。

同一个 Linux Kernel 可能运行在很多不同板卡上，但每块板子的 GPIO、I2C 设备、SPI 芯片、中断线和地址都可能不同。Device Tree 用结构化方式告诉 Kernel：这块板子上有哪些硬件，它们在哪里、怎么连接。

```text
Board Hardware
↓ description
Device Tree
↓ parsed by Kernel
Driver matches device
↓
Device becomes usable
```

## 为什么不能都写死在 Driver 里

如果驱动代码把所有地址、Pin、IRQ 都写死，那么换一块板子就要改驱动。Device Tree 把“通用驱动逻辑”和“具体板级连接信息”尽量分开。

## 第一次认识几个词

- Node：描述一个硬件对象；
- Compatible：告诉 Kernel 这个设备适合匹配哪类 Driver；
- reg：常用于描述地址/资源范围；
- interrupt：描述中断资源；
- status：常用于表示设备是否启用；
- phandle / reference：让一个节点引用另一个硬件资源。

第一次不要求会写复杂 DTS。先建立一个概念：Driver 负责“怎么操作”，Device Tree 负责“这块板子上具体有什么、在哪里”。

## 常见故障

Driver 明明存在，但设备节点没出现；I2C 设备不工作；GPIO 复用错误。这些问题都可能不是 Driver 逻辑错，而是 Device Tree 描述和真实硬件不一致。

Stage 06 后面会通过 Mission 训练“应用看不到设备时，如何沿 App → Device Node → Driver → Device Tree → Hardware 排查”。