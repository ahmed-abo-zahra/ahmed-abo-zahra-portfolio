import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import ContactIcon from "@/components/contact-icon";
import { profile } from "@/content/profile";

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
    description: project.summary,
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
  const nextProject = projects.length > 1 ? projects[(projects.findIndex(item => item.slug === slug) + 1) % projects.length] : undefined;

  return (
    <main className="case-study">
      <nav className="case-nav" aria-label="Case study navigation">
        <Link className="monogram" href="/" aria-label="Ahmed Abo Zahra, home">AZ</Link>
        <Link href="/#work">← All work</Link>
      </nav>

      <header className="case-hero">
        <div>
          <p className="eyebrow">Selected work / {project.number}</p>
          <h1>{project.name}</h1>
          <p className="case-summary">{project.summary}</p>
        </div>
        <div className="case-meta"><span>{project.type}</span><span>{project.role}</span></div>
      </header>

      <section className="case-cover">
        <Image src={project.image} alt={project.imageAlt} fill priority sizes="100vw" />
      </section>

      <section className="case-facts" aria-label="Project overview">
        <div><p className="eyebrow">Challenge</p><p>{project.challenge}</p></div>
        <div><p className="eyebrow">Approach</p><p>{project.approach}</p></div>
        <div><p className="eyebrow">Outcome</p><p>{project.outcome}</p></div>
      </section>

      <section className="case-gallery" aria-label={`${project.name} desktop and mobile views`}>
        <div className="desktop-shot"><Image src={project.image} alt={`${project.name} desktop view`} fill sizes="(max-width: 900px) 100vw, 67vw" /></div>
        <div className="mobile-shot"><Image src={project.mobileImage} alt={`${project.name} mobile view`} fill sizes="(max-width: 900px) 70vw, 22vw" /></div>
      </section>

      <section className="case-footer">
        <div><p className="eyebrow">Built with</p><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
        <div className="case-actions"><a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live site <span aria-hidden="true">↗</span></a>{project.repositoryUrl && <a className="button button-secondary" href={project.repositoryUrl} target="_blank" rel="noreferrer">View repository <ContactIcon name="github" /></a>}</div>
      </section>
      <nav className="case-next" aria-label="Continue exploring">{nextProject && <Link href={`/work/${nextProject.slug}`}><span className="eyebrow">Next project</span><strong>{nextProject.name} <span aria-hidden="true">↗</span></strong></Link>}<a className="button button-secondary" href={`mailto:${profile.email}`}>Discuss a project <ContactIcon name="email" /></a></nav>
    </main>
  );
}
