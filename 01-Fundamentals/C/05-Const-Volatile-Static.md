# 05 — const、volatile、static

这三个关键字在普通入门 C 教程里可能只是几个语法点，但在嵌入式项目中非常重要。

## const

表示程序不应通过当前接口修改对象。

```c
const unsigned char table[] = {1, 2, 3, 4};
```

常见场景：配置表、查找表、只读参数、API 输入数据。

## volatile

告诉编译器：这个对象的值可能在当前代码看不到的地方发生变化，因此每次都应该真正读取它，而不能想当然地使用之前的结果。

典型场景：

- 硬件寄存器；
- 中断和主程序共享的标志；
- 某些并发访问对象。

```c
volatile unsigned int flag = 0;
```

### 为什么寄存器常带 volatile？

因为硬件可能自行改变寄存器内容。

例如 UART 接收到数据后，状态寄存器某一位可能由硬件置 1，而不是由你的 C 代码赋值。

## static

`static` 的含义取决于使用位置。

### 函数内部

```c
void count_call(void)
{
    static int count = 0;
    count++;
}
```

`count` 会保留上一次调用后的值。

### 文件作用域

```c
static int internal_state;
static void internal_function(void);
```

常用于把变量或函数限制在当前 `.c` 文件内部，是模块封装的重要工具。

## 一个重要提醒

`volatile` **不是线程安全，也不是原子操作保证。**

它主要解决编译器优化与“值可能被外部改变”之间的问题。后面学习中断和 RTOS 时会进一步区分这些概念。

## 阅读练习

解释：

```c
#define STATUS_REG (*(volatile unsigned int *)0x40000000U)
```

为什么这里的对象可能需要 `volatile`？

## 完成标准

能分别用一句话解释 `const`、`volatile`、`static` 在嵌入式项目中的主要用途，并知道 `volatile` 为什么经常出现在寄存器定义里。