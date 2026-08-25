#ifndef ROAD_TO_EMBEDDED_RTOS_FIXTURE_H
#define ROAD_TO_EMBEDDED_RTOS_FIXTURE_H

#include <stdbool.h>

typedef struct {
    bool fixed;
    unsigned race_expected;
    unsigned race_final;
    bool race_lost_update;
    unsigned high_wait_ms;
    bool priority_inversion;
    bool lock_order_valid;
    bool deadlock;
    unsigned producer_per_second;
    unsigned consumer_per_second;
    unsigned queue_capacity;
    unsigned queue_high_water;
    unsigned queue_send_failures;
    unsigned isr_burst;
    bool isr_did_slow_work;
    unsigned task_wakeups;
    unsigned stack_budget;
    unsigned stack_peak;
    unsigned deadline_misses;
} RtosFixture;

void fixture_init(RtosFixture *fixture);
void fixture_run_scenarios(RtosFixture *fixture);
void fixture_apply_minimal_fixes(RtosFixture *fixture);
bool fixture_broken_evidence_present(const RtosFixture *fixture);
bool fixture_fixed_evidence_present(const RtosFixture *fixture);

#endif
