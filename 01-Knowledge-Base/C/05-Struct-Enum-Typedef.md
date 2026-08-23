# struct、enum 与 typedef — 把一堆零散变量组织成“一个东西”

## 先从一个很普通的问题开始

假设程序需要保存一个传感器的状态：

```c
uint16_t value;
uint8_t channel;
uint8_t online;
```

这三个变量其实描述的是同一个“传感器”。变量少的时候还能记住，设备一多就很容易乱。

`struct`（结构体）就是 C 语言提供的一种“把相关数据装进同一个盒子”的方法：

```c
struct Sensor {
    uint16_t value;
    uint8_t channel;
    uint8_t online;
};
```

现在 `Sensor` 不再只是三个散落的变量，而是一个有内部结构的数据对象。

可以先把它想成一张设备信息卡：卡片是一个整体，里面有测量值、通道号和在线状态几个格子。

## struct 在内存里是什么

结构体最终仍然要占用 Memory。它的成员通常按照一定规则排列在一段连续地址附近：

```text
低地址
┌──────────────┐
│ value        │
├──────────────┤
│ channel      │
├──────────────┤
│ online       │
├──────────────┤
│ padding ?    │
└──────────────┘
高地址
```

这里第一次出现一个新词：Padding（填充）。CPU/编译器为了更方便地访问数据，可能在成员之间或末尾留下没有业务含义的空字节。

所以：

```c
sizeof(struct Sensor)
```

不一定永远等于“每个成员大小简单相加”。

这件事以后处理通信协议、二进制文件、DMA 和硬件寄存器映射时会非常重要。

## `.` 和 `->` 是什么

如果手里直接有一个结构体对象：

```c
struct Sensor s;
s.channel = 2;
```

使用 `.` 访问成员。

如果手里保存的是这个结构体的 Pointer：

```c
struct Sensor *p = &s;
p->channel = 2;
```

使用 `->`。

可以暂时把：

```c
p->channel
```

理解成“通过地址找到这个 Sensor，再访问里面的 channel”。

这正好把 Stage 01 前面学过的 Pointer 和 Struct 连了起来。

## 为什么嵌入式里经常看到 `GPIOA->ODR`

芯片厂商经常用结构体描述一组硬件寄存器，再让一个 Pointer 指向这组寄存器所在的固定硬件地址。

于是：

```c
GPIOA->ODR
```

表面看起来像普通对象字段访问，背后可能意味着：

```text
GPIOA
→ 一个固定外设地址
→ 按结构体布局找到 ODR 的偏移
→ 访问真实硬件寄存器
```

所以结构体不是只用来写“学生姓名和年龄”的语法练习，它是理解真实 MCU 驱动代码的重要桥梁。

## enum 是什么

如果设备状态只有几种：

```text
0 = OFF
1 = STARTING
2 = RUNNING
3 = ERROR
```

程序里到处写 `0/1/2/3` 很难读。

`enum`（枚举）可以给这些离散状态起名字：

```c
typedef enum {
    DEVICE_OFF,
    DEVICE_STARTING,
    DEVICE_RUNNING,
    DEVICE_ERROR
} DeviceState;
```

重点不是“enum 比整数高级”，而是让代码表达业务含义。

## typedef 是什么

`typedef` 给已有类型起一个更方便或更有意义的名字。

例如：

```c
typedef struct {
    uint16_t value;
    uint8_t channel;
} Sensor;
```

以后可以直接写：

```c
Sensor sensor1;
```

而不需要每次都写完整的 `struct ...`。

## 初学阶段真正要掌握什么

先掌握四件事：

1. Struct 把相关数据组织成一个整体；
2. Struct 仍然真实占用 Memory，并存在布局；
3. Pointer + `->` 可以通过地址访问结构体成员；
4. `enum` 和 `typedef` 主要帮助程序表达得更清楚。

下一步不要继续背定义，进入 Mission 04 — Struct Explorer，亲手观察成员地址、`sizeof` 和 Padding。