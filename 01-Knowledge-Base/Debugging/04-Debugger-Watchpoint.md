# Debugger Watchpoint — 谁偷偷改了这个变量？

Breakpoint 回答“程序什么时候走到这里”，Watchpoint 更适合回答“谁修改了这个地址”。

## 典型场景

某个状态变量偶尔从 `READY` 变成非法值，但全局搜索发现几十处代码可能写它。与其在几十处逐个下断点，不如监视这个变量对应的内存地址。

```text
Corrupted Object
→ Find Address
→ Set Data Watchpoint
→ Continue
→ CPU stops on access/write
→ Inspect PC / Call Stack
```

## 注意

硬件 Watchpoint 数量有限，支持的地址范围、访问类型和长度取决于调试架构与工具。DMA 等非 CPU bus master 的写入也未必能被普通 CPU data watchpoint 捕获。

## 关键能力

知道什么时候应该从“跟踪控制流”切换到“监视数据流”。
