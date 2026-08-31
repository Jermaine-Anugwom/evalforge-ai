import pytest

from evalforge.core import Case, evaluate, regression


@pytest.mark.parametrize("i", range(100))
def test_golden_cases(i):
    case = Case(f"G-{i:03}", (f"evidence-{i}",), (f"fabricated-{i}",))
    result = evaluate(case, f"Supported by evidence-{i}", latency_ms=i, cost=0.001)
    assert result.passed and result.score == 1.0


@pytest.mark.parametrize("i", range(12))
def test_adversarial_violations(i):
    case = Case(f"A-{i}", ("supported",), ("secret", "active clearance", "guaranteed"))
    assert not evaluate(case, "supported but guaranteed").passed


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
    assert regression([], [])["passed"]
