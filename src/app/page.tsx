import Image from "next/image";
import MotionExperience from "@/components/motion-experience";
import ContactIcon from "@/components/contact-icon";
import { projects } from "@/content/projects";

const skills = [
  "React", "Next.js", "TypeScript", "PostgreSQL", "UI/UX", "Responsive web", "RTL", "Motion",
];

export default function Home() {
  const featured = projects[0];
  return (
    <main>
      <MotionExperience />
      <a className="skip-link" href="#work">Skip to work</a>
      <div className="hero-journey" id="top">
      <section className="hero" aria-label="Introduction">
        <div className="architecture" aria-hidden="true"><Image src="/images/hero/architecture-v2.jpg" alt="" fill priority sizes="100vw" quality={85} /></div>
        <nav className="nav" aria-label="Primary navigation">
          <a className="monogram" href="#top" aria-label="Ahmed Abo Zahra, home">AZ</a>
          <div className="nav-rule" aria-hidden="true" />
          <div className="nav-links">
            <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
          </div>
        </nav>
        <div className="hero-copy">
          <p className="eyebrow">Ahmed Abo Zahra — Full-Stack Web Developer</p>
          <h1>Thoughtfully built.<br />Beautifully felt.</h1>
          <p className="intro">I design and develop web experiences, from the interface to the systems behind it.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href="#contact">Let&apos;s talk <ContactIcon name="chat" /></a>
          </div>
        </div>
        {featured && <div className="portal-reveal" aria-hidden="true"><div className="reveal-surface"><Image src={featured.image} alt="" fill sizes="100vw" /><div className="reveal-caption"><span>01 / Selected work</span><span>{featured.name}</span></div></div></div>}
        <a className="scroll-cue" href="#work"><span /> Scroll to explore</a>
        <div className="journey-progress" aria-hidden="true"><span /></div>
      </section>
      </div>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Ideas made tangible.</h2>
          <p>Independently designed and developed. Explore the ideas, decisions, and details behind my selected work.</p>
        </div>
        <div className="projects">
          {projects.map((project) => (
            <article className={`project-card ${project.tone}`} data-project-card key={project.slug}>
              <div className="project-art"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 760px) 100vw, 42vw" /><span className="project-number" aria-hidden="true">{project.number}</span></div>
              <div className="project-details">
                <div><p className="project-type">{project.type}</p><h3>{project.name}</h3><p>{project.summary}</p></div>
                <div className="project-bottom"><ul aria-label={`${project.name} technologies`}>{project.technologies.map((tag) => <li key={tag}>{tag}</li>)}</ul><a href={`/work/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></a></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities" aria-labelledby="capabilities-title">
        <div className="capability-copy"><p className="eyebrow">Under the surface</p><h2 id="capabilities-title">Good experiences go deeper.</h2><p>Visual decisions, robust interfaces, and the logic that connects them all belong in the same product.</p></div>
        <div className="capability-diagram"><div className="diagram-line" aria-hidden="true" /><div className="diagram-node node-interface">Interface</div><div className="diagram-node node-logic">Application logic</div><div className="diagram-node node-data">Data</div><div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="portrait-wrap"><Image src="/images/portrait/ahmed-abo-zahra.jpg" alt="Ahmed Abo Zahra" fill sizes="(max-width: 760px) 100vw, 34vw" /></div>
        <div><p className="eyebrow">A little about me</p><h2 id="about-title">Building with care, from Giza to the web.</h2><p>I&apos;m Ahmed, a Computer Science &amp; Engineering student at New Mansoura University and a freelance full-stack developer. I care about making a website feel considered before someone reads a line of code—and work just as hard on what happens after the click.</p><a className="text-link" href="/Ahmed_Abo_Zahra_CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-orb" aria-hidden="true" />
        <p className="eyebrow">Have something in mind?</p><h2 id="contact-title">Let&apos;s build something worth showing.</h2><p>For freelance projects, collaborations, and full-time opportunities.</p>
        <div className="contact-actions"><a className="button button-light" href="mailto:ahmedabozahra68@gmail.com">Write an email <ContactIcon name="email" /></a><a className="button button-outline-light" href="https://wa.me/201010752614" target="_blank" rel="noreferrer">WhatsApp <ContactIcon name="whatsapp" /></a><a className="button button-outline-light" href="https://www.linkedin.com/in/ahmed-abo-zahra/" target="_blank" rel="noreferrer">LinkedIn <ContactIcon name="linkedin" /></a></div>
      </section>
      <footer><span>© {new Date().getFullYear()} Ahmed Abo Zahra</span><a href="https://github.com/ahmed-abo-zahra" target="_blank" rel="noreferrer"><ContactIcon name="github" /> GitHub</a><a href="https://www.linkedin.com/in/ahmed-abo-zahra/" target="_blank" rel="noreferrer"><ContactIcon name="linkedin" /> LinkedIn</a></footer>
    </main>
  );
}
