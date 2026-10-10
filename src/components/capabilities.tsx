const layers = [
  { id: "interface", number: "01", title: "An interface that feels right.", description: "Clear hierarchy, responsive layouts, and motion that guides attention. I build for different screens and both left-to-right and right-to-left reading flows.", tags: ["React", "Next.js", "Responsive UI", "RTL", "GSAP"], evidence: "See the Arabic-first interface", href: "/work/qalb-zaker" },
  { id: "logic", number: "02", title: "The thinking behind the click.", description: "A useful product connects actions into a complete journey. From browsing a library to opening a reader, I work on the states and interactions that make a feature usable.", tags: ["TypeScript", "JavaScript", "API integration", "Interaction design"], evidence: "Explore the reading experience", href: "/work/bookworm" },
  { id: "data", number: "03", title: "Details that make it usable.", description: "Clear content, accessible navigation, and sensible page structure help people find what they need. I carry that care through responsive layouts and the routes to contact.", tags: ["Semantic HTML", "SEO structure", "Next.js"], evidence: "View the business website", href: "/work/easylink-telecom" },
];

export default function Capabilities() {
  return <section className="craft-section" aria-labelledby="craft-title">
    <header className="craft-heading"><p className="eyebrow">What I bring to the build</p><h2 id="craft-title">A clear interface.<br />A considered system.</h2><p>Design decisions and technical decisions, made together.</p></header>
    <div className="craft-story">
      <div className="craft-visual" aria-hidden="true">
        <div className="responsive-study">
          <span className="study-label">One idea. Different screens.</span>
          <div className="study-desktop"><div className="study-bar"><i /><i /><i /></div><div className="study-content"><span /><strong>Clarity,<br />at every size.</strong><div className="study-blocks"><i /><i /><i /></div></div></div>
          <div className="study-phone"><div className="study-bar" /><strong>Clarity,<br />at every size.</strong><div className="study-blocks"><i /><i /><i /></div></div>
          <div className="study-baseline"><span>Responsive</span><span>Connected</span><span>Considered</span></div>
        </div>
      </div>
      <div className="craft-chapters">{layers.map(layer => <article className="craft-chapter" data-layer={layer.id} key={layer.id}>
        <p className="eyebrow">{layer.number} / {layer.id === "logic" ? "Application logic" : layer.id === "data" ? "Structure" : layer.id}</p><h3>{layer.title}</h3><p>{layer.description}</p><ul className="craft-tags" aria-label={`${layer.id === "data" ? "structure" : layer.id} skills`}>{layer.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><a className="craft-link" href={layer.href} target="_blank" rel="noreferrer">{layer.evidence} <span aria-hidden="true">↗</span></a>
      </article>)}</div>
    </div>
  </section>;
}
