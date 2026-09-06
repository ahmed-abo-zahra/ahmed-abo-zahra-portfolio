export type Project = {
  slug: string;
  number: string;
  name: string;
  type: string;
  summary: string;
  role: string;
  technologies: string[];
  liveUrl: string;
  repositoryUrl?: string;
  image: string;
  mobileImage: string;
  imageAlt: string;
  tone: string;
  challenge: string;
  approach: string;
  outcome: string;
};

// Add a project here. Order, routes, sitemap and the hero feature are derived from this list.
const projectEntries: Omit<Project, "number">[] = [
  {
    slug: "easylink-telecom",
    name: "Easylink Telecom",
    type: "Client project",
    summary: "A business website designed and developed from visual direction to the systems behind it.",
    role: "Individually designed and developed",
    technologies: ["Next.js", "PostgreSQL", "SEO"],
    liveUrl: "https://easylink-telecom-website-gamma.vercel.app/",
    image: "/images/projects/easylink-hero.png",
    mobileImage: "/images/projects/easylink-hero-mobile.png",
    imageAlt: "Easylink Telecom homepage showing communication and security systems",
    tone: "easylink",
    challenge: "Create a clear business presence that presents integrated communication and security services while keeping the path to contact direct.",
    approach: "Built the visual direction, responsive interface, content structure, and supporting full-stack functionality as one connected experience.",
    outcome: "A live bilingual-facing business website with a clear service story and direct contact routes.",
  },
  {
    slug: "qalb-zaker",
    name: "Qalb Zaker",
    type: "Client project",
    summary: "An Arabic RTL landing page shaped around clarity, responsive design, and motion.",
    role: "Individually designed and developed",
    technologies: ["RTL", "Responsive", "Motion"],
    liveUrl: "https://qalb-zaker.vercel.app/",
    image: "/images/projects/qalb-hero.png",
    mobileImage: "/images/projects/qalb-hero-mobile.png",
    imageAlt: "Qalb Zaker Arabic landing page with the app hero artwork",
    tone: "qalb",
    challenge: "Introduce an Arabic-first product through an interface that feels calm, legible, and natural in a right-to-left reading flow.",
    approach: "Designed and developed the landing page from scratch, with the hierarchy, RTL layout, responsive behavior, and motion working together.",
    outcome: "A live Arabic landing page that communicates the product clearly across desktop and mobile screens.",
  },
  {
    slug: "bookworm",
    name: "Bookworm",
    type: "Independent course capstone",
    summary: "A browser-based digital library and reading experience built from an original idea.",
    role: "Individually designed and developed",
    technologies: ["React", "APIs", "UX"],
    liveUrl: "https://bookworm-iota-livid.vercel.app/",
    repositoryUrl: "https://github.com/ahmedfrhat/bookworm-reader",
    image: "/images/projects/bookworm-hero.png",
    mobileImage: "/images/projects/bookworm-hero-mobile.png",
    imageAlt: "Bookworm digital library homepage",
    tone: "bookworm",
    challenge: "Turn a personal concept for a calmer reading space into a working library that people can browse and use in the browser.",
    approach: "Created the product and interface from scratch, combining a library flow, reader experience, and public-domain book data.",
    outcome: "A live course capstone that demonstrates product thinking, React implementation, and a cohesive editorial interface.",
  },
];

export const projects: Project[] = projectEntries.map((project, index) => ({
  ...project,
  number: String(index + 1).padStart(2, "0"),
}));

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
