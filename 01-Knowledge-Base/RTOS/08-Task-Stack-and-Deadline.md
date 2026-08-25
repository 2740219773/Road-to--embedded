# Task Stack & Deadline — 任务为什么会“偶发崩溃”或“来不及做完”？

## Task Stack 先理解成“每个任务自己的临时工作区”

每个 Task 通常都有自己的 Stack，用来保存函数调用、局部变量和运行现场。

如果 Stack 太小，任务可能越界破坏其他内存，表现成随机崩溃、变量异常或 HardFault。

所以 RTOS 里经常关注：

- Stack Size；
- Stack High-Water Mark；
- 大型局部数组；
- 深层函数调用；
- 格式化打印等高栈消耗操作。

## Deadline 是什么？

Deadline 可以先理解成：**这件事最晚必须在什么时候完成。**

例如传感器要求每 1 ms 处理一次，如果某个任务经常 2 ms 才处理完，即使程序没有崩溃，也已经不满足实时要求。

## 实时性不等于“跑得快”

真正关注的是可预测性：重要任务是否能在要求时间内稳定完成。

## 调试证据

- Task execution time；
- Wake-up period；
- Jitter；
- Deadline miss count；
- Stack high-water mark。

## 目标

从“系统能运行”升级到“我能证明关键任务在时间和内存上都有余量”。
