from dataclasses import asdict

from fastapi import FastAPI
from pydantic import BaseModel, Field

from .core import Case, evaluate

app = FastAPI(title="EvalForge AI", version="0.1.0")


class EvaluationInput(BaseModel):
    case_id: str = Field(min_length=1, max_length=64)
    expected_terms: tuple[str, ...]
    forbidden_terms: tuple[str, ...] = ()
    require_abstention: bool = False
    output: str = Field(max_length=8000)
    latency_ms: int = Field(default=0, ge=0)
    cost: float = Field(default=0, ge=0)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ready", "mode": "deterministic", "data": "synthetic"}


@app.post("/evaluate")
def evaluate_output(payload: EvaluationInput) -> dict[str, object]:
    case = Case(
        payload.case_id, payload.expected_terms, payload.forbidden_terms, payload.require_abstention
    )
    return asdict(evaluate(case, payload.output, payload.latency_ms, payload.cost))
