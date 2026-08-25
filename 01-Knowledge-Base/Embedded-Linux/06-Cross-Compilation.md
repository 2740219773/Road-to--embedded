# Cross Compilation — 为什么代码在电脑上编译，却要在开发板上运行

## 先用一句人话理解

很多嵌入式 Linux 板卡使用 ARM 等处理器，而你的开发电脑可能是 x86-64。两边 CPU 能理解的机器指令可能不同。

因此常见开发方式不是在板子上慢慢编译，而是在性能更强的电脑上，用专门面向目标 CPU 的 Compiler（编译器）生成板子能执行的程序。

这叫 Cross Compilation（交叉编译）。

```text
PC Source Code
↓
Cross Compiler for ARM
↓
ARM Executable
↓ copy/download
Embedded Linux Board
↓
Run
```

可以把普通编译理解成“给自己写信”，交叉编译则像“在中国写好一封对方语言的信，再寄给另一台机器”。

## Toolchain 是什么

Toolchain（工具链）通常不是单独一个 compiler，而是一组配套工具，例如 Compiler、Assembler、Linker、Debugger 以及目标系统需要的库和头文件。

初学阶段先记住：Toolchain 必须和目标 CPU 架构、ABI、C Library 等条件匹配。

## 常见新手现象

- PC 上能运行，复制到板子提示无法执行；
- 架构正确但缺少动态库；
- 编译时找不到目标系统头文件；
- 使用了错误 ABI 或不匹配的 sysroot。

## 第一次练习

在 PC 编译一个本机 Hello World，再用目标 Toolchain 编译同一源码。比较两个可执行文件的架构信息，然后把目标版本复制到开发板运行。

目标不是记住命令，而是建立“Source 相同，但生成的 Machine Code 可以面向不同 CPU”的概念。
