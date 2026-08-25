# Stage 00 Exit Check — 你能画出系统地图了吗？

## 任务

不打开其他页面，完成下面四项：

1. 区分 MCU、SoC、FPGA 和普通 CPU 的基本定位；
2. 解释 PC 端代码为什么不能直接等同于 MCU 上的固件；
3. 画出一段 C 代码到真实引脚的路径；
4. 给“程序没有运行”和“程序运行但引脚没有输出”分别提出一个高价值验证动作。

## 必须包含的系统链

```text
代码
→ 编译/链接
→ Flash
→ CPU
→ RAM / Register
→ 外设
→ Pin
→ 真实设备
```

## 通过标准

- 能用自己的话解释每个节点，而不是只写缩写；
- 能指出至少一个软件证据和一个物理证据；
- 能说明下一阶段为什么要学习 Address、Pointer、Bit 和 Register；
- 遇到不确定时，能够提出测量或观察动作，而不是直接猜答案。

如果还不能完成，回到 [Stage 00 System Map Mission](../../04-Missions/Stage-00-System-Explorer/00-System-Map/Mission.md)。通过后进入 [Stage 01 — C & Memory](../Stage-01-C-and-Memory/README.md)。
