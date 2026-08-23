# Evidence-Driven Debugging — 用证据而不是猜测调试

Stage 04 的核心不是学更多 API，而是建立稳定的故障定位方法。

```text
Symptom
→ Expected Behavior
→ Layer Map
→ Hypotheses
→ Cheapest High-Value Measurement
→ Evidence
→ Eliminate / Confirm
→ Root Cause
→ Fix
→ Regression
```

## 先描述现象，不要先写结论

“UART 坏了”是结论；“PC 收到字节，但内容与预期不一致”才是现象。

## 建立分层地图

例如通信问题可以拆成：应用数据 → Driver → Peripheral → Pin → Electrical Layer → Peer Device。

## 优先做高信息量测量

能用一个示波器 bit time 同时排除大量软件猜测时，就不应该先随机修改十个配置项。

## 一次只改变一个主要变量

否则即使问题消失，也不知道真正原因是什么。

## 修复后必须回归

“现在能工作”不等于根因已经解决。重新验证原始现象、边界条件和相关功能。

最终目标：任何修改都能回答“我为什么改它？修改前有什么证据？修改后什么证据证明根因成立？”