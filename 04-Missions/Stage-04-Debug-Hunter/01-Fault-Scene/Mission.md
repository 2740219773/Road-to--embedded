# Mission — Fault Scene：不要重启，先保护现场

## Scene

程序突然进入 HardFault_Handler。你只有 Debugger，没有日志，也不知道是哪一层出错。

你的第一任务不是修复，而是保护证据。

## Investigation Order

1. 不立即 Reset。
2. 记录当前异常类型。
3. 获取异常入栈现场。
4. 找到 Stacked PC / LR。
5. 读取可用 Fault Status Registers。
6. 若 fault address valid，记录地址。
7. 将 PC 映射回指令和源码。
8. 再建立根因假设。

## Anti-Pattern

```text
HardFault → 加延时 → 不行 → 改优化等级 → 不行 → 加 Reset
```

这会不断破坏现场，却没有增加可靠信息。

## Boss

从 `06-Debugging-Cases/HardFault-Bad-Pointer/` 开始，只依据 Evidence Pack 写一份 10 行以内的调查记录：现象、关键证据、根因、验证方法。

## Achievement

遇到 crash 时，第一反应从“让它重新跑起来”变成“先保存能解释为什么崩溃的证据”。