import Image from "next/image";
import { Fragment } from "react";
import type { Metadata } from "next";
import ContactIcon from "@/components/contact-icon";
import Process from "@/components/process";
import CopyEmail from "@/components/copy-email";
import ContactForm from "@/components/contact-form";
import { profile } from "@/content/profile";
import { featuredProjects as projects } from "@/content/projects";

export const metadata: Metadata = {
  robots: process.env.SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
};

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#work">Skip to work</a>
      <section className="hero" id="top" aria-label="Introduction">
        <nav className="nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Ahmed Abo Zahra, home"><span>Ahmed</span> Abo Zahra</a>
          <div className="nav-links">
            <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
          </div>
        </nav>
        <div className="hero-copy">
          <p className="eyebrow">Full-stack web developer · React &amp; Next.js</p>
          <h1>Designed with care.<br />Built to work.</h1>
          <p className="intro">I design and build full-stack web experiences with React, Next.js, and TypeScript — from responsive Arabic RTL interfaces to backend APIs, authenticated dashboards, and data workflows.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">View my work</a>
            <a className="button button-secondary" href="#contact">Discuss your project</a>
          </div>
          <a className="hero-cv" href="/Ahmed_Abo_Zahra_CV.pdf" download>Download CV</a>
        </div>
        <figure className="hero-portrait">
          <div className="hero-portrait-image">
            <Image src="/images/portrait/ahmed-abo-zahra.jpg" alt="Ahmed Abo Zahra" fill sizes="(max-width: 899px) 100vw, 31vw" priority />
          </div>
          <figcaption><span>Ahmed Abo Zahra</span><span>Developer · Egypt</span></figcaption>
        </figure>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work <span className="work-count">{String(projects.length).padStart(2, "0")} projects · Built independently</span></p>
          <h2 id="work-title">Three projects.<br />Three different strengths.</h2>
          <p>From a store and its operations to a business presence and an Arabic-first experience. I designed and developed each project independently; the case studies explain what works and how it was built.</p>
        </div>
        <div className="exhibits">
          {projects.map((project) => (
            <Fragment key={project.slug}>
            {/* The jump target sits outside the sticky article: a sticky element measures short of its own start. */}
            <span className="exhibit-anchor" id={project.slug} aria-hidden="true" />
            <article className={`exhibit ${project.tone}`} data-project-card>
              <div className="exhibit-plate"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 899px) 100vw, 62vw" /></div>
              <div className="exhibit-info">
                <p className="eyebrow"><span className="exhibit-number">{project.number}</span> {project.type}</p>
                <h3>{project.name}</h3>{project.focus && <p className="project-focus">{project.focus}</p>}
                <p>{project.summary}</p>
                <div className="project-bottom"><ul aria-label={`${project.name} technologies`}>{project.technologies.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="project-routes"><a href={`/work/${project.slug}`} target="_blank" rel="noreferrer">Read case study</a><a className="project-live" href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel ?? "Visit website"}</a></div></div>
              </div>
            </article>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <header><p className="eyebrow">How I can contribute</p><h2 id="services-title">From the first screen<br />to the logic behind it.</h2><p>Frontend craft and practical application development, brought together in one build.</p></header>
        <div className="service-grid">{[
          ["Interface & motion", "Responsive React and Next.js interfaces, Arabic RTL layouts, accessible navigation, and motion used only when it helps the content."],
          ["Backend & workflows", "Next.js APIs, signed sessions, ownership checks, and server-side validation for product, cart, and order workflows."],
          ["Data & integration", "API integration and product/order models, with Supabase database and storage integration documented in the ASO case study."],
          ["Testing & delivery", "Browser and mobile checks, semantic page structure, search metadata, and Git-based deployment with Vercel."],
        ].map(([title, description], index) => <article key={title}><span className="eyebrow">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <Process />

      <section className="about" id="about" aria-labelledby="about-title">
        <div><p className="eyebrow">The person behind the work</p><h2 id="about-title">Curious by nature.<br />Careful by design.</h2><p>I&apos;m Ahmed, a full-stack web developer working with React, Next.js, and TypeScript and Computer Science &amp; Engineering student at New Mansoura University. I turn ideas into usable websites, taking ownership of the design, implementation, and testing. I’m looking for a full-stack or frontend development role where I can contribute and keep learning.</p><p>I care about the experience before the click, and the details that make it work afterwards.</p><dl className="about-facts"><div><dt>Education</dt><dd>Computer Science &amp; Engineering<br />Expected graduation · 2028</dd></div><div><dt>Experience</dt><dd>Freelance · 2025–present<br />Creativa full-stack training · 2024</dd></div><div><dt>Languages</dt><dd>Arabic · Native<br />English · Working proficiency</dd></div></dl><a className="text-link" href="/Ahmed_Abo_Zahra_CV.pdf" download>Download CV</a></div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-intro"><p className="eyebrow">The next conversation</p><h2 id="contact-title">Let&apos;s build<br />what comes next.</h2><p>Hiring for a web development role, or building a product? Tell me about the team, the work, and what you need.</p>
        <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <CopyEmail />
        <div className="contact-actions"><a className="button button-light" href="mailto:ahmedabozahra68@gmail.com">Write an email <ContactIcon name="email" /></a><a className="button button-outline-light" href="https://wa.me/201010752614" target="_blank" rel="noreferrer">WhatsApp <ContactIcon name="whatsapp" /></a><a className="button button-outline-light" href="https://www.linkedin.com/in/ahmed-abo-zahra/" target="_blank" rel="noreferrer">LinkedIn <ContactIcon name="linkedin" /></a></div>
        </div>
        {/* The form appears only once its key is configured, so the direct routes are never replaced by a dead form. */}
        {process.env.CONTACT_FORM_KEY && <ContactForm accessKey={process.env.CONTACT_FORM_KEY} />}
      </section>
      <footer><span>© {new Date().getFullYear()} {profile.name}</span><a href={profile.github} target="_blank" rel="noreferrer"><ContactIcon name="github" /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><ContactIcon name="linkedin" /> LinkedIn</a></footer>
    </main>
  );
}
