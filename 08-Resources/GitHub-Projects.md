# GitHub Projects — 精选上游项目

这里整理适合 Road to Embedded 路线的公开 GitHub 项目。它们是阅读和对照材料，不是本仓库课程的前置依赖。

原则：**不整体搬运别人的仓库，不复制代码或课程正文；只提取结构、实验方式和工程思路。** 直接复用任何代码前，必须重新确认许可证并保留必要声明。

## 官方/上游参考

### libopencm3

- 官方链接：[libopencm3](https://github.com/libopencm3/libopencm3)
- 适用 Stage：Stage 01～03
- 建议阅读：README、`include/`、`lib/`、`doc/` 和对应芯片的最小外设实现
- 学习目的：观察寄存器、Datasheet、编译、链接和 OpenOCD 如何组成裸机工程
- 不建议：没有完成 Stage 01 Exit Check 前直接复制完整工程
- 许可证：LGPL-3.0-or-later / GPL-3.0-or-later，按仓库文件分别确认
- 最后检查：2026-08-25

### libopencm3-examples

- 官方链接：[libopencm3-examples](https://github.com/libopencm3/libopencm3-examples)
- 适用 Stage：Stage 02
- 建议阅读：`examples/` 中与 GPIO、Timer、UART 相关的最小项目
- 学习目的：对照“启动 → 配置 → 输出 → 验证”的最小硬件实验结构
- 不建议：把示例的板卡引脚和时钟配置直接当成自己的板卡配置
- 许可证：以仓库 LICENSE 和各文件声明为准
- 最后检查：2026-08-25

### Raspberry Pi Pico SDK

- 官方链接：[pico-sdk](https://github.com/raspberrypi/pico-sdk)
- 适用 Stage：Stage 02～03，可作为低门槛替代平台参考
- 建议阅读：README、SDK 文档和 `pico-examples`
- 学习目的：比较高级 API、芯片 SDK 和底层寄存器定义的边界；该 SDK 同时面向非嵌入式 C 开发者和底层开发者
- 不建议：将 Pico SDK 的 API 经验等同于所有 MCU 的通用 API
- 许可证：BSD-3-Clause
- 最后检查：2026-08-25

### FreeRTOS Kernel

- 官方链接：[FreeRTOS-Kernel](https://github.com/FreeRTOS/FreeRTOS-Kernel)
- 适用 Stage：Stage 05
- 建议阅读：README、`include/`、`portable/`、`tasks.c`、`queue.c`，先了解源码边界再看实现
- 学习目的：把 Workbench 中的 Task、Queue、Scheduler 和 Portable Layer 连接到真实内核结构
- 不建议：没有完成 RTOS Concurrency Workbench 和 Host Fixture 前直接阅读全部内核源码
- 许可证：MIT，仍需遵守仓库文件声明
- 最后检查：2026-08-25

### FreeRTOS Kernel Book

- 官方链接：[FreeRTOS Kernel Book](https://github.com/FreeRTOS/FreeRTOS-Kernel-Book)
- 适用 Stage：Stage 05
- 建议阅读：与当前 Mission 对应的章节和 examples
- 学习目的：为 Task、Queue、Synchronization、Interrupt 和 Timing 提供真实 RTOS 语境
- 不建议：把书中的 API 示例当成当前 Host Fixture 的真实调度证明
- 许可证：以仓库 LICENSE、`LICENSE-SAMPLECODE` 和各文件声明为准
- 最后检查：2026-08-25

### Zephyr

- 官方链接：[Zephyr](https://github.com/zephyrproject-rtos/zephyr)
- 适用 Stage：Stage 05 后的进阶阅读、Stage 06 过渡
- 建议阅读：README、`samples/`、`boards/`、`drivers/` 和 Getting Started 文档
- 学习目的：观察多架构 RTOS 如何组织 Kernel、Board、Driver、Device Tree 和 Samples
- 不建议：把 Zephyr 当作 Stage 05 的入门安装任务；当前课程仍先使用确定性模型
- 许可证：Apache-2.0，第三方组件按各自声明处理
- 最后检查：2026-08-25

## 社区补充

下面项目用于发现主题和实践题目，不作为本课程的唯一事实源：

- [learn-embedded-systems](https://github.com/iam-sandipmaity/learn-embedded-systems)：参考渐进式 MCU 学习和项目安排。
- [Embedded-Engineering-Roadmap](https://github.com/m3y54m/Embedded-Engineering-Roadmap)：作为主题资源池，不复制链接目录。
- [Roadmap-to-Embedded-Engineering](https://github.com/mateustoin/Roadmap-to-Embedded-Engineering)：参考 Software / Hardware 双基础线。
- [embedded-notes](https://github.com/Sering-Hong/embedded-notes)：中文主题资料补充，需自行核对版本和准确性。
- [STM32-FreeRTOS-Mastery-Series](https://github.com/yunus-kunduz/STM32-FreeRTOS-Mastery-Series)：参考 Task、Queue 和 Producer/Consumer 项目递进。
- [stm32_portfolio](https://github.com/rubin-khadka/stm32_portfolio)：参考外设、RTOS、Bootloader 和通信项目题目。

## 本仓库怎么使用这些项目

```text
先完成当前 Mission
→ 再打开对应上游项目的最小示例
→ 比较目录、配置和证据边界
→ 回到本仓库写自己的解释和回归记录
```

目标不是收集最多资料，而是形成真正能走完、能动手、能排错的学习路线。
