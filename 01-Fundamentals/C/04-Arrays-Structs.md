# 04 — 数组、结构体与数据组织

## 数组在嵌入式中的典型用途

数组常用于：

- UART 接收缓冲区；
- ADC 采样数据；
- SPI 数据帧；
- 查表；
- 波形数据；
- DMA 缓冲区。

```c
unsigned char rx_buffer[128];
```

这里不是抽象语法，而是在内存中准备了一段连续空间。

## 结构体解决什么问题？

当多个数据属于同一个对象时，可以组合起来。

```c
typedef struct
{
    unsigned int baudrate;
    unsigned char data_bits;
    unsigned char stop_bits;
} UartConfig;
```

真实项目中经常用结构体表示：

- 配置；
- 设备状态；
- 通信数据帧；
- 驱动上下文；
- 寄存器布局。

## 结构体指针

```c
UartConfig config;
UartConfig *p = &config;

p->baudrate = 115200;
```

`->` 本质上就是“通过结构体指针访问成员”。

## 联系 MCU：寄存器映射

底层库常把一组相邻寄存器描述成结构体，然后让一个指针指向这组硬件地址。

因此以后看到类似：

```c
GPIOA->ODR
USART1->CR1
```

不要把它当成神秘语法。它通常可以理解为：

> 找到某个硬件外设对应的结构体，再访问其中某个寄存器成员。

## 最小实验

```c
#include <stdio.h>

typedef struct
{
    int id;
    float voltage;
} Channel;

int main(void)
{
    Channel channels[2] = {
        {1, 3.3f},
        {2, 5.0f}
    };

    for (int i = 0; i < 2; ++i)
    {
        printf("CH%d: %.1f V\n", channels[i].id, channels[i].voltage);
    }

    return 0;
}
```

## 完成标准

能够解释数组为什么适合缓冲区，并能够读懂：

```c
UART_HandleTypeDef *huart;
huart->Instance->CR1;
```

即使暂时不知道这些具体类型，也知道这里存在“指针 → 结构体成员 → 更底层对象”的访问链。