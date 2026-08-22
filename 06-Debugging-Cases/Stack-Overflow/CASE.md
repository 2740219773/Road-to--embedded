# Debugging Case — 运行一段时间后随机崩溃

## Symptom

某任务平时工作正常，只要进入数据处理路径就偶发 HardFault。增加日志后崩溃概率反而变化。

## Evidence Pack

- Task stack: 512 bytes
- Function local buffer: `uint8_t temp[420];`
- Function also calls formatting/logging routines
- RTOS stack high-water mark before failure is extremely low
- Fault location varies between runs

## Your Task

为什么崩溃位置不固定？为什么“最后崩溃的函数”可能没有 bug？下一步应该怎样证明栈溢出？

## Diagnosis

局部 buffer 已经占据大部分任务栈，再叠加调用链和格式化函数所需栈空间，存在明显 stack overflow 风险。栈破坏后可能污染保存的寄存器、返回地址或相邻数据，因此最终故障点可能变化。

## Verification

启用 RTOS stack checking / watermark，填充 stack pattern，增大栈仅作为验证实验，同时评估是否应减少大型局部对象、调整设计或改变内存分配位置。

## Lesson

“加大 stack 后不崩了”是重要证据，但最终仍要理解真实 stack usage，而不是无限增大栈。

## Learning Links

- [Stage 04 — Debug Hunter](../../02-Learning-Path/Stage-04-Debug-Hunter/README.md)
- [Stage 05 — RTOS Engineer](../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Stack & Memory Corruption](../../01-Knowledge-Base/Debugging/03-Stack-and-Memory-Corruption.md)
- [Task Stack & Deadline](../../01-Knowledge-Base/RTOS/08-Task-Stack-and-Deadline.md)
- [Stage 04 Boss Project](../../05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/PROJECT.md)
- [Stage 05 Boss Project](../../05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/PROJECT.md)
