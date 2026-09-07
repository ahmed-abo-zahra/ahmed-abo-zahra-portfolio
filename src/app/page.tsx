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
import { projects } from "@/content/projects";

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
        <div className="architecture" aria-hidden="true"><Image src="/images/hero/architecture-v2.jpg" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" /></div>
        <nav className="nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Ahmed Abo Zahra, home"><span>Ahmed</span> Abo Zahra</a>
          <LocalTime />
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
        <div className="portal-reveal" aria-hidden="true"><div className="reveal-surface"><div className="reveal-wall">{projects.map((project) => <figure className="reveal-plate" key={project.slug}><Image src={project.image} alt="" fill sizes="33vw" /><figcaption>{project.number} — {project.name}</figcaption></figure>)}</div><div className="reveal-caption"><span>The work</span><span>{projects.length} projects</span></div></div></div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
        <div className="journey-progress" aria-hidden="true"><span /></div>
      </section>
      </div>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">The work</p>
          <h2 id="work-title">Ideas made tangible.</h2>
          <p>Independently designed and developed. Explore the ideas, decisions, and details behind each one.</p>
        </div>
        <ol className="work-index">
          {projects.map((project) => (
            <li key={project.slug}>
              <a href={`#${project.slug}`}>
                <span className="work-index-number" aria-hidden="true">{project.number}</span>
                <span className="work-index-name">{project.name}</span>
                <span className="work-index-type">{project.type}</span>
                <span className="work-index-mark" aria-hidden="true">↓</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="exhibits">
          {projects.map((project) => (
            <Fragment key={project.slug}>
            {/* The jump target sits outside the sticky article: a sticky element measures short of its own start. */}
            <span className="exhibit-anchor" id={project.slug} aria-hidden="true" />
            <article className={`exhibit ${project.tone}`} data-project-card>
              <div className="exhibit-plate"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 899px) 100vw, 62vw" /></div>
              <div className="exhibit-info">
                <p className="eyebrow"><span className="exhibit-number">{project.number}</span> {project.type}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="project-bottom"><ul aria-label={`${project.name} technologies`}>{project.technologies.map((tag) => <li key={tag}>{tag}</li>)}</ul><a href={`/work/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></a></div>
              </div>
            </article>
            </Fragment>
          ))}
        </div>
      </section>

      <Capabilities />
      <Process />

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="portrait-wrap"><Image src="/images/portrait/ahmed-abo-zahra.jpg" alt="Ahmed Abo Zahra" fill sizes="(max-width: 760px) 100vw, 34vw" /></div>
        <div><p className="eyebrow">The person behind the work</p><h2 id="about-title">Curious by nature.<br />Careful by design.</h2><p>I&apos;m Ahmed, a freelance full-stack developer and Computer Science &amp; Engineering student at New Mansoura University. I turn ideas into usable websites, taking ownership of the design and the development.</p><p>I care about the experience before the click, and the details that make it work afterwards.</p><dl className="about-facts"><div><dt>Education</dt><dd>Computer Science &amp; Engineering<br />Expected graduation · 2028</dd></div><div><dt>Experience</dt><dd>Freelance · 2025–present<br />Creativa full-stack training · 2024</dd></div><div><dt>Languages</dt><dd>Arabic · Native<br />English · Working proficiency</dd></div></dl><a className="text-link" href="/Ahmed_Abo_Zahra_CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-orb" aria-hidden="true" />
        <p className="eyebrow">Have something in mind?</p><h2 id="contact-title">Let&apos;s build something worth showing.</h2><p>For freelance projects, collaborations, and full-time opportunities.</p>
        <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <CopyEmail />
        <div className="contact-actions"><a className="button button-light" href="mailto:ahmedabozahra68@gmail.com">Write an email <ContactIcon name="email" /></a><a className="button button-outline-light" href="https://wa.me/201010752614" target="_blank" rel="noreferrer">WhatsApp <ContactIcon name="whatsapp" /></a><a className="button button-outline-light" href="https://www.linkedin.com/in/ahmed-abo-zahra/" target="_blank" rel="noreferrer">LinkedIn <ContactIcon name="linkedin" /></a></div>
        {/* The form appears only once its key is configured, so the direct routes are never replaced by a dead form. */}
        {process.env.CONTACT_FORM_KEY && <ContactForm />}
      </section>
      <footer><span>© {new Date().getFullYear()} {profile.name}</span><a href={profile.github} target="_blank" rel="noreferrer"><ContactIcon name="github" /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><ContactIcon name="linkedin" /> LinkedIn</a></footer>
    </main>
  );
}
