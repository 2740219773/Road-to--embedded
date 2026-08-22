# Mission 02 — Bit Hacker：只想打开一个 LED，为什么其他灯全灭了？

## 故障现场

假设一个 8-bit 输出寄存器当前是：

```text
1010 0001
```

你只想把 bit5 设为 1，于是写了：

```c
reg = (1U << 5);
```

结果目标 LED 亮了，但原来亮着的其他 LED 全灭了。

你的任务：解释发生了什么，并修复它。

## Level 1 — Predict

先不要看答案。

计算：

```text
1U << 5 = ?
```

再预测 `reg = (1U << 5)` 后 8 个 bit 会变成什么。

## Level 2 — 两种操作不是一回事

```c
reg =  (1U << 5);
reg |= (1U << 5);
```

第一句整体赋值；第二句读取旧值，与 mask 做 OR 后再写回。

请用纸或 Interactive Lab 分别计算结果。

## Level 3 — Register Playground

在 32-bit Register Playground 中：

1. 随机打开几个 bit；
2. 执行 Set bit5；
3. Clear bit5；
4. Toggle bit5；
5. 比较整体赋值与 Read-Modify-Write。

## Level 4 — Break It

给出三个版本：

```c
reg =  (1U << 5);
reg |= (1U << 5);
reg &= ~(1U << 5);
```

不运行，先预测每一个操作会产生什么结果。

## Level 5 — 进入 MCU

真实 GPIO、Timer、UART 等寄存器都由许多 bit/bit-field 组成。

位运算不是为了考试，而是为了在不破坏无关状态的情况下修改目标控制位。

注意：某些硬件寄存器具有特殊写入语义，不能机械使用 Read-Modify-Write，必须以芯片 Reference Manual 为准。

## Boss

写出三个操作：Set bit N、Clear bit N、Toggle bit N，并解释为什么每个表达式不会无意改变其他普通读写 bit。

## Achievement

看到下面表达式时能够直接解释 mask 和结果：

```c
reg |=  (1U << n);
reg &= ~(1U << n);
reg ^=  (1U << n);
```

下一步：把这些操作真正放进 GPIO 控制。