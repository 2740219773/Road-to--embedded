# Evidence Pack — Stack

## Symptom

任务运行一段时间后随机崩溃，日志改变了崩溃位置。

## Static / Host Evidence

```text
stack capacity = 512 bytes
local buffer = 420 bytes
call-chain overhead = 160 bytes
peak model = 580 bytes
```

这是栈预算模型，不代表真实 RTOS watermark。目标平台需要启用 Stack Checking、填充 pattern 并执行压力回归。
