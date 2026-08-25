# C Basics for Beginners — 进入指针前先读懂最小 C 程序

这不是完整 C 教材，只解释 Stage 01 之前必须会读的最小结构。这里暂时不讨论指针、寄存器、线程或 MCU。

## 一个最小程序

```c
#include <stdio.h>

int main(void)
{
    int temperature = 25;
    printf("temperature = %d\n", temperature);
    return 0;
}
```

## 逐部分看

- `.c` 文件：保存 C 源码的文本文件；
- `#include <stdio.h>`：告诉编译器需要使用标准输入输出声明；
- `int main(void)`：程序从 `main` 函数开始；
- `{ ... }`：函数体；
- `int temperature = 25;`：声明一个整数变量并给它初值；
- `printf(...)`：调用函数输出内容；
- `return 0;`：告诉操作系统程序正常结束。

## 编译和运行

```text
C Source (.c)
→ Compiler
→ Executable
→ Run
→ Output
```

编译成功只表示源码可以生成程序；还要实际运行，才能观察输出。

## 进入 Stage 01 前自测

你不需要背语法，但应该能：

- 修改变量初值并预测输出；
- 写一个 `if/else`；
- 写一个从 0 数到 4 的 `for` 循环；
- 定义一个接收参数并返回整数的函数；
- 说明数组 `items[4]` 的合法下标是 `0`～`3`；
- 解释 `main`、`#include` 和 `return 0` 各自的作用。

如果这些内容还不熟，先回到 [Programming Warmup](../../02-Learning-Path/00-Programming-Warmup/README.md)，不要直接跳到 Pointer。
