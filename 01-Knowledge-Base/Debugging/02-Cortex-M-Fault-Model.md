# Cortex-M Fault Model — HardFault 不是根因名称

## 先用一句人话理解

如果 MCU 正常运行时突然进入 `HardFault_Handler`，可以先把它理解成：CPU 发现了一个严重异常，当前程序不能按原来的方式继续执行，于是跳进一个专门处理异常的入口。

它更像汽车仪表盘亮起“严重故障灯”，而不是直接告诉你“发动机第 3 个零件坏了”。

所以：

```text
HardFault = 现象 / 异常入口
不是最终根因
```

## Cortex-M 是什么

Cortex-M 是 ARM 提供的一类常见 MCU CPU 内核。很多 STM32、NXP、Nordic 等 MCU 都使用不同型号的 Cortex-M 内核。

不同 Cortex-M 型号支持的 Fault 类型和状态寄存器可能不同，但调查思路相近。

## 什么情况可能触发 Fault

常见原因包括：

- 指针指向了不允许访问的地址；
- 数组越界或 Stack 被破坏；
- 错误函数指针或返回地址；
- 执行了无效指令；
- 某些未对齐访问；
- 访问不存在或禁止访问的总线/外设地址；
- BusFault / MemManage / UsageFault 等异常被升级为 HardFault。

第一次学习不需要背这些分类，先记住：**CPU 通常能够留下“出事时的现场”。**

## 出事后最重要的是什么

不要第一时间 Reset，因为 Reset 会清掉很多现场信息。

CPU 进入异常时通常会保存一部分寄存器状态。调试时尤其关心：

- PC：当时正在执行哪条指令；
- LR：返回相关信息；
- xPSR：CPU 状态；
- Fault Status Registers：CPU 为什么认为这次访问/执行有问题；
- Fault Address：部分异常可以留下出错地址。

```text
HardFault
→ 保存现场
→ 找到 Stacked PC
→ 查看 Fault Status
→ 如果有效，查看 Fault Address
→ 映射回源码 / 指令
→ 解释为什么这条访问非法
```

## 一个最小例子

```c
uint32_t *p = 0;
*p = 123;
```

这里真正的问题不是“HardFault”，而是程序把地址 0 当成有效目标并尝试写入。HardFault 只是 CPU 把这个严重问题暴露出来的一种方式。

## Stage 04 的目标

以后进入 HardFault 时，不再只会“重新烧程序、加日志、自动重启”，而是先保护现场，再把问题缩小到：哪条指令、访问什么地址、为什么不合法。

学习入口：`02-Learning-Path/Stage-04-Debug-Hunter/README.md`。
