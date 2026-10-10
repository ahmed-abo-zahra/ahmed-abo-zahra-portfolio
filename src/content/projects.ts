export type Project = {
  slug: string;
  number: string;
  name: string;
  type: string;
  summary: string;
  role: string;
  technologies: string[];
  roleDetails: string;
  keyFeatures: string[];
  sourceUrl?: string;
  detailImage?: string;
  detailImageAlt?: string;
  liveUrl: string;
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
    summary: "A responsive business website that presents communication and security services with clear paths to contact.",
    role: "Individually designed and developed",
    technologies: ["Next.js", "React", "TypeScript", "GSAP"],
    liveUrl: "https://easylink-eg.com/",
    image: "/images/projects/easylink-hero.png",
    mobileImage: "/images/projects/easylink-hero-mobile.png",
    imageAlt: "Easylink Telecom homepage showing communication and security systems",
    tone: "easylink",
    roleDetails: "I handled the visual direction, UI design, frontend development, content structure, Arabic and English microcopy, responsive implementation, and release checks independently.",
    keyFeatures: ["Company, product, service, and contact pages", "Arabic and English content with RTL-aware layouts", "Responsive navigation and layouts for desktop and mobile", "Email, telephone, WhatsApp, and quote enquiry routes", "Page titles, descriptions, and semantic content structure"],
    challenge: "Create a clear business presence that presents integrated communication and security services while keeping the path to contact direct.",
    approach: "Built the visual direction, responsive interface, service pages, Arabic and English content, and SEO page structure as one connected experience.",
    outcome: "Published at easylink-eg.com, with service and product pages, responsive layouts, and direct contact routes. This case study covers the public business website.",
  },
  {
    slug: "qalb-zaker",
    name: "Qalb Zaker",
    type: "Client project · Arabic RTL Landing Page",
    summary: "An Arabic RTL landing page shaped around clarity, responsive design, and motion.",
    role: "Individually designed and developed",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    liveUrl: "https://qalb-zaker.vercel.app/",
    image: "/images/projects/qalb-hero.png",
    mobileImage: "/images/projects/qalb-hero-mobile.png",
    imageAlt: "Qalb Zaker Arabic landing page with the app hero artwork",
    tone: "qalb",
    roleDetails: "I designed and built the landing page from scratch: visual direction, Arabic content hierarchy, HTML/CSS/JavaScript, responsive RTL layouts, and GSAP scroll animation. The application itself is outside this case study.",
    keyFeatures: ["Arabic right-to-left navigation, typography, and section layout", "Responsive layouts shown in the desktop and mobile captures below", "GSAP and ScrollTrigger animation with Lenis scrolling", "Product introduction, daily adhkar, feature, and FAQ sections", "App download and contribution links clearly marked as coming soon on the live page"],
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
    technologies: ["React", "Gutendex API", "Vite"],
    liveUrl: "https://bookworm-iota-livid.vercel.app/",
    image: "/images/projects/bookworm-hero.png",
    mobileImage: "/images/projects/bookworm-hero-mobile.png",
    imageAlt: "Bookworm digital library homepage",
    tone: "bookworm",
    sourceUrl: "https://github.com/ahmedfrhat/bookworm-reader",
    detailImage: "/images/projects/bookworm-library.png",
    detailImageAlt: "Bookworm library with title and author search, language and topic filters, and book results",
    roleDetails: "This was my original idea and independent course capstone. I designed the interface and implemented the React application, Gutendex integration, reader, local persistence, and loading, error, and empty states myself.",
    keyFeatures: ["Gutendex book search with language and topic filtering", "Book details and a browser-based text reader", "Bookmarks and saved reading progress", "Reading preferences and a personal shelf", "Bookmarks, progress, and preferences stored locally in this browser", "Loading, error, and empty states for library and reader flows"],
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
