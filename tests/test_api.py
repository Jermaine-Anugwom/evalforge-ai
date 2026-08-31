from fastapi.testclient import TestClient

from evalforge.api import app

client = TestClient(app)


def test_health() -> None:
    assert client.get("/health").json()["mode"] == "deterministic"


def test_evaluate_endpoint() -> None:
    response = client.post(
        "/evaluate",
        json={"case_id": "SYN-1", "expected_terms": ["evidence"], "output": "grounded in evidence"},
    )
    assert response.status_code == 200
    assert response.json()["passed"] is True


def test_rejects_negative_cost() -> None:
    response = client.post(
        "/evaluate", json={"case_id": "SYN-1", "expected_terms": [], "output": "x", "cost": -1}
    )
    assert response.status_code == 422
