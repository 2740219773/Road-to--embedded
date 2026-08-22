# GitHub Projects

这里整理适合本仓库路线的公开 GitHub 项目。

原则：**不是把别人的仓库整体搬过来，而是提取值得学习的结构、练习方式和工程思路。** 对于许可证允许复用的内容，也应保留必要的署名和许可证信息。

## 1. learn-embedded-systems

Repository: `iam-sandipmaity/learn-embedded-systems`

适合参考：

- 14 周渐进式学习结构；
- STM32 GPIO、外部中断、RTOS 等阶段化安排；
- 每周学习 + 实验 + 项目的组织方式；
- STM32CubeIDE、HAL、逻辑分析仪等工具的结合；
- 从基础实验逐渐走向综合项目的思路。

我们吸收的部分：

- 将 MCU 学习拆成更细的阶段；
- 每个阶段都增加“最小实验 + 故障实验 + 调试”；
- 后续建立按阶段推进的实验清单。

许可证：MIT。若后续直接复用其代码或 substantial 内容，需要保留原版权与许可证声明。

## 2. Embedded-Engineering-Roadmap

Repository: `m3y54m/Embedded-Engineering-Roadmap`

这是一个很大的嵌入式资源导航项目。

适合参考：

- Embedded C/C++；
- MCU 与 Bare Metal；
- RTOS / FreeRTOS；
- Embedded Linux；
- 调试；
- 通信协议；
- 电子与硬件基础；
- 大量课程、文章和书籍索引。

我们不准备复制它的大型链接目录，而是把它作为“上游资料池”。学习到具体主题时，再从中挑 1～3 个真正值得看的资源加入本仓库。

许可证：CC BY-SA 4.0。若直接改编其受版权保护的内容，需要遵守署名与相同方式共享等要求，因此本仓库目前主要采用链接与独立整理方式。

## 3. Roadmap-to-Embedded-Engineering

Repository: `mateustoin/Roadmap-to-Embedded-Engineering`

适合参考：

- 把嵌入式拆成 Software 与 Hardware 两条基础线；
- C/C++、数据结构、Bare Metal、RTOS、Linux；
- 数字逻辑、CPU/寄存器/总线/存储器；
- GPIO、PWM、Clock、Watchdog、ADC、DMA；
- UART、I2C、SPI；
- Datasheet 阅读与 PCB 基础。

我们吸收的思路：

> 嵌入式不能只学写代码，还必须建立“硬件结构 + 软件执行 + 调试工具”三者之间的联系。

## 4. embedded-notes

Repository: `Sering-Hong/embedded-notes`

适合参考：

- STM32 标准库与 HAL 两种视角；
- 中断、NVIC、ADC、DMA 等外设专题；
- FreeRTOS；
- 嵌入式 Linux；
- 以 Markdown 记录原理 + 代码 + 实验的方式。

这个项目更适合作为后续具体知识点的中文参考资料。

## 5. STM32-FreeRTOS-Mastery-Series

Repository: `yunus-kunduz/STM32-FreeRTOS-Mastery-Series`

适合参考：

- FreeRTOS Task；
- Queue；
- Semaphore；
- Mutex；
- Event Group；
- Software Timer；
- Task Notification；
- 双 MCU UART Producer/Consumer 项目。

我们后续进入 RTOS 阶段时，可以参考它的项目递进方式，自己重新做一套由简单到复杂的 FreeRTOS 实验。

## 6. stm32_portfolio

Repository: `rubin-khadka/stm32_portfolio`

适合参考的工程项目方向很多：

- UART / I2C / SPI / CAN；
- ADC / DMA / Timer；
- FreeRTOS；
- SD Card / Flash；
- Bootloader；
- OTA；
- Ethernet / TCP；
- CRC；
- 多种传感器项目。

这个仓库适合作为 `07-Projects` 的项目题库来源。

---

## 本仓库如何使用这些项目

优先级如下：

1. **路线借鉴**：学习阶段怎么拆；
2. **实验借鉴**：一个知识点做什么实验最合适；
3. **项目借鉴**：哪些综合项目值得重做；
4. **调试借鉴**：别人如何观察和定位问题；
5. **代码参考**：最后才是看实现代码。

我们的目标不是得到最多资料，而是最终形成一套自己能够真正走完的路线。