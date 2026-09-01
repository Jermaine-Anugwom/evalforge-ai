# Field notes

## Operator problem

Teams cannot safely improve an AI workflow when quality, abstention, latency, cost, and regressions are measured inconsistently.

## Discovery questions

- Who owns the decision when automation is uncertain?
- Which source is authoritative when records disagree?
- What must remain usable during a provider or network outage?
- Which false positive creates the greatest operational harm?
- What evidence will an operator need to challenge a result?

## Constraints

- Synthetic data only.
- Deterministic offline operation is the baseline.
- Unresolved consequential decisions enter review rather than being guessed.
- Logs explain inputs, policy, output, and next safe action.

## Success measure

Committed golden/adversarial fixtures, term and abstention rubrics, matching-ID regression gates, and inspectable synthetic traces.

## Handoff

A customer team receives the operating assumptions, configuration surface,
test suite, runbook, known limitations, and rollback path—not merely source
code or a demonstration.
