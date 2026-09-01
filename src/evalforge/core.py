from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Case:
    case_id: str
    expected_terms: tuple[str, ...]
    forbidden_terms: tuple[str, ...] = ()
    require_abstention: bool = False


@dataclass(frozen=True)
class Result:
    case_id: str
    score: float
    passed: bool
    missing: tuple[str, ...]
    violations: tuple[str, ...]
    latency_ms: int
    cost: float


def evaluate(case: Case, output: str, latency_ms: int = 0, cost: float = 0.0) -> Result:
    low = output.lower()
    missing = tuple(x for x in case.expected_terms if x.lower() not in low)
    violations = tuple(x for x in case.forbidden_terms if x.lower() in low)
    if not case.expected_terms and not case.forbidden_terms and not case.require_abstention:
        violations += ("empty_rubric",)
    abstained = "insufficient evidence" in low or "cannot determine" in low
    if case.require_abstention and not abstained:
        violations += ("required_abstention",)
    denom = max(
        1,
        len(case.expected_terms)
        + len(case.forbidden_terms)
        + (1 if case.require_abstention else 0),
    )
    score = max(0.0, 1 - (len(missing) + len(violations)) / denom)
    return Result(
        case.case_id,
        round(score, 3),
        score >= 0.8 and not violations,
        missing,
        violations,
        latency_ms,
        cost,
    )


def regression(
    baseline: list[Result], candidate: list[Result], tolerance: float = 0.02
) -> dict[str, float | bool]:
    baseline_ids = [item.case_id for item in baseline]
    candidate_ids = [item.case_id for item in candidate]
    coverage_valid = (
        bool(baseline)
        and bool(candidate)
        and len(set(baseline_ids)) == len(baseline_ids)
        and len(set(candidate_ids)) == len(candidate_ids)
        and set(baseline_ids) == set(candidate_ids)
    )
    b = sum(x.score for x in baseline) / max(1, len(baseline))
    c = sum(x.score for x in candidate) / max(1, len(candidate))
    return {
        "baseline": round(b, 3),
        "candidate": round(c, 3),
        "delta": round(c - b, 3),
        "passed": coverage_valid and c + float(tolerance) >= b,
        "coverage_valid": coverage_valid,
    }
