# Stage 04 Exit Check — Evidence-Driven Debugging

## 目标

面对一个没有按外设名称分类的陌生故障，独立完成一次从现象到回归的调查，不直接套用已有 Case 的答案。

## 未知场景

某数据采集节点在现场运行一段时间后出现以下报告：

- PC 偶尔收到一帧错误数据；
- 同时设备状态从 `RUN` 变成 `0x7F`；
- 重启后短时间恢复；
- 增加日志后故障出现频率改变；
- 当前没有示波器截图，只有软件日志和一次内存快照。

已知信息：

```text
UART source setting: 115200
DMA completion: reported
system_state address: 0x20001020
task stack high-water mark: low
last reset reason: software reset
```

## 任务

在查看参考答案前提交一份完整的 [Evidence Record](../../docs/TEMPLATES.md)：

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

必须完成：

1. 把“错误数据”“状态被改写”“重启后恢复”拆成可验证现象；
2. 至少列出三个不同层级的假设；
3. 选择第一条最能缩小范围的证据；
4. 说明当前证据哪些是事实、哪些只是推测；
5. 设计一次不依赖随机改参数的验证；
6. 给出修复后回归条件，包括边界和长时间运行；
7. 说明如果换成 I²C、SPI 或另一块 MCU，调查顺序哪些仍然适用。

## 通过标准

- 没有把“HardFault/乱码/DMA Complete”直接写成根因；
- 能区分软件配置、Memory、Timing、Electrical 和 Data Meaning；
- 第一测量选择有明确的信息量理由；
- 修复方案范围最小且能被验证；
- 能留下其他工程师可以复现和审查的记录。

## 下一阶段

通过后进入 [Stage 05 — RTOS Engineer](../Stage-05-RTOS-Engineer/README.md)。如果不能说明第一条证据为什么有价值，应回到 [Stage 04 Mission 03](../../04-Missions/Stage-04-Debug-Hunter/03-Choose-The-Instrument/Mission.md) 重新练习。

