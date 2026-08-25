# Beginner Walkthrough — V2.6

## 目的

从完全没有嵌入式经验的学习者视角，验证仓库是否能回答：从哪里开始、下一步看什么、需要做什么、如何知道自己真的学会了。

## 走查结果

| 路段 | 已验证 | 静态推断 | 真实硬件未验证 | 仍需关注 |
|---|---|---|---|---|
| Start Here → Stage 00 | ✅ | 入口、分流和第一周顺序已明确 | 不适用 | 后续观察新手是否需要更多示例 |
| Stage 00 → Stage 01 | ✅ | System Map Mission 与 Exit Check 已建立 | 不适用 | 真实板卡差异不纳入本阶段 |
| Stage 01 C / Memory | ✅ | Mission、Lab、Boss、Exit Check 连续 | PC 与浏览器结果已验证 | C 编译环境差异需持续记录 |
| Stage 02 MCU | ✅ | 真实硬件入口和调试链已说明 | MCU、探针和仪器未在本轮运行 | 板卡选择需要单独实践指南 |
| Stage 03 Peripheral | ✅ | 外设顺序和分层调查模型已明确 | 真实波形和总线未在本轮运行 | 仪器操作仍需实机教学 |
| Stage 04 Debug | ✅ | Evidence → Root Cause → Regression 闭环已建立 | Cortex-M 寄存器未在本轮验证 | 真实调试器映射需后续补充 |
| Stage 05 RTOS | ✅ | Host Fixture、Workbench、Mixed、Exit 连续 | FreeRTOS 内核和 MCU 调度未验证 | 真实 RTOS 迁移任务留待后续 |
| Stage 06～08 | ✅ | prototype 边界已标记 | 未验证 | 不应出现在新手当前必修路径 |

## 本轮新手体验加固

已补充并接入主路线：

- [Windows / C 环境检查](../docs/BEGINNER-SETUP.md)；
- [可运行 Warmup 样例](../02-Learning-Path/00-Programming-Warmup/examples/README.md)；
- [Stage 02 Hardware Setup](../02-Learning-Path/Stage-02-MCU-Rookie/HARDWARE-SETUP.md)；
- [Stage 02 Recovery Guide](../02-Learning-Path/Stage-02-MCU-Rookie/RECOVERY-GUIDE.md)；
- [Instrument Basics](../01-Knowledge-Base/Debugging/00-Instrument-Basics.md)；
- [Learning Record Template](../docs/LEARNING-RECORD-TEMPLATE.md)。

这些文件已经通过链接和结构检查。当前环境没有可用 C 编译器，因此样例的编译运行仍需在具备 GCC、Clang 或 MSVC 的 Windows 环境中完成。

## 验收状态

```text
Beginner route audit: PASS
```

本记录只表示本地文档路线、链接和可执行入口通过检查，不代表真实 MCU、FreeRTOS、示波器或逻辑分析仪验证完成。
