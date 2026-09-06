# Adding selected work

Edit `src/content/projects.ts` and add an entry to `projectEntries` with a unique slug, name, honest project description, technologies, links, desktop/mobile image paths, alt text, challenge, approach and outcome. Put screenshots in `public/images/projects`.

The list order controls homepage order and automatic numbering. Its first entry supplies the decorative hero reveal. Static case pages and sitemap entries come from the same list. No animation edits or manual route creation are required when adding a fourth project. New projects use the default artwork background unless an optional tone has a matching CSS rule.

Run `npm run lint`, `npm run build`, and the verification scripts before pushing. With a running local production server, use `QA_URL=http://localhost:3005 node scripts/verify-hero.mjs` and `QA_URL=http://localhost:3005 node scripts/verify-portfolio.mjs`.

Contact icons live in `src/components/contact-icon.tsx`. Keep visible text labels; decorative SVGs are hidden from screen readers.
