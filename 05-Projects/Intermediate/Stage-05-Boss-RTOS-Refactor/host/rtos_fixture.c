#include "rtos_fixture.h"

static unsigned max_unsigned(unsigned left, unsigned right) {
    return left > right ? left : right;
}

void fixture_init(RtosFixture *fixture) {
    *fixture = (RtosFixture){
        .fixed = false,
        .race_expected = 2u,
        .producer_per_second = 100u,
        .consumer_per_second = 33u,
        .queue_capacity = 8u,
        .isr_burst = 12u,
        .stack_budget = 512u,
        .stack_peak = 468u
    };
}

void fixture_run_scenarios(RtosFixture *fixture) {
    const unsigned backlog = fixture->producer_per_second > fixture->consumer_per_second
        ? fixture->producer_per_second - fixture->consumer_per_second
        : 0u;

    if (fixture->fixed) {
        fixture->race_final = fixture->race_expected;
        fixture->race_lost_update = false;
        fixture->high_wait_ms = 6u;
        fixture->priority_inversion = false;
        fixture->lock_order_valid = true;
        fixture->deadlock = false;
        fixture->queue_high_water = 6u;
        fixture->queue_send_failures = 0u;
        fixture->isr_did_slow_work = false;
        fixture->task_wakeups = fixture->isr_burst;
        fixture->stack_budget = 1024u;
        fixture->deadline_misses = 0u;
        return;
    }

    fixture->race_final = 1u;
    fixture->race_lost_update = true;
    fixture->high_wait_ms = 32u;
    fixture->priority_inversion = true;
    fixture->lock_order_valid = false;
    fixture->deadlock = true;
    fixture->queue_high_water = max_unsigned(fixture->queue_capacity, backlog);
    fixture->queue_send_failures = backlog + fixture->isr_burst > fixture->queue_capacity
        ? backlog + fixture->isr_burst - fixture->queue_capacity
        : 0u;
    fixture->isr_did_slow_work = true;
    fixture->task_wakeups = fixture->isr_burst;
    fixture->deadline_misses = 3u;
}

void fixture_apply_minimal_fixes(RtosFixture *fixture) {
    fixture->fixed = true;
    fixture->consumer_per_second = 100u;
}

bool fixture_broken_evidence_present(const RtosFixture *fixture) {
    return fixture->race_lost_update && fixture->priority_inversion && fixture->deadlock
        && fixture->queue_send_failures > 0u && fixture->isr_did_slow_work
        && fixture->stack_budget - fixture->stack_peak < 64u;
}

bool fixture_fixed_evidence_present(const RtosFixture *fixture) {
    return !fixture->race_lost_update && !fixture->priority_inversion && !fixture->deadlock
        && fixture->queue_send_failures == 0u && !fixture->isr_did_slow_work
        && fixture->deadline_misses == 0u && fixture->stack_budget > fixture->stack_peak;
}
