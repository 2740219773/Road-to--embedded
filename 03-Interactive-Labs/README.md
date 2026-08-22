# Interactive Labs

这里保存可直接操作的可视化与模拟器。Interactive Lab 与 Mission 分离：Mission 负责教学任务，Lab 负责让抽象概念可以被观察和操作。

## 当前可运行 Lab

### Stage 01 — C & Memory

- `Memory-Visualizer/`：变量、地址、指针、解引用；
- `Register-Playground/`：bit、mask、Set/Clear/Toggle、整体赋值与 Read-Modify-Write。

### Stage 03 — Peripherals

- `PWM-Visualizer/`：Frequency / Period / Duty Cycle；
- `UART-Frame-Visualizer/`：8N1 Frame 与 bit time；
- `I2C-Bus-Visualizer/`：Address、ACK/NACK、Pull-up；
- `SPI-Timing-Playground/`：CPOL / CPHA 与采样边沿；
- `ADC-Sampling-Simulator/`：Resolution、Vref、Noise 与量化；
- `DMA-Transfer-Simulator/`：Polling / Interrupt / DMA 的搬运差异；
- `CAN-Arbitration-Visualizer/`：CAN Identifier 逐 bit 仲裁；
- `Modbus-Frame-Builder/`：FC03 Request 与 CRC。

### Stage 05 — RTOS

- `RTOS-Scheduler-Timeline/`：Task Priority 与 CPU Timeline；
- `Race-Interleaving-Visualizer/`：Race Condition 的执行交错。

## 当前未实现但保留在后续 Roadmap

Interrupt Timeline、Clock Tree Playground、GPIO Playground、FPGA FSM/Clock/CDC Visualizer 等。

这里明确区分“已经能运行”和“未来计划”，避免 README 看起来像所有 Lab 都已经完成。

## Lab 使用规则

1. 优先从对应 Stage / Mission 进入，不要求学习者遍历本目录。
2. 可运行 Lab 应尽量直接使用浏览器打开 `index.html`。
3. 一个 Lab 可以被多个 Mission 复用。
4. 参数变化必须产生可观察结果，互动不能只是装饰。
5. 关键学习逻辑必须同时保留在 Markdown/课程说明中，不能只存在 JavaScript 代码里。
6. Lab 名称、Mission 链接和 Stage 导航必须保持一致。

> P0 收口阶段只整理、修复和互链现有 Lab，不新增新的 Lab 主题。