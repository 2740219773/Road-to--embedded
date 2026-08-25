# UART Frame Visualizer

## Beginner Start

- 第一次操作：使用 `0x55`、TX 115200、RX 115200；
- 预期观察：TX/RX 采样点对齐，Frame 能正确解码；
- 观察不到：先恢复默认 Baud，再确认 TX/RX 两个输入没有混淆；
- Mission Integration：对应 UART Garbled 的 Baud / Frame / Sampling 调查。

浏览器直接打开 `index.html`，无需安装依赖或构建。

## 它现在解决什么问题

这个工具不是只展示“UART 有几个 bit”，而是帮助你观察：

```text
Byte
→ 8N1 Frame
→ TX bit time
→ RX sampling time
→ sampling drift
→ decoded byte / frame error
```

可以分别设置：

- 发送端 TX Baud；
- 接收端 RX Baud；
- 待发送 Byte。

工具会显示：

- Start / D0～D7 / Stop；
- LSB first；
- TX bit time 和一帧持续时间；
- RX 每个数据位的采样时间；
- 每个采样点实际上落在 TX 的哪一位；
- 接收端最终解出的 Byte；
- Stop bit 是否有效。

## 推荐实验

先使用：

```text
Byte = 0x55
TX = 115200
RX = 115200
```

观察正常采样。

然后只改变 RX：

```text
RX = 57600
```

观察采样点怎样逐位漂移。

`0x55` 的二进制位交替变化，真实示波器实验里也很适合用来观察 UART bit time。

## Navigation

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[UART Garbled](../../04-Missions/Stage-03-Peripherals/01-UART-Garbled/Mission.md)
- Knowledge：[UART](../../01-Knowledge-Base/Protocols/01-UART.md)
- Debug Case：[UART Garbled Case](../../06-Debugging-Cases/UART-Garbled/CASE.md)

这个 Lab 的核心目的，是让“软件 Baud 配置”和“真实采样时刻”第一次变成可以直接操作的东西。
