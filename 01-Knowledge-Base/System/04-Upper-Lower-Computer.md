# 上位机与下位机

“上位机/下位机”是工程中的相对概念。

常见结构：

```text
WPF / Qt / Web 上位机
        ↕
Ethernet / Serial / CAN / Modbus
        ↕
MCU / Embedded Linux 下位机
        ↕
FPGA / Sensors / Actuators
```

上位机更关注人机交互、业务流程、数据展示和系统管理；下位机更接近硬件、实时控制和设备接口。

Road to Embedded 的长期目标之一，就是能够理解并联调这条完整链路。

