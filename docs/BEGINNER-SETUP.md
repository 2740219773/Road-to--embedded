# Beginner Setup — 第一次把代码跑起来

这份说明只解决一个问题：在进入 Stage 01 前，你能不能在自己的 Windows PC 上编译并运行一个最小 C 程序。

## 你需要什么

| 工具 | 作用 | 新手最低要求 |
|---|---|---|
| 编辑器 | 写 `.c` 文件 | VS Code、Notepad++ 或其他纯文本编辑器 |
| C 编译器 | 把 C 源码变成程序 | GCC、Clang 或 MSVC |
| PowerShell | 执行编译和程序 | Windows 自带 |
| 浏览器 | 运行 Interactive Lab | Edge、Chrome 或 Firefox |

Stage 00～01 不需要开发板、示波器或调试器。

## 推荐的 Windows 验证路径

你可以使用已经安装的 GCC、Clang 或 Visual Studio Developer PowerShell。课程不要求三套工具同时存在。

### 路径 A：GCC / MinGW

在 PowerShell 中确认：

```powershell
gcc --version
```

如果能输出版本号，进入仓库根目录后运行：

```powershell
gcc 02-Learning-Path/00-Programming-Warmup/examples/hello.c -o hello.exe
.\hello.exe
```

### 路径 B：Clang

确认：

```powershell
clang --version
```

编译和运行：

```powershell
clang 02-Learning-Path/00-Programming-Warmup/examples/hello.c -o hello.exe
.\hello.exe
```

### 路径 C：MSVC

在 Visual Studio Developer PowerShell 中确认：

```powershell
cl
```

编译和运行：

```powershell
cl /W4 /EHsc 02-Learning-Path/00-Programming-Warmup/examples/hello.c
.\hello.exe
```

如果 `gcc`、`clang` 和 `cl` 都找不到，不要继续猜命令。先安装一套 C 开发工具，或者请有经验的人帮你完成工具安装；课程本身不把全局 PATH 修改当作学习任务。

## 第一次成功的判定

看到下面的输出，才算完成“环境检查”：

```text
Hello, embedded world!
```

同时记录：

```text
Compiler:
Compiler version:
Command:
Program output:
```

## 常见问题

| 现象 | 先检查 |
|---|---|
| `gcc is not recognized` | 是否安装 GCC，当前终端是否能找到它 |
| `cl is not recognized` | 是否使用 Visual Studio Developer PowerShell |
| 找不到 `hello.c` | 当前目录是否是仓库根目录，路径是否完整 |
| 编译成功但无法运行 | PowerShell 中使用 `.\\hello.exe` |
| 输出和预期不同 | 先确认运行的是刚刚生成的 exe，不要修改多个地方后再试 |

## 和学习路线的关系

```text
环境检查
→ Programming Warmup
→ Stage 00 System Map
→ Stage 01 C & Memory
```

这一步只证明 PC 能运行 C 程序，不代表已经会 C，也不代表已经能控制 MCU。
