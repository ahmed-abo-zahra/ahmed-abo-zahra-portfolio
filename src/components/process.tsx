const steps = [
  { name: "Understand", detail: "Start with the audience, the problem, and what the website needs to achieve.", output: "A clear brief" },
  { name: "Design", detail: "Shape the content, the flow, and a visual direction that belongs to the project.", output: "A considered direction" },
  { name: "Build", detail: "Bring the interface and functionality together, with responsive behavior from the start.", output: "A working product" },
  { name: "Refine", detail: "Review the details, test the important journeys, and prepare the website for launch.", output: "A careful handover" },
];

export default function Process() {
  return <section className="process-section" aria-labelledby="process-title"><header className="process-heading"><div><p className="eyebrow">How I approach a project</p><h2 id="process-title">From a conversation<br />to something real.</h2></div><p>Good work starts with understanding what matters. The details follow from there.</p></header><div className="process-track" aria-hidden="true"><span /></div><ol className="process-steps">{steps.map((step, index) => <li key={step.name}><span className="process-number">{String(index + 1).padStart(2, "0")}</span><h3>{step.name}</h3><p>{step.detail}</p><span className="process-output">{step.output}</span></li>)}</ol></section>;
}
