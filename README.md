# Ahmed Abo Zahra Portfolio

English portfolio at **https://ahmedabozahra.me**. Next.js App Router, TypeScript, GSAP and Lenis. Pages and project content are server-rendered; motion enhances the content and respects reduced-motion preferences.

## Local development

```sh
npm ci
npm run dev
```

## Production checks

```sh
npm run lint
npm run build
npm run start
# In another terminal:
npx playwright install chromium webkit
QA_URL=http://localhost:3000 npm run test:e2e
```

Tests cover images, project routes, responsive layouts, the cinematic hero, reduced motion, clipboard feedback, metadata, structured data, screenshot dialogs and keyboard focus. WebKit coverage is engine-level testing, not a claim of testing on a physical iPhone.

## Content and assets

- `src/content/projects.ts`: project entries, order, case studies and screenshot references. Adding an entry generates its route, sitemap URL and next-project navigation. See `docs/adding-projects.md`.
- `src/content/profile.ts`: current public contact links and identity.
- `public/images/projects`: real project screenshots. Optimized previews load first; the full-resolution original loads when its viewer is opened.
- `public/Ahmed_Abo_Zahra_CV.pdf`: published CV. Editable source is in the parent workspace under `output/cv`.
- `src/app/icon.svg`: AZ mark. Run `node scripts/generate-icons.mjs` after changing it to regenerate browser and Apple icons.

## Deployment and indexing

GitHub `ahmed-abo-zahra/ahmed-abo-zahra-portfolio`, branch `main`, is connected to Vercel project `ahmed-abo-zahra-portfolio` in `shadow2228m-7827s-projects`. A push to main triggers production deployment.

`CONTACT_FORM_KEY` enables the contact form in the contact section. Get a free access key at
[web3forms.com](https://web3forms.com) using the address the messages should arrive at, add it as an
environment variable in the Vercel project, and redeploy. Without it the form is not rendered at all
and the email, WhatsApp and LinkedIn routes stand alone, so the contact section is never broken.

The browser posts the submission directly to the form provider, which is what its free plan allows:
server-side calls are refused with `This method is not allowed. Use our API in client side`. The key
is public by design and is registered against `ahmedabozahra.me`, so submissions from other origins,
`localhost` included, are rejected by CORS. Test the form on the deployed domain, not locally.

`SITE_INDEXABLE=true` is required for the production build. Noncanonical hosts also receive an `X-Robots-Tag: noindex, nofollow` header. `www` redirects to the canonical domain. No credentials belong in this repository.

Search Console ownership and sitemap submission require the owner's Google session. See `docs/search-console.md`. Lighthouse SEO checks do not guarantee indexing or ranking.

Release findings and evidence: `docs/release-review.md`.
