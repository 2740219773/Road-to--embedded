# Stage 05 Boss Project — RTOS Refactor

## Navigation

- [Stage 05 — RTOS Engineer](../../../02-Learning-Path/Stage-05-RTOS-Engineer/README.md)
- [Race Condition Mission](../../../04-Missions/Stage-05-RTOS/01-Race-Condition/Mission.md)
- [Priority Inversion Mission](../../../04-Missions/Stage-05-RTOS/02-Priority-Inversion/Mission.md)
- [Deadlock Mission](../../../04-Missions/Stage-05-RTOS/03-Deadlock/Mission.md)
- [Queue Is Full Mission](../../../04-Missions/Stage-05-RTOS/04-Queue-Is-Full/Mission.md)
- [RTOS Debugging Cases](../../../06-Debugging-Cases/README.md)
- [Stage 05 Mixed Concurrency Challenge](../../../06-Debugging-Cases/Stage-05-Mixed-Concurrency/CASE.md)

## Project Goal

Take the Stage 03 multi-peripheral sensor node and refactor it from a super loop into a small RTOS-based system without changing the external behavior.

## Suggested Architecture

```text
Sensor Task ─┐
ADC Task ────┼→ Queue / Shared Service → Communication Task → PC
Health Task ─┘
               ↑
          Timer / ISR Events
```

## Requirements

- At least three Tasks with explicit responsibility boundaries;
- Inter-task data flow must be documented;
- At least one Queue or message-passing path;
- Shared resources must have a clear ownership/synchronization policy;
- ISR-to-Task handoff must use an RTOS-appropriate mechanism;
- Each Task must have an initial stack budget and measured high-water evidence;
- Avoid busy loops that keep a high-priority Task permanently Ready.

## Host Fixture

- [Deterministic C11 Host Fixture](host/README.md)
- [System Fault Map](evidence/system-map.md)

The Host Fixture deterministically models Race, Priority Inversion, Deadlock, Queue Backpressure, ISR-to-Task handoff and Stack/Deadline evidence. It does not depend on FreeRTOS or claim to reproduce a target kernel or MCU.

## Required Failure Injection

Reproduce and diagnose at least four of these: race condition, priority starvation/inversion, deadlock, queue overflow, task stack shortage, wrong ISR API usage, long critical section.

The local Host Fixture covers the five formal Evidence Packs in `evidence/`. A learner must still submit independent Evidence Records and explain one rejected hypothesis per fault.

## Acceptance

Submit system architecture, Task table, priority rationale, data-flow diagram, timing evidence, stack evidence, fault reports and regression results.

Passing means you can explain why the scheduler runs each Task, how data moves, who owns shared resources, and how the system behaves when one component becomes slow or faulty.

真实 FreeRTOS、开发板、Debugger、示波器和逻辑分析仪验证属于后续人工路径，不由本 Boss 的 Host PASS 代替。
