# Debugging Case — 运行一段时间后随机崩溃

## Symptom

某任务平时工作正常，只要进入数据处理路径就偶发 HardFault。增加日志后崩溃概率反而变化。

## Context

任务栈固定为 512 bytes，运行环境包含调用链、格式化函数和周期性数据处理。目标是证明栈使用量和越界风险，而不是无限增大栈直到现象消失。

## Evidence

- Task stack: 512 bytes；
- Function local buffer: `uint8_t temp[420];`；
- Function also calls formatting/logging routines；
- RTOS stack high-water mark before failure is extremely low；
- Fault location varies between runs。

## Hypotheses

- 局部 Buffer 和调用链造成 Stack Overflow；
- 某个 Heap 或 DMA Buffer 越界，表现恰好像栈问题；
- 日志改变了时序，掩盖了真正的竞争或未初始化值；
- 最后崩溃的函数就是直接根因。

## Experiments

1. 启用 RTOS stack checking / watermark；
2. 用 stack pattern 或 guard 检查高水位；
3. 增大栈仅作为验证实验，不作为最终修复；
4. 暂时移除大型局部对象和格式化调用，比较崩溃率；
5. 检查相邻内存和 DMA 边界，排除其他写入源；
6. 在压力、最深调用链和日志开启条件下重复运行。

## Root Cause

局部 Buffer 已经占据大部分任务栈，再叠加调用链和格式化函数所需栈空间，造成 Stack Overflow。栈破坏污染了保存的寄存器、返回地址或相邻数据，因此最终故障点可能变化。

## Fix

根据测量结果选择最小修复：

- 减少大型局部对象；
- 把明确需要长期存在的 Buffer 移到合适的静态/专用内存；
- 调整任务栈到有证据支持的安全余量；
- 保留 Stack Checking / watermark；
- 不用“无限增大栈”掩盖未理解的内存使用。

## Verification

- 高水位距离栈边界保持明确余量；
- 压力测试、最深调用链和日志开启时不触发 Stack Checking；
- Guard Pattern 不被覆盖；
- 相关功能输出正确；
- 连续回归时 Fault 位置和崩溃现象不再出现。

## Prevention

建立任务栈预算；把大 Buffer、格式化调用和递归风险纳入 Review；在 CI/板级测试中记录 high-water mark 和异常计数；对 DMA、Heap、Stack 边界分别保留 Guard。

## Lesson

“加大 Stack 后不崩了”是重要证据，但最终仍要理解真实 Stack Usage，而不是无限增大栈。

## Learning Links

- [Stage 04 — Debug Hunter](../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Stack & Memory Corruption](../../01-Knowledge-Base/Debugging/03-Stack-and-Memory-Corruption.md)
- [Task Stack & Deadline](../../01-Knowledge-Base/RTOS/08-Task-Stack-and-Deadline.md)
- [Stage 04 Boss Project](../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)
- [Stage 05 Boss Project](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)
