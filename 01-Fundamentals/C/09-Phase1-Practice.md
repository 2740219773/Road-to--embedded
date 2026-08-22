# 09 — Phase 1 综合练习：模拟一个极简 MCU 寄存器

这一练习不需要真实开发板，用普通 C 程序把前面的知识串起来。

## 目标

模拟一个 32 位 GPIO 输出寄存器：

- bit0：LED1；
- bit1：LED2；
- bit2：Relay；
- 其他位暂不使用。

## 第一步：定义寄存器

```c
#include <stdint.h>

volatile uint32_t GPIO_ODR = 0;
```

## 第二步：实现操作函数

要求自己实现：

```c
void led1_on(void);
void led1_off(void);
void led2_on(void);
void led2_off(void);
void relay_on(void);
void relay_off(void);
```

只能通过位运算修改对应 bit，不能为了打开一个 LED 而覆盖整个寄存器。

## 第三步：封装模块

把工程拆成：

```text
main.c
gpio_sim.c
gpio_sim.h
```

内部寄存器尽量不要直接暴露给 `main.c`。

## 第四步：增加状态读取

增加接口：

```c
int led1_is_on(void);
int led2_is_on(void);
int relay_is_on(void);
```

## 第五步：打印寄存器

每次操作后打印十六进制结果，例如：

```text
GPIO_ODR = 0x00000005
```

并能人工解释为什么是这个值。

## 第六步：故意制造问题

至少尝试：

1. 把 `|=` 错写成 `=`，观察为什么其他 bit 会丢失；
2. 把 bit 编号写错；
3. 在头文件和源文件中制造一次声明/定义不一致；
4. 制造一次链接错误并修复。

## 最终自测

不查答案，解释下面代码的每一个组成部分：

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))

REG32(0x40020014U) |= (1U << 5);
```

需要解释：

- `0x40020014U`；
- `(volatile uint32_t *)`；
- `*`；
- `REG32`；
- `1U`；
- `<< 5`；
- `|=`。

如果能够逐层解释，并能够完成前面的模拟工程，就可以进入 STM32 主线。

## Phase 1 完成标准

- 能读懂常见指针代码；
- 能进行基本寄存器位操作；
- 能理解结构体指针；
- 知道 `volatile` 为什么存在；
- 能拆分简单多文件工程；
- 能区分编译错误和链接错误；
- 对代码、地址、内存和硬件寄存器之间的关系建立基本直觉。