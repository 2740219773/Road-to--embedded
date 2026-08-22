# Repository Audit — V2.1

## Audit purpose

This audit checks whether the repository still matches the agreed direction:

> Road to Embedded is an engineering-oriented interactive learning system, not a Markdown textbook collection.

Audit dimensions: architecture, learning sequence, content roles, beginner readability, naming, navigation, version status and legacy cleanup.

## Overall conclusion

**The learning direction is still correct. The main problem is repository consistency, not the learning route.**

The Stage sequence remains coherent:

```text
System Map
→ C & Memory
→ MCU
→ Peripherals
→ Debugging
→ RTOS
→ Embedded Linux
→ FPGA
→ System Integration
```

This matches the original goal of moving from upper-level software toward lower-level hardware while preserving a system-level view.

## Confirmed strengths

### 1. Knowledge and learning experience are separated

`01-Knowledge-Base` answers technical facts; `02-Learning-Path` organizes learning; Mission/Lab/Debug Case/Project each have distinct roles.

### 2. The project has moved beyond pure Markdown

Runnable HTML labs now exist for memory, register bits, PWM, UART, I2C, SPI, ADC, DMA, CAN, Modbus and RTOS concepts.

### 3. Debugging remains a first-class skill

The route does not become “learn more APIs”. Stage 04 explicitly teaches evidence collection, HardFault, Watchpoint, stack/memory corruption and instrument selection.

### 4. Beginner readability is now an explicit requirement

`docs/BEGINNER-READABILITY.md` and `01-Knowledge-Base/Glossary.md` define how first-contact terminology should be introduced.

## Problems found

### A. Version documents lagged behind implementation — FIXED IN THIS AUDIT

V2.1 documents still said “only Stage 00/01” while the branch already contained prototypes through FPGA. This made the project appear off-plan.

Resolution: ROADMAP and DEVELOPMENT-PLAN now distinguish **milestone completion** from **early vertical-slice prototypes**.

### B. Mission naming became inconsistent — PARTIALLY FIXED

The repository had a mixture of:

```text
Mission-001-Memory-Detective/
Phase-1-C/02-Bit-Hacker/
Stage-02-MCU/...
Stage-03-Peripherals/...
```

Canonical rule is now:

```text
04-Missions/Stage-XX-Name/NN-Mission-Name/
```

Stage 01 Memory Detective and Bit Hacker have been normalized. Remaining Mission directories should be checked against the same rule.

### C. Old and new directory systems coexist — OPEN

Legacy directories such as `01-Fundamentals`, old MCU/RTOS/Linux/FPGA/Protocols and old interactive folders are still present.

This is intentional during migration, but they must not remain indefinitely because they create two apparent sources of truth.

Action: mark legacy paths clearly, eliminate references from new content, then delete them after validation. Backup branch preserves the original state.

### D. Some Stage pages became stale as content grew — IN PROGRESS

Example: Stage 01 still said Bit Hacker was future work and pointed at old knowledge paths even after both had been created/migrated.

Stage 01 has been corrected. Remaining Stage README files need the same consistency pass.

### E. Beginner readability is uneven — IN PROGRESS

Newer UART/GPIO/I2C/SPI/Timer/ADC/Linux/FPGA pages explain first concepts well; some older C/System/Debug/RTOS pages are still written for readers who already know the terms.

Action: continue the Beginner Readability Checklist on first-entry pages, without duplicating all advanced definitions.

### F. Content growth temporarily outpaced navigation — OPEN

Many useful prototypes were added quickly. The next priority is not creating more isolated files; it is connecting existing Knowledge → Mission → Lab → Debug Case → Boss paths.

## Canonical content responsibilities

```text
01-Knowledge-Base   What is true? What does the concept mean?
02-Learning-Path    What should I learn now and why?
03-Interactive-Labs What can I manipulate/visualize?
04-Missions         What problem will teach this concept?
05-Projects         Can I integrate several capabilities?
06-Debugging-Cases  Can I diagnose a problem without tutorial guidance?
07-OpenMAIC         How can the same lesson run as an AI/interactive classroom?
08-Resources        Where are useful external references?
09-Progress         What is complete and what remains?
```

If a new file cannot clearly answer which responsibility it belongs to, do not add it yet.

## Canonical Mission naming

```text
04-Missions/
  Stage-01-C-and-Memory/
    01-Memory-Detective/
    02-Bit-Hacker/
  Stage-02-MCU/
  Stage-03-Peripherals/
  Stage-04-Debug-Hunter/
  Stage-05-RTOS/
  Stage-06-Embedded-Linux/
  Stage-07-FPGA/
```

OpenMAIC should mirror Stage/Mission identity where practical.

## Immediate cleanup queue

1. Audit all Stage README navigation against real files.
2. Search new content for references to legacy directories.
3. Normalize remaining Mission/OpenMAIC naming.
4. Add Legacy notices to old top-level paths.
5. Check critical Markdown links.
6. Verify each interactive lab has a README and at least one Mission link.
7. Verify each Boss Project is linked from its Stage.
8. Update migration status.
9. Only then retire old directories and prepare PR for merge.

## Decision

No architectural reset is needed.

The project should **not** return to a chapter-first textbook design, and it should **not** create a separate beginner edition. Continue using one system with progressive disclosure:

```text
Beginner intuition
→ precise knowledge
→ interaction
→ real evidence
→ debugging
→ integration
```

The next phase is repository consolidation, not another direction change.