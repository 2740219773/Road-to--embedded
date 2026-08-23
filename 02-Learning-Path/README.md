# Learning Path — 学习者主入口

这里是学习者真正应该走的主线。不要从 Knowledge Base 第一篇开始顺序读，也不要把“看完文件”当成学习完成。

## 推荐路线

1. [Stage 00 — System Explorer](Stage-00-System-Explorer/README.md)：先认识整个嵌入式世界。
2. [Stage 01 — C & Memory](Stage-01-C-and-Memory/README.md)：建立地址、指针、寄存器与硬件的连接。
3. [Stage 02 — MCU Rookie](Stage-02-MCU-Rookie/README.md)：第一次把 Firmware、Debugger、GPIO、Interrupt、Timer/PWM 接到真实引脚和仪器。
4. [Stage 03 — Peripheral Engineer](Stage-03-Peripheral-Engineer/README.md)：UART / I²C / SPI / ADC / DMA / CAN / Modbus 等外设与通信。
5. [Stage 04 — Debug Hunter](Stage-04-Debug-Hunter/README.md)：系统训练证据驱动的故障定位。
6. [Stage 05 — RTOS Engineer](Stage-05-RTOS-Engineer/README.md)：任务、调度、通信、同步与并发故障。
7. [Stage 06 — Embedded Linux](Stage-06-Embedded-Linux/README.md)：从 Boot、Kernel、Driver 到 User Space。
8. [Stage 07 — FPGA](Stage-07-FPGA/README.md)：从软件执行思维切换到数字逻辑与并行硬件思维。
9. [Stage 08 — System Integrator](Stage-08-System-Integrator/README.md)：把 PC、MCU、Linux、FPGA 和真实设备串成系统。

## 每个 Stage 怎么学

```text
Mission 提出问题
→ Interactive / Instrument 建立直觉和证据
→ Knowledge Base 查清概念
→ 真实实验验证
→ Break It 主动制造故障
→ Debug Case 独立取证
→ Boss Project 综合验收
→ Exit Check 决定是否进入下一阶段
```

## Stage 02 与 Stage 03 的边界

这两个 Stage 都属于 MCU 学习，但职责不同：

```text
Stage 02
建立真实 MCU 基础底座
Build / Flash / Debugger / GPIO / Interrupt / Timer / PWM / Pin / Voltage

Stage 03
在底座上增加外设数量和总线复杂度
UART / I2C / SPI / ADC / DMA / CAN / RS-485 / Modbus
```

PWM 基础在 Stage 02 学习和测量；Stage 03 的综合项目可以复用 PWM，但不重复把它当成一门新外设课。

## 三条导航原则

- 想知道“下一步学什么”：留在 `02-Learning-Path/`。
- 遇到“这个名词到底是什么”：进入 `01-Knowledge-Base/`。
- 想直接训练问题定位：进入 `04-Missions/` 或 `06-Debugging-Cases/`。

## 当前建设状态

V2.1 架构与 V2.2 Stage 01 已完成。当前 V2.3 先正式建设 Stage 02，再继续 Stage 03；Stage 04～08 已存在纵向样板，但不代表对应正式版本已经完成。