import "./style.css";
export const metadata={title:"EvalForge AI — Synthetic Evaluation Workbench",description:"Model-neutral evaluation and regression demonstration."};
const contract=`THESIS: A comparative calibration bench, never a score-card dashboard.
OWN-WORLD: Near-black measurement field, cyan evidence traces, lime thresholds, red holds, ruled matrix geometry.
STORY: Compare baseline and candidate, select a regression, inspect its trace, and understand why promotion is held.
FIRST VIEWPORT: A wide evaluation matrix and a narrow selected-trace instrument share one continuous measured bench.
FORM: Calibration comparison bench, grounded candidate 6, seed c2b96993.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance`;
export default function Layout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><script type="application/json" data-impeccable-contract dangerouslySetInnerHTML={{__html:JSON.stringify(contract)}}/>{children}</body></html>}
