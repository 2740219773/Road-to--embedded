# Mission — 第一盏 LED：代码执行了，灯为什么没亮？

## 故障现场

你已经成功编译、下载程序，Debugger 也能运行，但开发板上的 LED 没有任何反应。

不要马上复制另一份“点灯代码”。你的任务是证明信号在哪一层消失。

## 调查链路

```text
Program Running?
→ Peripheral Clock?
→ GPIO Mode?
→ Output Register?
→ Pin Voltage?
→ LED Circuit?
```

## Predict

如果 GPIO 输出寄存器显示目标 bit 已经为 1，但引脚实测仍为 0V，你认为最值得优先检查哪一层？为什么？

## Investigation

1. 用断点或心跳确认程序正在运行。
2. 查看 GPIO Peripheral Clock。
3. 查看目标 Pin 的 Mode。
4. 查看 Output Register。
5. 用万用表或示波器测 Pin。
6. 查看原理图确认 LED 是高电平亮还是低电平亮。

## Break It

依次制造：忘开时钟、配置成输入、写错 Pin、反转 LED 逻辑。每次只改变一个条件，并记录现象。

## Boss

拿到一块未知 LED 极性的开发板，只允许查看原理图、Debugger 和万用表/示波器，完成点灯并写出证据链。

## Achievement

以后看到“LED 不亮”时，你的第一反应不再是换代码，而是把系统拆成可验证的层。