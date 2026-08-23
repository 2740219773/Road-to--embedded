# I²C Bus Visualizer

浏览器直接打开 `index.html`，无需构建。

## 它解决什么问题

I²C 初学最容易把几个不同概念混在一起：

```text
7-bit Device Address
≠ Address Byte on wire
≠ ACK result
≠ Physical bus condition
```

这个工具允许分别设置：

- Device 的 7-bit Address；
- Master 实际想访问的 7-bit Address；
- Read / Write 方向；
- Data Byte；
- Device Power；
- Pull-up 是否存在。

工具会展示：

```text
START
→ 7-bit Address
→ R/W bit
→ Address ACK / NACK
→ Data phase
→ STOP
```

同时计算：

```text
Address Byte = (7-bit Address << 1) | R/W
```

例如设备地址 `0x50`：

```text
Write address byte = 0xA0
Read  address byte = 0xA1
```

`0xA0 / 0xA1` 包含 R/W bit，并不代表设备突然有了另一个 7-bit Address。

## 推荐实验

### Experiment A — Address Match

```text
Device = 0x50
Master = 0x50
Pull-up = ON
Power = ON
```

观察 Address ACK。

### Experiment B — Wrong Address

只把 Master 改成 `0x51`，观察 Address NACK。

### Experiment C — No Pull-up

恢复正确地址，只关闭 Pull-up。

这时重点不是 ACK，而是理解：SDA/SCL 连合法 HIGH 电平都无法形成，协议分析应该先暂停。

### Experiment D — Read / Write

保持 7-bit Address 不变，只切换 Read / Write，观察 on-wire Address Byte 为什么从 `0xA0` 变成 `0xA1`。

## Navigation

- Stage：[Stage 03 — Peripheral Engineer](../../02-Learning-Path/Stage-03-Peripheral-Engineer/README.md)
- Mission：[I²C No ACK](../../04-Missions/Stage-03-Peripherals/02-I2C-No-ACK/Mission.md)
- Knowledge：[I²C](../../01-Knowledge-Base/Protocols/02-I2C.md)
- Debug Case：[I²C No ACK Case](../../06-Debugging-Cases/I2C-No-ACK/CASE.md)

学习重点不是把 NACK 等同于“地址错”，而是学会先分清：**物理总线条件、设备状态、地址语义和协议响应。**