# 编译与链接

从源代码到 MCU 中运行的程序通常经历：

```text
.c/.h
↓ preprocess
translation / compile
↓
object files
↓ link
ELF
↓ objcopy / programming
HEX / BIN → MCU Flash
```

编译错误通常发生在单个翻译单元；链接错误则常意味着符号定义、库或目标文件之间没有正确连接。

理解这条链路后，`undefined reference`、重复定义、链接脚本和启动文件就不再是孤立术语。
