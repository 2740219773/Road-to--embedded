# Stage 05 Boss Project — RTOS Refactor

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

## Required Failure Injection

Reproduce and diagnose at least four of these: race condition, priority starvation/inversion, deadlock, queue overflow, task stack shortage, wrong ISR API usage, long critical section.

## Acceptance

Submit system architecture, Task table, priority rationale, data-flow diagram, timing evidence, stack evidence, fault reports and regression results.

Passing means you can explain why the scheduler runs each Task, how data moves, who owns shared resources, and how the system behaves when one component becomes slow or faulty.