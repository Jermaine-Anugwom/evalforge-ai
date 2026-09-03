# EvalForge AI

**A model-neutral evaluation and regression workbench for operational AI.**

> All people, organizations, records, measurements, and outcomes in this
> repository are synthetic.

![EvalForge AI desktop evaluation view](.impeccable/review/desktop.png)

[Open the live demonstration](https://jermaine-anugwom.github.io/evalforge-ai/)

## Run it locally

Requires Git and Docker with Compose v2. Initial setup downloads dependencies and images; no model key is needed.

```bash
git clone https://github.com/Jermaine-Anugwom/evalforge-ai.git
cd evalforge-ai
docker compose up --build
```

Open the [interface](http://127.0.0.1:3001) or [API documentation](http://127.0.0.1:8001/docs).
The interface replays a static synthetic fixture alongside the API; it is not API-produced evidence.

## The operational problem

Teams cannot safely improve an AI workflow when quality, abstention, latency, cost, and regressions are measured inconsistently.

## The proof

Term-based rubrics, required-abstention cases, forbidden-term checks, latency/cost records, and a fail-closed regression gate that requires matching unique case IDs.

The committed fixture set contains 100 category-varied golden cases and 12 distinct adversarial scenarios; test IDs map directly to those records.

## Why this is forward deployed

The project begins with the operator's decision, uncertainty, failure cost,
integration boundary, and handoff—not with a model demo. It makes policy and
evidence inspectable, preserves human authority for consequential cases, and
remains useful when the optional model layer is unavailable.

## Architecture

```mermaid
flowchart LR
  A[Golden + adversarial cases] --> B[Model-neutral runner]
  B --> C[Rubric evaluators]
  C --> D[Baseline comparison]
  D --> E{Regression gate}
  E -->|pass| F[Promotion candidate]
  E -->|hold| G[Trace inspection]
  F --> H[Latency + cost ledger]
  G --> H
```

## Python-only setup

From the cloned repository, with Python 3.12 installed:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -c constraints.txt -e '.[dev]'
pytest -q
evalforge
```

The API uses local synthetic data. Dependency installation requires a network connection; running the demonstration needs no model key.

## Evaluation and limitations

Run `pytest -q` for the reproducible evaluation. The fixture set is deliberately
synthetic and cannot establish production performance. A real deployment would
require operator observation, representative data, policy review, privacy review,
security testing, and a monitored rollout.

## Project documents

- [Field discovery and handoff](FIELD_NOTES.md)
- [Security boundaries](SECURITY.md)
- [Operating runbook](RUNBOOK.md)
- [Development provenance](DEVELOPMENT.md)
- [Release history](CHANGELOG.md)

## Topics

`ai-evals`, `llmops`, `fastapi`, `nextjs`, `observability`, `testing`
