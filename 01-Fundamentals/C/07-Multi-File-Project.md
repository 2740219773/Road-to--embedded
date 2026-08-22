# 07 — 多文件工程、头文件与模块化

真实嵌入式工程不会把全部代码写在 `main.c`。

## 一个最小模块

```text
project/
├─ main.c
├─ led.c
└─ led.h
```

`led.h` 声明模块对外提供什么：

```c
#ifndef LED_H
#define LED_H

void led_init(void);
void led_on(void);
void led_off(void);

#endif
```

`led.c` 实现这些功能，并可以保留内部细节：

```c
#include "led.h"

static int led_state;

void led_init(void)
{
    led_state = 0;
}
```

`main.c` 只使用公开接口。

## 必须理解

- `.h` 与 `.c` 的基本分工；
- 声明与定义；
- `#include`；
- include guard；
- `extern`；
- 文件级 `static`；
- 为什么不要把所有全局变量暴露出去；
- 模块边界。

## 联系真实工程

后面 STM32 项目中会看到：

- BSP；
- Driver；
- Protocol；
- Application；
- Config。

这些本质上都是在解决“大工程如何拆分和协作”的问题。

## 练习

把一个单文件 C 程序拆成：

```text
main.c
sensor.c
sensor.h
```

要求 `main.c` 不直接访问 `sensor.c` 的内部状态，只通过函数接口访问。

## 完成标准

能够建立一个至少包含 3 个 `.c` 文件的工程，并理解为什么头文件里通常放声明而不是随意放变量定义。