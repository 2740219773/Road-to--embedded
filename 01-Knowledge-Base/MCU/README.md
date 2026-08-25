# MCU Knowledge Base

这里保存 MCU / STM32 的技术知识真相源。学习主入口不是本目录，而是：

- `02-Learning-Path/Stage-02-MCU-Rookie/`
- `02-Learning-Path/Stage-03-Peripheral-Engineer/`
- `02-Learning-Path/Stage-04-Debug-Hunter/`

## 知识范围

- MCU Architecture / Memory Map；
- Clock Tree；
- GPIO；
- Interrupt / NVIC；
- Timer / PWM；
- UART；
- ADC；
- SPI；
- I2C；
- DMA；
- Watchdog；
- Flash；
- Low Power；
- Startup / Vector Table；
- HAL / LL / Register Layer。

## 统一理解模型

任何 MCU 外设都尽量从这条链路理解：

```text
需求
↓
外设功能
↓
Clock / Pin / Register
↓
Driver / HAL
↓
Interrupt / DMA（可选）
↓
引脚或总线上的真实信号
```

## 统一调试模型

出现问题时，优先从证据判断：

```text
程序是否运行？
↓
时钟是否打开？
↓
引脚复用是否正确？
↓
寄存器状态是否符合预期？
↓
中断/DMA 是否发生？
↓
真实电气信号是否存在？
```

Knowledge Base 负责解释“为什么”，Stage / Mission 负责决定“什么时候学”，Interactive Lab 负责“怎么看见它”。
