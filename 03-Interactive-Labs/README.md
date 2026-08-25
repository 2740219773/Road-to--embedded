# Interactive Labs

## Beginner Start

- 第一次操作：不要遍历整个目录，先从当前 Stage / Mission 入口打开对应 Lab；
- 预期观察：至少一个输入参数或按钮会改变页面上的状态、数值或时序；
- 观察不到：确认 Lab 的 `index.html` 能打开，再查看对应 README 的第一步和 Mission；
- Mission Integration：Lab 负责观察和操作，Mission 负责预测、故障、证据和验收。

## Purpose

这里保存可直接操作的可视化与模拟器。Interactive Lab 与 Mission 分离：Mission 负责教学任务，Lab 负责让抽象概念可以被观察和操作。

## 当前可运行 Lab

### Stage 01 — C & Memory

- `Memory-Visualizer/`：变量、地址、指针、解引用；
- `Register-Playground/`：bit、mask、Set/Clear/Toggle、整体赋值与 Read-Modify-Write。

### Stage 02 — MCU Foundation

- `PWM-Visualizer/`：Frequency / Period / Duty Cycle，作为 Timer/PWM 真机测量前的波形直觉工具。

### Stage 03 — Peripheral Engineer

- `UART-Frame-Visualizer/`：8N1 Frame、TX/RX Baud、bit time 与采样漂移；
- `I2C-Bus-Visualizer/`：7-bit Address、R/W、ACK/NACK、Pull-up、Device Power；
- `SPI-Timing-Playground/`：Controller/Device CPOL、CPHA、Sample Edge、Bit Order、CS；
- `ADC-Sampling-Simulator/`：Vin、Vref、Resolution、Input/Vref Noise 与采样统计；
- `DMA-Transfer-Simulator/`：Request、Direction、Count、Buffer Capacity 与越界；
- `CAN-Arbitration-Visualizer/`：三个标准 ID 的逐 bit Arbitration；
- `RS485-Half-Duplex-Visualizer/`：UART、Transceiver、DE/RE、A/B 与 Half-Duplex Direction；
- `Modbus-Frame-Builder/`：FC03、CRC、PDU Address 与常见 4xxxx Manual Display 映射。

### Stage 05 — RTOS

- `RTOS-Scheduler-Timeline/`：Task Priority 与 CPU Timeline；
- `Race-Interleaving-Visualizer/`：Race Condition 的执行交错。

Stage 05 的两个既有 Lab 是 prototype 基线；本阶段新增 RTOS Concurrency Workbench 后，Stage 05 已通过正式课程质量门。

### Stage 05 — RTOS Engineer

- `RTOS-Concurrency-Workbench/`：Scheduler、Priority、Race、Deadlock、Queue、ISR 和 Stack 的统一虚拟证据实验。

### Stage 04 — Debug Hunter

- `Debug-Evidence-Workbench/`：虚拟 Evidence Pack、Watchpoint 调查链和 Instrument Selection 训练。

该 Workbench 只模拟证据流程，不代表真实 MCU、调试器或仪器已经完成验证。

## 当前未实现但保留在后续 Roadmap

Interrupt Timeline、Clock Tree Playground、GPIO Playground、FPGA FSM/Clock/CDC Visualizer 等。

这里明确区分“已经能运行”和“未来计划”，避免 README 看起来像所有 Lab 都已经完成。

## Lab 使用规则

1. 优先从对应 Stage / Mission 进入，不要求学习者遍历本目录；
2. 可运行 Lab 应尽量直接使用浏览器打开 `index.html`；
3. 一个 Lab 可以被多个 Mission 复用；
4. 参数变化必须产生可观察结果，互动不能只是装饰；
5. 关键学习逻辑必须同时保留在 Knowledge / Mission 中，不能只存在 JavaScript 代码里；
6. Lab 名称、Mission 链接和 Stage 导航必须保持一致；
7. 课程文档不能描述 Lab 尚未实现的交互能力；如果 Mission 需要某种观察，优先让工具能力与课程描述对齐。

当前正式建设到 V2.5 Stage 05 RTOS Engineer；Stage 06～08 仍是后续 prototype。新增 Lab 应继续服务完整学习闭环，而不是为了增加数量。
