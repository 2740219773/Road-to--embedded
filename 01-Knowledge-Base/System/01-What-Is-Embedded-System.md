# 什么是嵌入式系统

> V2.1 Knowledge Base 入口。本文用于建立准确概念；学习者优先从 `02-Learning-Path/Stage-00-System-Explorer/` 进入。

## 核心概念

嵌入式系统是为了完成特定功能而构建的计算系统，通常与真实硬件、传感器、执行器和通信接口直接交互。

它与通用 PC 软件最大的区别不是“代码更难”，而是软件必须理解硬件资源、时序、实时性、功耗、可靠性和物理世界。

## 一个典型系统

```text
PC / 上位机
    ↕ Ethernet / USB / UART / CAN
MCU / SoC
    ↕ GPIO / SPI / I2C / ADC / PWM
传感器 / 执行器 / 电源 / 仪器
```

FPGA 也可能作为高速数据处理、精确定时或专用逻辑单元加入系统。

## 学习时真正需要建立的能力

不是记住所有芯片，而是能够回答：

1. 系统有哪些层？
2. 数据从哪里来，到哪里去？
3. 软件如何影响硬件？
4. 出现异常时应该在哪一层找证据？

## 相关学习入口

- `02-Learning-Path/Stage-00-System-Explorer/README.md`
- `04-Missions/Phase-1-C/01-Memory-Detective/Mission.md`

