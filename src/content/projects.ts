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
  featured?: boolean;
  focus?: string;
  liveLabel?: string;
  status?: string;
  workflow?: { title: string; description: string }[];
  evidence?: { image: string; alt: string; title: string; caption: string; aspectRatio?: string }[];
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

// Add projects here. Only featured projects appear on the homepage; existing case studies keep their URLs.
const projectEntries: Omit<Project, "number">[] = [
  {
    slug: "aso-clo", name: "ASO CLO", type: "E-commerce · Storefront & dashboard",
    focus: "Full-stack commerce & partner isolation", featured: true,
    summary: "A bilingual e-commerce application with backend APIs and one shared dashboard serving three partner accounts, each with its own products and orders. Demonstrated locally with sample data.",
    role: "Solo designer & developer",
    technologies: ["Next.js", "React", "TypeScript", "Backend APIs", "Supabase integration"],
    liveUrl: "https://aso-clo-frontend-demo.vercel.app/", liveLabel: "View storefront preview",
    image: "/images/projects/aso-hero.png", mobileImage: "/images/projects/aso-hero-mobile.png",
    imageAlt: "ASO CLO local Next.js demo storefront with search, filters, and sample clothing products", tone: "aso",
    roleDetails: "I designed and implemented the entire application: responsive Arabic/English storefront, product discovery, cart, backend checkout and management APIs, signed admin sessions, one shared dashboard for three partner accounts, data models, Supabase database/storage integration, and testing. The screenshots show my local Next.js presentation with sample commerce data and anonymized personal identities.",
    keyFeatures: ["Arabic/English storefront with category, search, price filtering, and sorting", "Product size and color selection, stock limits, and a persistent cart", "Demo checkout with server-derived prices, variant validation, and stock checks", "One shared dashboard for three partner accounts, each with partner-scoped products, orders, and financial summaries", "Product management, stock/availability controls, order status, paid/outstanding balances, and CSV reports", "Signed, expiring admin cookie sessions and server-side product/order ownership checks", "Supabase database and image-storage integration in the code; demonstrated locally with isolated sample data", "Order tracking with masked customer information"],
    challenge: "Connect the shopper journey to the operational side of a store: a usable catalog for customers and a clear workspace for the partners managing it.",
    approach: "Built one storefront and one reusable dashboard shell backed by Next.js route handlers. Each of the three partner accounts resolves to a stable partner ID; admin routes derive that identity from the signed session and scope product/order reads and writes to it. Checkout derives prices from stored product data, validates stock and variants, and groups orders by partner. Implemented Supabase database and image-storage adapters; verified the presentation workflow with isolated local fixtures.",
    outcome: "A working local Next.js demo covering storefront and partner operations. Verified session protection, partner isolation, variant/stock validation, and server-calculated totals. The public link opens a separate standalone storefront preview.",
    status: "Presentation demo. Screenshots use sample products and orders with personal identities hidden; catalog photos are AI-generated. The full storefront/dashboard runs locally with a single-process file database. Supabase database and image-storage integration are implemented in the code; live cloud persistence and uploads have not been independently verified. Online payment, Google login, and WhatsApp OTP are disabled. The public preview uses HTML/CSS/JavaScript and does not include the dashboard or server checkout.",
    workflow: [
      {title: "Browse & choose", description: "Search or filter the catalog, open a product, choose a valid size/color, and add an available quantity to the cart."},
      {title: "Validate & create", description: "The demo checkout route checks product variants and combined stock, calculates prices on the server, and creates unpaid orders grouped by partner."},
      {title: "Manage & track", description: "One shared dashboard serves three separately authenticated partner accounts. The signed session identifies the partner; server routes scope products and orders to that partner, and dashboard summaries reflect the returned data. A customer-facing tracking route returns order status with masked information."},
    ],
    evidence: [
      {image: "/images/projects/aso-product.png", alt: "ASO CLO product page with price, sizes, color, stock, and add-to-cart controls", title: "From a product to the cart", caption: "Local Next.js demo: product details, available variants, stock, and add-to-cart controls. Products, photography, and stock are presentation fixtures."},
      {image: "/images/projects/aso-dashboard-redacted.png", alt: "ASO CLO partner dashboard showing sample order statuses, balances, and management actions", title: "One dashboard, three partner accounts", caption: "The same dashboard interface serves three partner accounts, with partner-scoped products, orders, and financial summaries. This screenshot shows one account in the local demo. Names and phone numbers are hidden for privacy; monetary amounts are demo data, not business results."},
      {image: "/images/projects/aso-products-admin-redacted.png", alt: "ASO CLO partner product management showing sample product stock and availability controls", title: "Catalog management", caption: "A partner sees their own products and manages stock and availability. Personal identity is hidden for privacy. Server-side ownership checks protect the product routes."},
    ],
  },
  {
    slug: "easylink-telecom",
    focus: "Business websites & content structure", featured: true,
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
    evidence: [{image: "/images/projects/easylink-service.png", alt: "Easylink call center service page with service explanation and enquiry actions", title: "From services to enquiries", caption: "Published service page: a dedicated explanation, clear navigation, and a direct enquiry action. These are the company’s services; I built the website presenting them."}],
    status: "Published business website at easylink-eg.com. This case study demonstrates the public site; private dashboards, authentication, and database operations are outside the evidence shown here.",
    workflow: [
      {title: "Discover the business", description: "The homepage introduces the company and its communication and security services."},
      {title: "Explore a solution", description: "Dedicated service and product pages organize the offering, with Arabic and English content and responsive navigation."},
      {title: "Start an enquiry", description: "Visitors reach the company through telephone, email, WhatsApp, or the quote enquiry routes. This is a business website, not an online checkout."},
    ],
    outcome: "Published at easylink-eg.com, with service and product pages, responsive layouts, and direct contact routes. This case study covers the public business website.",
  },
  {
    slug: "qalb-zaker",
    focus: "Arabic RTL & motion design", featured: true,
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
    evidence: [{image: "/images/projects/qalb-features.png", alt: "Qalb Zaker landing page feature section with Arabic typography and a decorative phone preview", title: "A deliberate RTL composition", caption: "A section from the live landing page: Arabic content hierarchy, a feature card, and a phone illustration. The illustration presents the product concept; it is not evidence of a released app.", aspectRatio: "1176 / 462"}],
    status: "Published Arabic RTL landing page. App download and contribution links are marked coming soon; a released mobile app or payment flow is not claimed here.",
    workflow: [
      {title: "Introduce the product", description: "A clear Arabic hero and app artwork explain the product before visitors start exploring."},
      {title: "Build understanding", description: "Daily adhkar, feature, and FAQ sections follow a right-to-left reading flow, with scroll-driven motion supporting the content."},
      {title: "Set expectations", description: "Responsive desktop/mobile layouts keep the page usable. Coming-soon labels make the current status of app downloads explicit."},
    ],
    outcome: "A live Arabic landing page that communicates the product clearly across desktop and mobile screens.",
  },
  {
    slug: "bookworm",
    featured: false,
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

export const featuredProjects = projects.filter(project => project.featured !== false);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
