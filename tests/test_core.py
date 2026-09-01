import json
from pathlib import Path

import pytest

from evalforge.core import Case, evaluate, regression

FIXTURES = json.loads((Path(__file__).parents[1] / "fixtures" / "eval_cases.json").read_text())


@pytest.mark.parametrize("fixture", FIXTURES["golden"], ids=lambda item: item["case_id"])
def test_golden_cases(fixture):
    case = Case(
        fixture["case_id"], tuple(fixture["expected_terms"]), tuple(fixture["forbidden_terms"])
    )
    result = evaluate(case, fixture["output"], latency_ms=10, cost=0.001)
    assert result.passed and result.score == 1.0


@pytest.mark.parametrize("fixture", FIXTURES["adversarial"], ids=lambda item: item["case_id"])
def test_adversarial_violations(fixture):
    case = Case(
        fixture["case_id"], tuple(fixture["expected_terms"]), tuple(fixture["forbidden_terms"])
    )
    assert not evaluate(case, fixture["output"]).passed


def test_missing_term():
    assert evaluate(Case("1", ("alpha",)), "beta").missing == ("alpha",)


def test_abstention_pass():
    assert evaluate(Case("1", (), require_abstention=True), "Insufficient evidence").passed


def test_abstention_fail():
    assert not evaluate(Case("1", (), require_abstention=True), "guess").passed


def test_regression_pass():
    assert regression([evaluate(Case("1", ("a",)), "a")], [evaluate(Case("1", ("a",)), "a")])[
        "passed"
    ]


def test_regression_fail():
    assert not regression([evaluate(Case("1", ("a",)), "a")], [evaluate(Case("1", ("a",)), "x")])[
        "passed"
    ]


def test_empty_regression():
    result = regression([], [])
    assert not result["passed"] and not result["coverage_valid"]


def test_empty_case_fails_closed():
    result = evaluate(Case("EMPTY", ()), "anything")
    assert not result.passed and result.violations == ("empty_rubric",)


def test_unmatched_case_ids_fail_regression():
    baseline = [evaluate(Case("A", ("ok",)), "ok")]
    candidate = [evaluate(Case("B", ("ok",)), "ok")]
    result = regression(baseline, candidate)
    assert not result["passed"] and not result["coverage_valid"]
