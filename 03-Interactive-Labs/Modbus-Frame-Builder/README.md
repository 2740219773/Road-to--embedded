# Modbus RTU Frame Builder

## Beginner Start

- 第一次操作：使用默认站号、FC03、起始地址和数量生成一帧；
- 预期观察：PDU、CRC、线上的字节和手册显示地址保持可对照；
- 观察不到：先只检查 Function Code、Address 和 CRC，不要同时改变协议和物理层假设；
- Mission Integration：对应 Modbus Wrong Register 的地址映射和数据语义调查。

用于观察 Modbus RTU FC03 请求中的站号、功能码、协议地址、数量和 CRC，并重点比较“手册显示编号”和“真正 PDU 地址字段”。

- 运行：浏览器直接打开 `index.html`。
- Stage：`02-Learning-Path/Stage-03-Peripheral-Engineer/`
- Mission：`04-Missions/Stage-03-Peripherals/08-Modbus-Wrong-Register/Mission.md`
- Knowledge：`01-Knowledge-Base/Protocols/05-RS485-Modbus.md`
- Debug Case：`06-Debugging-Cases/Modbus-Wrong-Register/CASE.md`

当前工具支持两种输入视角：

```text
Protocol/PDU address
```

以及常见的：

```text
Manual 4xxxx display number
```

它会把最终真正发送的 Address Hi / Address Lo 字节直接展示出来。

学习重点是区分：

```text
Manual display number
≠ Software/API input value
≠ Modbus PDU address
≠ Actual frame bytes
```

`40001 → 0` 只是常见 Holding Register 编号约定的示例，不应被理解为所有设备/软件都固定如此；最终必须以当前设备手册、软件 API 约定和抓到的实际 Frame 为证据。
