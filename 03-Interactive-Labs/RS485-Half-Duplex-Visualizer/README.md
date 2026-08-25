# RS-485 Half-Duplex Visualizer

## Beginner Start

- 第一次操作：保持发送方向、DE、Peer Power 和 Termination 为默认值，运行一次发送；
- 预期观察：UART、Transceiver、DE/RE、A/B 和 Remote Node 依次变化；
- 观察不到：先分别检查 Direction、Peer Power 和 Termination，不要同时修改多个条件；
- Mission Integration：对应 RS-485 No Reply 的物理方向和总线证据。

用于观察 UART 字节、RS-485 Transceiver、Direction/DE、A/B 差分总线和远端节点之间的关系。

## Purpose

帮助学习者区分 UART 字节已经发送、RS-485 Driver 已经释放方向，以及 A/B 差分总线真正出现响应这三个层级。

## Interactions

设置发送字节、DE/RE 方向和远端回应，运行半双工时序，观察 UART、Transceiver、A/B 和 Remote Node 状态的先后关系。

- 运行：浏览器直接打开 `index.html`。
- Stage：`02-Learning-Path/Stage-03-Peripheral-Engineer/`
- Mission：`04-Missions/Stage-03-Peripherals/07-RS485-No-Reply/Mission.md`
- Knowledge：`01-Knowledge-Base/Protocols/05-RS485-Modbus.md`
- Debug Case：`06-Debugging-Cases/RS485-Direction-Stuck/CASE.md`

学习重点：UART 内部已经发送字节，不等于 RS-485 Driver 已经把差分信号真正送到 A/B 总线上；半双工系统还必须在正确时机切换发送/接收方向。
