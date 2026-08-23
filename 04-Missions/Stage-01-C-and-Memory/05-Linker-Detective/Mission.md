# Mission 05 — Linker Detective：代码看起来都对，为什么就是生成不了程序？

## Mission Brief

你接手一个很小的 C 工程：

```text
main.c
motor.c
motor.h
```

IDE 里没有明显红线，函数名也拼对了，但 Build 最后出现：

```text
undefined reference to `motor_start`
```

很多新人第一反应是继续修改 `main.c`。

这关训练的是另一个习惯：**先判断错误发生在哪个构建阶段。**

---

## 0. Before You Start

先读：[Compilation & Linking](../../../01-Knowledge-Base/C/08-Compilation-and-Linking.md)

只需要先认识：

```text
.c
→ Compiler
→ .o
→ Linker
→ Executable
```

Compiler 和 Linker 是两个不同角色。

---

## 1. Scene A — Undefined Reference

`motor.h`：

```c
#ifndef MOTOR_H
#define MOTOR_H

void motor_start(void);

#endif
```

`main.c`：

```c
#include "motor.h"

int main(void)
{
    motor_start();
    return 0;
}
```

但工程中没有 `motor_start()` 的真正定义。

### Predict

先回答：

1. `main.c` 本身语法合法吗？
2. Compiler 有没有可能成功生成 `main.o`？
3. 最后是谁发现 `motor_start` 没有实体？

### Fix

在 `motor.c` 中真正定义函数，并确保这个源文件参与构建。

注意第二个条件：**文件存在于文件夹里，不代表一定参与了当前工程的编译。**

---

## 2. Scene B — Multiple Definition

现在把下面代码错误地写进 `motor.h`：

```c
int motor_state = 0;
```

然后让 `main.c` 和 `motor.c` 都 include 这个头文件。

观察构建结果。

### Investigate

画出：

```text
main.c  → main.o  → motor_state definition
motor.c → motor.o → motor_state definition
                         ↓
                       Linker
                         ↓
                Which one is the real one?
```

理解为什么这不是简单的“变量不能写在头文件”口诀，而是 Linker 最终看到了多个同名全局实体。

---

## 3. Repair the Interface

把头文件改成声明：

```c
extern int motor_state;
```

并只在一个 `.c` 文件里真正定义：

```c
int motor_state = 0;
```

现在解释：

```text
extern declaration
≠
object definition
```

---

## 4. Build Pipeline Map

给下面每种错误放到最可能的阶段：

```text
missing ;
unknown type name
undefined reference
multiple definition
Flash region overflowed
```

分类成：

```text
Preprocess / Compile / Link / Memory Layout
```

不要求所有工具链文字完全一样，但要能解释为什么这样分类。

---

## 5. Embedded Transfer

以后 STM32/MCU 工程出现：

```text
undefined reference to HAL_xxx
```

不要立刻认为 HAL 函数写错了。

先建立假设：

- 对应 `.c` 有没有加入工程；
- 条件编译有没有把实现排除；
- 库有没有真正参与链接；
- 函数声明和定义名称/签名是否一致。

而看到：

```text
region `FLASH` overflowed
```

则应该想到最终程序正在被安排进有限的 MCU Memory，而不是继续找 C 语法错误。

---

## 6. Evidence Rule

本关禁止只写：

> “编译失败了。”

必须写清楚：

```text
Build failed at: Compile / Link / Layout
Evidence:
Hypothesis:
Fix:
Verification:
```

这会成为后续 Debugging Track 的基础习惯。

---

## 7. Mission Report

提交：

```text
Scene A failure stage:
Why declaration was not enough:
Scene B failure stage:
Why extern fixed the interface:
One way a .c file can exist but still not be linked:
How I distinguish compiler error from linker error:
```

---

## Achievement Unlocked

完成后，你应该能看到构建日志先判断“谁在报错”，而不是把所有 Build Failure 都叫成编译错误。

Stage 01 的五个核心 Mission 至此形成：

```text
Memory
→ Bit/Register
→ volatile
→ Struct/Layout
→ Compile/Link
```

下一步进入 Stage 01 Debug Challenge 和 Boss Project，把这些知识放进同一个小工程里。