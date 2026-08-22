# 06 — 函数指针与回调

## 为什么需要函数指针？

普通指针保存数据地址，函数指针保存函数入口地址。

```c
void led_on(void)
{
}

void (*action)(void) = led_on;
action();
```

## 嵌入式中的常见场景

- 回调函数；
- 中断处理框架；
- 驱动接口；
- 状态机；
- 命令分发表；
- Bootloader 跳转；
- HAL 库回调机制。

## 回调的直觉

不是 A 函数现在直接完成所有事情，而是：

> A 先保存“以后需要调用谁”，事件发生时再调用它。

这会在 UART 接收完成、DMA 完成、中断、异步驱动中大量出现。

## 最小实验

```c
#include <stdio.h>

void on_success(void)
{
    printf("success\n");
}

void execute(void (*callback)(void))
{
    printf("working...\n");
    callback();
}

int main(void)
{
    execute(on_success);
    return 0;
}
```

## 完成标准

能够看懂：

```c
void register_callback(void (*cb)(int));
```

并解释这里传入的不是普通数据，而是一个可被后续调用的函数。