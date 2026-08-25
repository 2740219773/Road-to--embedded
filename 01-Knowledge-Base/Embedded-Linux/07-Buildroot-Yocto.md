# Buildroot & Yocto — Linux 系统不是只有一个程序

## 为什么会需要“构建整个系统”

做 MCU 时，一个工程常常最终生成一个 Firmware 文件烧进芯片。

Embedded Linux 更复杂：一个可启动系统通常需要 Bootloader、Linux Kernel、Device Tree、Root Filesystem、Libraries、Applications 等很多部分。

```text
Bootloader
+ Kernel
+ Device Tree
+ RootFS
+ Libraries
+ Applications
= Embedded Linux Image
```

如果这些东西全部靠人工下载、配置和拼装，会很难重复维护。因此出现了用于自动构建 Embedded Linux 系统的工具体系。

## Buildroot 是什么

Buildroot 可以先理解成一个“按配置帮你生成嵌入式 Linux 系统”的构建工具。它相对直接，适合初学者观察一个 Linux Image 是怎样由 Toolchain、Kernel、RootFS 和软件包组合出来的。

## Yocto 是什么

Yocto Project 提供一套更大型、更灵活的 Embedded Linux 构建体系，常用于复杂产品和需要长期维护、多个硬件平台或高度定制的场景。

初学阶段不需要马上学习大量 BitBake/Recipe 语法。

## 学习顺序

先手工理解 Boot → Kernel → RootFS → Application，再使用 Buildroot 建一个最小系统；等真正遇到产品级复用、分层和包管理需求，再进入 Yocto。

不要把“会执行一次 Yocto build”误认为已经理解 Embedded Linux。工具应该建立在系统模型之上。
