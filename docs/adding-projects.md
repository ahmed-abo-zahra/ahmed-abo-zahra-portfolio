# Adding selected work

Edit `src/content/projects.ts` and add an entry to `projectEntries` with a unique slug, name, honest project description, technologies, links, desktop/mobile image paths, alt text, challenge, approach and outcome. Put screenshots in `public/images/projects`.

The list order controls homepage order and automatic numbering. Its first entry supplies the decorative hero reveal. Static case pages and sitemap entries come from the same list. No animation edits or manual route creation are required when adding a fourth project. New projects use the default artwork background unless an optional tone has a matching CSS rule.

Run `npm run lint`, `npm run build`, and the verification scripts before pushing. With a running local production server, use `QA_URL=http://localhost:3005 node scripts/verify-hero.mjs` and `QA_URL=http://localhost:3005 node scripts/verify-portfolio.mjs`.

Contact icons live in `src/components/contact-icon.tsx`. Keep visible text labels; decorative SVGs are hidden from screen readers.

Run the complete suite with `QA_URL=http://localhost:3000 npm run test:e2e` against a running production server. Install Chromium and WebKit with `npx playwright install chromium webkit` first. Metadata and screenshot-viewer checks discover project routes from the homepage, so new projects are included automatically.

## Featured work and implementation evidence

The homepage uses `featuredProjects`; all entries retain case routes and sitemap URLs. Set `featured: false` for supporting/archived projects. Optional `focus`, `status`, `workflow`, `evidence`, and `liveLabel` fields explain the project strength, release status, user journey, screenshot captions, and accurate link destination. ASO is a local Next.js demo; its public link is a separate frontend-only preview. Do not describe that preview as a live backend/dashboard.
