import Image from "next/image";
import { Fragment } from "react";
import type { Metadata } from "next";
import MotionExperience from "@/components/motion-experience";
import ContactIcon from "@/components/contact-icon";
import Capabilities from "@/components/capabilities";
import Process from "@/components/process";
import CopyEmail from "@/components/copy-email";
import LocalTime from "@/components/local-time";
import ContactForm from "@/components/contact-form";
import { profile } from "@/content/profile";
import { featuredProjects as projects } from "@/content/projects";

export const metadata: Metadata = {
  robots: process.env.SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
};

export default function Home() {
  return (
    <main>
      <MotionExperience />
      <a className="skip-link" href="#work">Skip to work</a>
      <div className="hero-journey" id="top">
      <section className="hero" aria-label="Introduction">
        <div className="architecture build-scene" aria-hidden="true">
          <div className="scene-grid" />
          <div className="scene-caption">From an idea to an experience.</div>
          <div className="build-layer layer-data"><span className="layer-label">03 / Structure</span><div className="data-lines"><i /><i /><i /></div><span className="layer-note">A clear page structure</span></div>
          <div className="build-layer layer-logic"><span className="layer-label">02 / Function</span><div className="logic-path"><i /><span /><i /><span /><i /></div><span className="layer-note">Every action connected</span></div>
          <div className="build-layer layer-interface"><div className="scene-browser"><span /><span /><span /></div><span className="layer-label">01 / Interface</span><strong>Made to<br />make sense.</strong><div className="scene-ui"><i /><i /></div><span className="layer-note">Thoughtful by design</span></div>
          <div className="scene-footer">Design · Development · Delivery</div>
        </div>
        <nav className="nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Ahmed Abo Zahra, home"><span>Ahmed</span> Abo Zahra</a>
          <LocalTime />
          <div className="nav-links">
            <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
          </div>
        </nav>
        <div className="hero-copy">
          <p className="eyebrow">Ahmed Abo Zahra — Web Developer · React &amp; Next.js</p>
          <h1>Designed with care.<br />Built to work.</h1>
          <p className="intro">I design and develop React and Next.js websites, storefronts, and dashboards — connecting clear interfaces to working application logic, with particular care for Arabic RTL.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">View my work <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href="#contact">Let’s talk <ContactIcon name="chat" /></a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
        <div className="journey-progress" aria-hidden="true"><span /></div>
      </section>
      </div>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work <span className="work-count">{String(projects.length).padStart(2, "0")} projects · Built independently</span></p>
          <h2 id="work-title">Ideas made tangible.</h2>
          <p>Independently designed and developed. Three perspectives: commerce and dashboards, business websites, and Arabic RTL with motion. Explore the implementation and my role in each.</p>
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
                <div className="project-bottom"><ul aria-label={`${project.name} technologies`}>{project.technologies.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="project-routes"><a href={`/work/${project.slug}`} target="_blank" rel="noreferrer">Read case study <span aria-hidden="true">↗</span></a><a className="project-live" href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel ?? "Visit website"} <span aria-hidden="true">↗</span></a></div></div>
              </div>
            </article>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <header><p className="eyebrow">What I build</p><h2 id="services-title">Interfaces with a purpose.</h2><p>Practical development skills, demonstrated in the selected projects.</p></header>
        <div className="service-grid">{[
          ["Business Websites", "Company websites that present your services clearly and make it easy for customers to get in touch."],
          ["Landing Pages", "Responsive landing pages for a product or service, with a clear message and a focused path to action."],
          ["React & Next.js Interfaces", "Web interfaces built with React and Next.js, including API integration and useful loading, empty, and error states."],
          ["Storefronts & Dashboards", "Product browsing, carts, management interfaces, and validated application workflows — demonstrated in ASO CLO."],
        ].map(([title, description], index) => <article key={title}><span className="eyebrow">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <Capabilities />
      <Process />

      <section className="about" id="about" aria-labelledby="about-title">
        <figure className="about-portrait"><div className="portrait-wrap"><Image src="/images/portrait/ahmed-abo-zahra.jpg" alt="Ahmed Abo Zahra" fill sizes="(max-width: 760px) 100vw, 34vw" /></div><figcaption>Ahmed Abo Zahra <span>Developer · Egypt</span></figcaption></figure>
        <div><p className="eyebrow">The person behind the work</p><h2 id="about-title">Curious by nature.<br />Careful by design.</h2><p>I&apos;m Ahmed, a web developer working with React, Next.js, and TypeScript and Computer Science &amp; Engineering student at New Mansoura University. I turn ideas into usable websites, taking ownership of the design, implementation, and testing. I’m looking for a web development role where I can contribute and keep learning.</p><p>I care about the experience before the click, and the details that make it work afterwards.</p><dl className="about-facts"><div><dt>Education</dt><dd>Computer Science &amp; Engineering<br />Expected graduation · 2028</dd></div><div><dt>Experience</dt><dd>Freelance · 2025–present<br />Creativa full-stack training · 2024</dd></div><div><dt>Languages</dt><dd>Arabic · Native<br />English · Working proficiency</dd></div></dl><a className="text-link" href="/Ahmed_Abo_Zahra_CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-orb" aria-hidden="true" />
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
