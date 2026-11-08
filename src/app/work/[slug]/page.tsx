import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, featuredProjects } from "@/content/projects";
import ContactIcon from "@/components/contact-icon";
import { profile } from "@/content/profile";
import ProjectImage from "@/components/project-image";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} | Ahmed Abo Zahra`,
    robots: process.env.SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
    description: project.summary,
    twitter: { card: "summary_large_image", title: `${project.name} | Ahmed Abo Zahra`, description: project.summary, images: [project.image] },
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} | Ahmed Abo Zahra`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "website",
      images: [{ url: project.image, width: 1440, height: 900, alt: project.imageAlt }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = featuredProjects[(featuredProjects.findIndex(item => item.slug === slug) + 1) % featuredProjects.length];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: profile.website },
        { "@type": "ListItem", position: 2, name: project.name, item: `${profile.website}/work/${project.slug}` },
      ] },
      { "@type": "CreativeWork", name: project.name, description: project.summary, url: `${profile.website}/work/${project.slug}`, image: `${profile.website}${project.image}`, creator: { "@id": `${profile.website}/#person` } },
    ],
  };

  return (
    <main className="case-study">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a className="skip-link" href="#project-overview">Skip to project</a>
      <nav className="case-nav" aria-label="Case study navigation">
        <Link className="wordmark" href="/" aria-label="Ahmed Abo Zahra, home"><span>Ahmed</span> Abo Zahra</Link>
        <Link href="/#work">← All work</Link>
      </nav>

      <header className="case-hero" id="project-overview" tabIndex={-1}>
        <div>
          <p className="eyebrow">Selected work / {project.number}</p>
          <h1>{project.name}</h1>
          {project.focus && <p className="eyebrow">{project.focus}</p>}
          <p className="case-summary">{project.summary}</p>
        </div>
        <div className="case-meta"><span>{project.type}</span><span>{project.role}</span></div>
      </header>

      <section className="case-cover">
        <ProjectImage src={project.image} alt={project.imageAlt} eager sizes="100vw" />
      </section>

      <section className="case-facts" aria-label="Project overview">
        <div><p className="eyebrow">Challenge</p><p>{project.challenge}</p></div>
        <div><p className="eyebrow">Approach</p><p>{project.approach}</p></div>
        <div><p className="eyebrow">Outcome</p><p>{project.outcome}</p></div>
      </section>

      {project.status && <aside className="case-status" aria-label="Project status"><p className="eyebrow">What is available</p><p>{project.status}</p></aside>}

      <section className="case-details" aria-label="Implementation details">
        <div><h2>My role</h2><p>{project.roleDetails}</p></div>
        <div><h2>Key features</h2><ul>{project.keyFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
      </section>

      {project.workflow && <section className="case-workflow" aria-labelledby="workflow-title"><h2 id="workflow-title">How it works</h2><ol>{project.workflow.map((step, index) => <li key={step.title}><span className="eyebrow">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>}

      <section className="case-gallery" aria-label={`${project.name} desktop and mobile views`}>
        <div className="desktop-shot"><ProjectImage src={project.image} alt={`${project.name} desktop view`} sizes="(max-width: 900px) 100vw, 67vw" /></div>
        <div className="mobile-shot"><ProjectImage src={project.mobileImage} alt={`${project.name} mobile view`} sizes="(max-width: 900px) 70vw, 22vw" /></div>
      </section>

      {project.detailImage && <figure className="case-feature-shot"><ProjectImage src={project.detailImage} alt={project.detailImageAlt ?? project.name} sizes="90vw" /><figcaption>{project.detailImageAlt}</figcaption></figure>}

      {project.evidence?.map(shot => <figure className="case-feature-shot" key={shot.image}><h2>{shot.title}</h2><ProjectImage src={shot.image} alt={shot.alt} sizes="90vw" aspectRatio={shot.aspectRatio} /><figcaption>{shot.caption}</figcaption></figure>)}

      <section className="case-footer">
        <div><p className="eyebrow">Built with</p><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
        <div className="case-actions"><a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel ?? "View live site"} <span aria-hidden="true">↗</span></a>{project.sourceUrl && <a className="button button-secondary" href={project.sourceUrl} target="_blank" rel="noreferrer">View source code <ContactIcon name="github" /></a>}</div>
      </section>
      <nav className="case-next" aria-label="Continue exploring">{nextProject && <Link href={`/work/${nextProject.slug}`}><span className="eyebrow">Next project</span><strong>{nextProject.name} <span aria-hidden="true">↗</span></strong></Link>}<a className="button button-secondary" href={`mailto:${profile.email}`}>Discuss a project <ContactIcon name="email" /></a></nav>
    </main>
  );
}
