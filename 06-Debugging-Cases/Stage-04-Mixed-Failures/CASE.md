# Stage 04 Debug Challenge — 五个线索，不按外设名猜答案

## Scenario

你收到一份故障报告：系统有时通信乱码，有时主循环不再运行，有时状态变量被改写，有时 DMA 完成后系统崩溃，还有一个任务在压力运行一段时间后进入 HardFault。

本关不先告诉你故障属于哪个外设。你必须先把现象放回系统层，再选择第一条高价值证据。

## Investigation Rules

每个 Fault 在修改代码前必须留下：

```text
Symptom
Expected
System Layer
Hypotheses
First High-value Measurement
Predicted Evidence
Observed Evidence
Root Cause
Minimal Fix
Regression
Transfer
```

禁止用“大范围重写后正常”作为通过方式。以下 Evidence Pack 是教学样例，不代表真实硬件测量已经执行。

## Fault A — UART / Clock

### Symptom

PC 配置为 115200 8N1，但持续收到乱码。源码也写着 115200。

### Evidence Pack

```text
Firmware send path: reached
PC configuration: 115200, 8N1
Source configuration: 115200, 8N1
TX bit time: about 17.36 µs
TX voltage: about 0–3.3 V
```

任务：计算真实 Baud；选择第一条测量；说明为什么源码配置不能替代 Pin 上的 bit time。

## Fault B — Interrupt

### Symptom

打开外设中断后，主循环进度几乎停止。

### Evidence Pack

```text
ISR entry counter: increases extremely fast
Peripheral pending flag: remains asserted
ISR data handling: runs
Flag clear / acknowledge sequence: not observed
```

任务：区分高事件频率、ISR 过长和 pending 未解除；写出支持/反驳每个假设的实验。

## Fault C — Pointer / Memory

### Symptom

`system_state` 从 `RUN` 变成非法值，但没有搜索到直接赋值语句。

### Evidence Pack

```text
system_state address: 0x20001020
neighboring array: ends at 0x2000101F
DMA destination: 0x20001010
last known good state: RUN
CPU watchpoint: no hit in one run
```

任务：说明为什么 Watchpoint 未命中不能排除 DMA 或越界写；选择下一条 Memory/Boundary 证据。

## Fault D — DMA / Buffer

### Symptom

DMA Complete 回调正常触发，但稍后无关状态变量变化并偶发 HardFault。

### Evidence Pack

```text
uint16_t adc_buffer[64]
DMA width: 16 bit
DMA transfer count: 128 half-words
Completion event: yes
memory after adc_buffer: changed
```

任务：计算 Buffer Capacity 与请求量；解释为什么 Complete 不等于 Memory Safe；给出 Guard Pattern 回归方法。

## Fault E — Stack

### Symptom

任务进入数据处理路径后随机崩溃，加入日志后崩溃位置改变。

### Evidence Pack

```text
Task stack: 512 bytes
local temp buffer: 420 bytes
formatting/logging call: present
stack high-water mark: nearly exhausted
fault location: varies
```

任务：列出至少两个竞争假设；说明如何用 watermark、stack pattern 和压力测试区分它们。

## Cross-Layer Classification

最后按系统层重新归类，而不是按 UART、Interrupt、DMA 等名称归类：

```text
Build / Run
Clock / Timing
Peripheral
Memory
Interrupt
Electrical / Physical
Data Meaning
```

至少说明其中两个 Fault 为什么共享同一类调试方法。

## Acceptance

通过标准：

- 五个 Fault 各有 Evidence Record；
- 每个 Fault 至少列出两个假设；
- 每个 Fault 指出第一条高价值证据；
- 能排除至少一个错误假设；
- 每个 Fault 有最小修复和回归；
- 能把一条调查原则迁移到未见过的故障。

## Learning Links

- [Stage 04 — Debug Hunter](../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- [Evidence-Driven Debugging](../../01-Knowledge-Base/Debugging/01-Evidence-Driven-Debugging.md)
- [Stage 04 Boss](../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)

