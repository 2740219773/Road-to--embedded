# Cortex-M Fault Model — HardFault 不是根因名称

程序进入 HardFault，只说明 CPU 检测到无法按正常流程继续的异常条件，或者其他 fault 被升级为 HardFault。

常见调查对象包括：

- 非法/未对齐/不可访问地址；
- 错误函数指针或返回地址；
- BusFault / MemManage / UsageFault；
- 栈破坏；
- 除零或未定义指令（取决于配置与内核）；
- 错误的外设/内存访问。

## 第一原则

不要在 HardFault_Handler 中只按 Reset。

需要保存和读取 fault status registers，并检查异常入栈时保存的 PC、LR、xPSR 等现场信息。

```text
Fault
→ Exception Stack Frame
→ Stacked PC
→ Fault Status Registers
→ Fault Address (when valid)
→ Source Line / Instruction
```

具体寄存器名称和可用 fault 类型随 Cortex-M 内核型号而异，分析时应参考 ARM 文档和目标 MCU Reference Manual。

目标是把“死在 HardFault”缩小到“哪条指令、访问什么地址、为什么非法”。