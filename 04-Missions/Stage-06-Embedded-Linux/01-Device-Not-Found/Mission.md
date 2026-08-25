# Mission — Device Not Found：应用为什么看不到设备？

## Related

- [Stage 06 — Embedded Linux](../../../02-Learning-Path/Stage-06-Embedded-Linux/README.md)
- [Knowledge — Linux System Layers](../../../01-Knowledge-Base/Embedded-Linux/02-Linux-System-Layers.md)
- [Knowledge — Process / File / Device](../../../01-Knowledge-Base/Embedded-Linux/03-Process-File-Device.md)
- [Knowledge — Device Tree](../../../01-Knowledge-Base/Embedded-Linux/05-Device-Tree.md)

> Stage 06 当前是 V2.1 的纵向样板阶段，尚未建设完整 Interactive Lab、Debug Case 和 Boss Project。这里不创建空链接。

## Scene

应用程序启动后提示：

```text
open /dev/my_sensor failed
```

你知道板子上确实焊了传感器，也知道对应 Driver 已经包含在系统里。

不要立刻修改应用代码。

## 调查链

```text
Application
→ /dev Device Node
→ Driver bound?
→ Device Tree correct?
→ Bus / Pin / Clock
→ Physical Device
```

## Beginner Hint

`/dev/my_sensor` 不是传感器本身，而是 Linux 提供给应用访问设备的一个系统入口。这个入口通常只有在 Kernel 识别设备并让合适的 Driver 接管后才会出现。

## Investigation

1. `/dev` 下是否真的存在目标节点；
2. Kernel log 是否发现对应硬件或报错；
3. Driver 是否加载/匹配；
4. Device Tree 的 compatible、status、bus address 是否正确；
5. I2C/SPI 等底层总线是否真正看得到器件；
6. 最后再检查应用路径和权限。

## Break It

分别制造 `status = disabled`、错误 compatible、错误 I2C address，并记录“同样是应用打不开设备”，系统证据如何不同。

## Boss

给出一份应用错误、Kernel log 和 Device Tree 片段，判断故障最可能在应用、Driver 匹配还是板级描述层，并写出下一步验证动作。

## Achievement

从“/dev 文件不存在”看到的是一条跨层链路，而不是只把它当成普通文件路径错误。
