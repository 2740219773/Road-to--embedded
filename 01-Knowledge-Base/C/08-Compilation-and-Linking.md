# Compilation & Linking — 为什么代码没有语法错误，程序还是造不出来

## 先建立整条流水线

你写的 `.c` 文件不能直接被 CPU 执行。

从源码到最终程序，中间要经过几道不同工作：

```text
Source (.c/.h)
↓ Preprocess
展开 #include / #define 等内容
↓ Compile
把每个 C 源文件分别翻译成目标代码
↓ Object Files (.o/.obj)
多个“半成品零件”
↓ Link
把零件和库连接起来，解决彼此引用
↓ ELF / Executable
完整程序
↓（嵌入式常见）
HEX / BIN
↓
MCU Flash
```

可以把它想成造机器：Compiler 负责分别加工零件，Linker 负责确认所有零件接口都能接上，并组装成最终机器。

## Compile Error 是什么

Compiler 主要看当前正在翻译的源文件。

例如：

```c
int x = ;
```

语法本身就无法理解，通常在 Compile 阶段失败。

## Link Error 是什么

下面的代码可能完全符合 C 语法：

```c
void motor_start(void);

int main(void)
{
    motor_start();
    return 0;
}
```

Compiler 可以理解：“这里要调用一个叫 `motor_start` 的函数。”

但如果整个工程最终没有任何地方真正定义：

```c
void motor_start(void)
{
    // ...
}
```

Linker 在组装最终程序时就会问：

> `motor_start` 到底在哪里？

于是出现常见的：

```text
undefined reference to `motor_start`
```

所以 `undefined reference` 往往不是“这一行 C 语法写错了”，而是整个工程里的符号没有正确连接起来。

## Declaration 和 Definition

第一次学习可以这样区分：

```c
void motor_start(void);
```

Declaration（声明）：告诉编译器“有这样一个名字和接口”。

```c
void motor_start(void)
{
}
```

Definition（定义）：真正提供这个函数实体。

声明像通讯录里写“有这个人”，定义则像这个人真的存在于某个目标文件里。

## 为什么会出现 Multiple Definition

另一个方向的问题是：同一个全局符号被多个目标文件重复定义。

例如错误地在头文件里直接放：

```c
int system_state = 0;
```

然后多个 `.c` 都 include 它，就可能让 Linker 最终看到多个同名实体。

这也是为什么 `.h` 和 `.c` 的职责不能完全混在一起。

## Object File 是什么

每个 `.c` 通常先独立生成一个 Object File。它已经包含机器代码，但里面可能还留着“我要调用另一个文件里的某个函数”这样的未解决引用。

Linker 的工作之一，就是把这些引用和真正定义配对。

## 嵌入式为什么还会遇到 Linker Script

MCU 的 Flash 和 RAM 地址、大小不是无限的。

Linker 最终还需要知道：

```text
代码放 Flash 哪儿？
全局变量放 RAM 哪儿？
Stack / Heap 怎么安排？
中断向量表放哪儿？
```

Linker Script（链接脚本）就是描述这类内存布局规则的重要文件。

Stage 01 不要求你马上会写复杂链接脚本，只需要先知道：**最终程序不仅要“代码正确”，还必须被正确地组织进目标机器的内存。**

## 新手排错第一问

以后看到构建失败，先不要统一叫“编译错误”。

先判断：

```text
Compiler 报错？
还是
Linker 报错？
```

这一个分类动作，就能大幅缩小调查范围。

下一步进入 Mission 05 — Linker Detective，故意制造 `undefined reference` 和重复定义，亲手把错误定位到正确阶段。
