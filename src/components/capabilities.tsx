const layers = [
  { id: "interface", number: "01", title: "An interface that feels right.", description: "Clear hierarchy, responsive layouts, and motion that guides attention. I build for different screens and both left-to-right and right-to-left reading flows.", tags: ["React", "Next.js", "Responsive UI", "RTL", "GSAP"], evidence: "See the Arabic-first interface", href: "/work/qalb-zaker" },
  { id: "logic", number: "02", title: "The thinking behind the click.", description: "A useful product connects actions into a complete journey. From browsing a library to opening a reader, I work on the states and interactions that make a feature usable.", tags: ["TypeScript", "JavaScript", "API integration", "Interaction design"], evidence: "Explore the reading experience", href: "/work/bookworm" },
  { id: "data", number: "03", title: "A foundation beneath it all.", description: "The interface is one part of the system. I connect frontend experiences with server-side functionality and structured data, keeping the product's requirements in view.", tags: ["PostgreSQL", "Full-stack development", "Next.js"], evidence: "View the business website", href: "/work/easylink-telecom" },
];

export default function Capabilities() {
  return <section className="craft-section" aria-labelledby="craft-title">
    <header className="craft-heading"><p className="eyebrow">Under the surface</p><h2 id="craft-title">One experience.<br />Every layer considered.</h2><p>From the first impression to the functionality underneath.</p></header>
    <div className="craft-story">
      <div className="craft-visual" aria-hidden="true">
        <div className="craft-orbit" />
        <div className="system-stack">
          <div className="system-plane plane-data"><span className="plane-label">03 / Data</span><div className="data-row"><span>content</span><i /><i /><i /></div><div className="data-row"><span>structure</span><i /><i /><i /></div><div className="data-row"><span>relationships</span><i /><i /><i /></div></div>
          <div className="system-plane plane-logic"><span className="plane-label">02 / Application logic</span><div className="logic-flow"><span>Request</span><b>→</b><span>Process</span><b>→</b><span>Response</span></div><div className="logic-line" /><small>Actions connected with intention.</small></div>
          <div className="system-plane plane-interface"><div className="mini-browser"><i /><i /><i /><span>01 / Interface</span></div><div className="mini-layout"><div><span className="mini-kicker">Considered by design</span><strong>Made to<br />make sense.</strong><span className="mini-button">Explore</span></div><div className="mini-portal" /></div></div>
        </div>
        <p className="stack-caption">Interface <span>·</span> Logic <span>·</span> Data</p>
      </div>
      <div className="craft-chapters">{layers.map(layer => <article className="craft-chapter" data-layer={layer.id} key={layer.id}>
        <p className="eyebrow">{layer.number} / {layer.id === "logic" ? "Application logic" : layer.id}</p><h3>{layer.title}</h3><p>{layer.description}</p><ul className="craft-tags" aria-label={`${layer.id} skills`}>{layer.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><a className="craft-link" href={layer.href}>{layer.evidence} <span aria-hidden="true">↗</span></a>
      </article>)}</div>
    </div>
  </section>;
}
