# RS-485 Half-Duplex Visualizer

用于观察 UART 字节、RS-485 Transceiver、Direction/DE、A/B 差分总线和远端节点之间的关系。

- 运行：浏览器直接打开 `index.html`。
- Stage：`02-Learning-Path/Stage-03-Peripheral-Engineer/`
- Mission：`04-Missions/Stage-03-Peripherals/07-RS485-No-Reply/Mission.md`
- Knowledge：`01-Knowledge-Base/Protocols/05-RS485-Modbus.md`
- Debug Case：`06-Debugging-Cases/RS485-Direction-Stuck/CASE.md`

学习重点：UART 内部已经发送字节，不等于 RS-485 Driver 已经把差分信号真正送到 A/B 总线上；半双工系统还必须在正确时机切换发送/接收方向。