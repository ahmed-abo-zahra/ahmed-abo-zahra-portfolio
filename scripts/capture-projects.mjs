import { chromium } from "playwright";

const projects = [
  { slug: "easylink", url: "https://easylink-telecom-website-gamma.vercel.app/" },
  { slug: "qalb", url: "https://qalb-zaker.vercel.app/" },
  { slug: "bookworm", url: "https://bookworm-iota-livid.vercel.app/" },
];

const browser = await chromium.launch({ headless: true });

for (const project of projects) {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await desktop.goto(project.url, { waitUntil: "networkidle" });

  if (project.slug === "easylink") {
    const accept = desktop.getByRole("button", { name: /accept analytics/i });
    if (await accept.count()) await accept.click();
  }

  await desktop.screenshot({ path: `public/images/projects/${project.slug}-hero.png` });
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  await mobile.goto(project.url, { waitUntil: "networkidle" });

  if (project.slug === "easylink") {
    const accept = mobile.getByRole("button", { name: /accept analytics/i });
    if (await accept.count()) await accept.click();
  }

  await mobile.screenshot({ path: `public/images/projects/${project.slug}-hero-mobile.png` });
  await mobile.close();
}

await browser.close();
