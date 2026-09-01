"use client";

import { Fragment, useState } from "react";

type Mode = "comparison" | "failure" | "empty";

const cases = [
  { id: "EV-041", name: "Citation support", base: 96.2, candidate: 98.4, threshold: 95, status: "PASS", traces: ["SYN-014 · cited source matched", "SYN-022 · quote boundary clean"] },
  { id: "EV-042", name: "Required abstention", base: 94.0, candidate: 91.7, threshold: 93, status: "HOLD", traces: ["SYN-077 · answered without evidence", "SYN-081 · answered through contradiction", "SYN-089 · abstained correctly"] },
  { id: "EV-043", name: "Injection resistance", base: 95.8, candidate: 96.1, threshold: 95, status: "PASS", traces: ["SYN-031 · override quarantined", "SYN-033 · secret request blocked"] },
  { id: "EV-044", name: "Contradiction handling", base: 89.4, candidate: 92.8, threshold: 92, status: "PASS", traces: ["SYN-052 · opposing sources surfaced", "SYN-056 · definitive answer withheld"] },
];

export default function Page() {
  const [selected, setSelected] = useState(1);
  const [mode, setMode] = useState<Mode>("comparison");
  const row = cases[mode === "failure" ? 1 : selected];
  const setView = (next: Mode) => { setMode(next); if (next === "failure") setSelected(1); };
  return <main><a className="skip" href="#matrix">Skip to evaluation matrix</a>
    <header><div><span>EF</span><strong>EvalForge AI</strong></div><nav aria-label="Workbench view"><button aria-pressed={mode === "comparison"} onClick={() => setView("comparison")}>Comparison</button><button aria-pressed={mode === "failure"} onClick={() => setView("failure")}>Failure trace</button><button aria-pressed={mode === "empty"} onClick={() => setView("empty")}>Empty state</button></nav><b>SYNTHETIC SUITE</b></header>
    <section className="runline"><div><h1>{mode === "empty" ? "no active run" : "candidate/rc-17"}</h1><p>{mode === "empty" ? "Load compatible synthetic runs to begin" : "Measured against baseline/2026.08 · deterministic evaluator"}</p></div><dl><div><dt>Golden cases</dt><dd>{mode === "empty" ? "—" : "100"}</dd></div><div><dt>Adversarial</dt><dd>{mode === "empty" ? "—" : "12"}</dd></div><div><dt>Gate</dt><dd>{mode === "empty" ? "IDLE" : "HOLD"}</dd></div></dl></section>
    {mode === "empty" ? <section className="empty-workbench" id="matrix"><span>EMPTY COMPARISON</span><h2>No evaluation evidence is loaded.</h2><p>Baseline and candidate suites must contain the same unique case IDs before a promotion decision can exist.</p></section> : <section className="bench" data-mode={mode}>
      <div className="matrix" id="matrix"><div className="matrix-head"><span>Evaluation</span><span>Baseline</span><span>Candidate</span><span>Threshold</span><span>Gate</span></div>{cases.map((item, index) => <Fragment key={item.id}><button className="eval-row" aria-label={`${item.id} ${item.name}. Baseline ${item.base.toFixed(1)}. Candidate ${item.candidate.toFixed(1)}. Threshold ${item.threshold.toFixed(1)}. Gate ${item.status}.`} aria-pressed={row.id === item.id} onClick={() => { setSelected(index); setMode("comparison"); }}><span><small>{item.id}</small><b>{item.name}</b></span><em>{item.base.toFixed(1)}</em><em>{item.candidate.toFixed(1)}</em><em>≥ {item.threshold.toFixed(1)}</em><strong data-gate={item.status}>{item.status}</strong></button>{row.id === item.id && <div className="inline-trace"><span>Threshold ≥ {item.threshold.toFixed(1)}</span><b>{item.traces[0]}</b><small>{item.status === "HOLD" ? "Promotion held" : "Gate passed"}</small></div>}</Fragment>)}</div>
      <aside className="trace"><div className="trace-head"><span>Selected evidence</span><strong>{row.id}</strong></div><h2>{row.name}</h2><div className="delta"><span>Δ</span><b>{(row.candidate - row.base).toFixed(1)}</b><small>points</small></div><div className="threshold"><i style={{ width: `${row.candidate}%` }} /><mark style={{ left: `${row.threshold}%` }} /><span>0</span><span>threshold {row.threshold}</span><span>100</span></div><dl><div><dt>Evaluator agreement</dt><dd>3 / 3</dd></div><div><dt>Evidence records</dt><dd>{row.traces.length}</dd></div><div><dt>Unsupported claims</dt><dd>0</dd></div></dl><div className="trace-records"><b>{mode === "failure" ? "Failure trace" : "Evidence trace"}</b>{row.traces.map(trace => <p key={trace}>{trace}</p>)}</div><div className="trace-note"><b>Review finding</b><p>{row.status === "HOLD" ? "Candidate answered two fixtures that required abstention. Inspect the trace records before promotion." : "Candidate clears the configured threshold with no unsupported synthetic claims."}</p></div><button disabled>{row.status === "HOLD" ? "Promotion remains blocked" : "Promotion requires human release"}</button></aside>
    </section>}
    <footer><span>Evaluator v0.1 · prompt hash 26c9ae</span><span>No model credential required</span></footer>
    <script type="application/json" data-impeccable-contract dangerouslySetInnerHTML={{ __html: JSON.stringify({ core_job: "Expose whether a candidate model is safer and more reliable than its baseline.", hero_action: "Select a regression and inspect the evidence trace blocking promotion.", required_states: ["comparison", "failure", "empty", "overflow"], forbidden_shortcuts: ["generic dashboard cards", "score-only claims", "hidden evaluation failures"], visual_commitment: "A calibration comparison bench derived from concept seed c2b96993." }) }} />
  </main>;
}
