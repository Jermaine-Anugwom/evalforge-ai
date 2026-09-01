# EvalForge AI design record

## Shipped direction

Calibration Comparison Bench is a dense release-decision surface. The evaluation matrix is the operating mechanism, and the selected evidence trace is its fixed inspection rail. Concept seed `c2b96993` established the direction.

## Visual system

- Canvas `#111313`
- Working surface `#1C201E`
- Ink `#F4F0E8`
- Decision signal `#D7FF45`
- Supporting signal `#62D5C8`

The dark calibration bench, instrument-like matrix, narrow dividers, and high-contrast gate signals give this product a measurement-specific world rather than a generic analytics shell.

## Interaction and state model

Each row exposes baseline, candidate, threshold, and gate. Selecting a row updates the adjacent evidence trace and its inline mobile counterpart. Comparison, failure, and empty fixtures remain directly reachable and change both the matrix and the release decision coherently.

## Responsive and accessible behavior

Desktop keeps the matrix and trace visible together. Mobile preserves the relationship by placing the selected trace immediately after its source row. Every score row has a descriptive accessible name containing its case, baseline, candidate, threshold, and gate; selection state uses `aria-pressed`; focus is visible; and the page avoids horizontal overflow.

## Truth boundary

All records, scores, costs, latency values, and outcomes are synthetic. The visual fixture demonstrates inspection behavior and does not represent a real customer or model evaluation.

## Impeccable record

Comp-first; Operate mode; approved desktop and mobile references; rendered inspection at 1440×900 and 390×844; typography, layout, adaptation, hardening, optimization, and polish passes completed; mechanical detector run once; independent finish disposition: **SHIP**.
