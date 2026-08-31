"use client";
import { useState } from "react";

const cases=[
  {id:"EV-041",name:"Citation support",base:96.2,candidate:98.4,threshold:95,status:"PASS"},
  {id:"EV-042",name:"Required abstention",base:94.0,candidate:91.7,threshold:93,status:"HOLD"},
  {id:"EV-043",name:"Injection resistance",base:95.8,candidate:96.1,threshold:95,status:"PASS"},
  {id:"EV-044",name:"Contradiction handling",base:89.4,candidate:92.8,threshold:92,status:"PASS"},
];

export default function Page(){
  const [selected,setSelected]=useState(1); const [mode,setMode]=useState("comparison"); const row=cases[selected];
  return <main><a className="skip" href="#matrix">Skip to evaluation matrix</a>
    <header><div><span>EF</span><strong>EvalForge AI</strong></div><nav aria-label="Workbench view"><button aria-pressed={mode==="comparison"} onClick={()=>setMode("comparison")}>Comparison</button><button aria-pressed={mode==="failure"} onClick={()=>setMode("failure")}>Failure trace</button><button aria-pressed={mode==="empty"} onClick={()=>setMode("empty")}>Empty state</button></nav><b>SYNTHETIC SUITE</b></header>
    <section className="runline"><div><h1>candidate/rc-17</h1><p>Measured against baseline/2026.08 · deterministic evaluator</p></div><dl><div><dt>Golden cases</dt><dd>100</dd></div><div><dt>Adversarial</dt><dd>12</dd></div><div><dt>Gate</dt><dd>HOLD</dd></div></dl></section>
    <section className="bench" data-mode={mode}>
      <div className="matrix" id="matrix"><div className="matrix-head"><span>Evaluation</span><span>Baseline</span><span>Candidate</span><span>Threshold</span><span>Gate</span></div>{mode==="empty"?<div className="empty"><strong>No comparison selected</strong><p>Load two compatible synthetic runs to inspect regression evidence.</p></div>:cases.map((item,index)=><button className="eval-row" aria-pressed={selected===index} key={item.id} onClick={()=>setSelected(index)}><span><small>{item.id}</small><b>{item.name}</b></span><em>{item.base.toFixed(1)}</em><em>{item.candidate.toFixed(1)}</em><em>≥ {item.threshold.toFixed(1)}</em><strong data-gate={item.status}>{item.status}</strong></button>)}</div>
      <aside className="trace"><div className="trace-head"><span>Selected evidence</span><strong>{row.id}</strong></div><h2>{row.name}</h2><div className="delta"><span>Δ</span><b>{(row.candidate-row.base).toFixed(1)}</b><small>points</small></div><div className="threshold"><i style={{width:`${row.candidate}%`}}/><mark style={{left:`${row.threshold}%`}}/><span>0</span><span>threshold {row.threshold}</span><span>100</span></div><dl><div><dt>Evaluator agreement</dt><dd>3 / 3</dd></div><div><dt>Evidence records</dt><dd>12</dd></div><div><dt>Unsupported claims</dt><dd>0</dd></div></dl><div className="trace-note"><b>{mode==="failure"?"Failure trace":"Review finding"}</b><p>{row.status==="HOLD"?"Candidate answered two fixtures that required abstention. Inspect trace IDs SYN-077 and SYN-081 before promotion.":"Candidate clears the configured threshold with no unsupported synthetic claims."}</p></div><button disabled>Promotion remains blocked</button></aside>
    </section><footer><span>Evaluator v0.1 · prompt hash 26c9ae</span><span>No model credential required</span></footer>
    <script type="application/json" data-impeccable-contract dangerouslySetInnerHTML={{__html:JSON.stringify({core_job:"Expose whether a candidate model is safer and more reliable than its baseline.",hero_action:"Select a regression and inspect the evidence trace blocking promotion.",required_states:["comparison","failure","empty"],forbidden_shortcuts:["generic dashboard cards","score-only claims","hidden evaluation failures"],visual_commitment:"A calibration comparison bench derived from concept seed c2b96993."})}} />
  </main>;
}
