# Stage 08 — System Integrator / 系统集成工程师

Stage 08 是整条路线的最终整合阶段，目前仍是 prototype：把 PC、网络、MCU、Embedded Linux、FPGA 和真实设备重新连接成一个完整系统。

## 当前状态

Stage 08 目前只保留能力边界与 Final Boss 方向，用于定义整个 Road to Embedded 最终要走到哪里。

正式建设属于后续版本。当前 V2.6 只维护能力边界，不新增 Stage 08 Mission、Interactive Lab 或独立 Boss 空壳。

## Entry Requirements / 环境 / 产出

- Entry：完成 Stage 02～05，并在后续补齐 Stage 06～07 的正式能力。
- 环境：需要 PC、MCU、Linux、FPGA 或模拟设备的系统工程环境；当前不要求搭建。
- 必须完成：理解已有 Stage 的接口、数据流、证据和回归要求。
- 可选阅读：前面各 Stage 的 Boss 和 Debug Case。
- 阶段产出：正式建设前不要求 Final Boss 或 Exit Check。

## 核心能力

- 接口定义；
- 数据流和控制流；
- 时序与性能预算；
- 日志与可观测性；
- 跨层故障定位；
- 自动化测试；
- 系统可靠性与恢复。

## 已有能力来源

Stage 08 不重新复制前面知识，而是组合：

- Stage 02～03 的 MCU / Peripheral 能力；
- Stage 04 的证据驱动调试；
- Stage 05 的 RTOS 并发组织；
- Stage 06 的 Embedded Linux 系统分层；
- Stage 07 的 FPGA 硬件思维；
- `05-Projects/` 中积累的综合工程方法。

## Final Boss 方向

构建一个小型完整设备系统：

```text
PC / 上位机
↓
Network / Serial / Field Bus
↓
MCU / Embedded Linux
↓
FPGA（按项目需要）
↓
Sensor / Actuator / Real or Simulated Device
```

系统必须包含可观测性、故障注入和定位报告。目标不是代码量，而是证明学习者能够从系统现象跨层找到根因。

在 V2.8 到来前，本页只定义终点能力，不为了“看起来完整”提前扩内容。
