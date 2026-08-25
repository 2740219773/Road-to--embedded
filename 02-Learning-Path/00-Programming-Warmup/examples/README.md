# Warmup Examples

这些是零基础热身的最小可运行样例。每个文件都可以单独编译。

从仓库根目录执行：

```powershell
gcc 02-Learning-Path/00-Programming-Warmup/examples/01-variable.c -o warmup.exe
.\warmup.exe
```

也可以把 `gcc` 替换为 `clang`，或在 Developer PowerShell 中使用 `cl`。

推荐顺序：

1. `hello.c`：确认编译器、终端和运行路径正常；
2. `01-variable.c`：变量保存的数据；
3. `02-condition.c`：条件选择路径；
4. `03-loop.c`：循环次数和循环变量；
5. `04-function.c`：函数输入和返回值；
6. `05-array.c`：数组下标和边界。

每次运行前先预测输出，运行后再填写 [学习记录模板](../../../docs/LEARNING-RECORD-TEMPLATE.md)。

## 每个样例的检查任务

| 文件 | 目标 | 预期关键输出 | 常见错误 | 自测问题 |
|---|---|---|---|---|
| `hello.c` | 验证编译器和运行路径 | `Hello, embedded world!` | 当前目录或输出文件路径错误 | 编译成功是否等于程序已经运行？ |
| `01-variable.c` | 观察变量值变化 | `temperature = 25`、`temperature = 80` | 只改输出文字，没有改变量 | 哪一行改变了变量？ |
| `02-condition.c` | 观察条件分支 | `OK`、`OK`、`ALARM` | 把 `>` 误写成 `>=` | 阈值等于 50 时走哪条路径？ |
| `03-loop.c` | 区分次数和变量 | `index = 0` 到 `index = 4` | 把 `< 5` 写成 `<= 5` | 循环体执行几次？ |
| `04-function.c` | 理解参数和返回值 | `max(2, 5) = 5` 等 | 忘记 `return` 或参数顺序混乱 | 函数解决了哪一段重复逻辑？ |
| `05-array.c` | 理解下标和边界 | `samples[0]` 到 `samples[3]` | 访问 `samples[4]` | 为什么数组从 0 开始？ |

这些样例只服务于 C 基础，不要求学习者在这里理解 Pointer、Register、ISR 或 MCU。
