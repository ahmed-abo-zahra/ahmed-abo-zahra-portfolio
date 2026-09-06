# Portfolio release review — 6 September 2026

## Scope

Preserve the ivory/forest identity and cinematic hero. Finish the production review without inventing experience, adding tracking, or replacing real project screenshots.

## Plan

1. Measure production with mobile Lighthouse; inspect its actionable findings.
2. Improve image priority and accessible names; add a keyboard-accessible full-resolution project viewer.
3. Check unique metadata, social previews, structured data, canonicals, sitemap, 404 responses and CV access.
4. Verify desktop/mobile layouts, keyboard interaction, reduced motion, image decoding and browser errors.
5. Build and push; verify Vercel deployed the exact commit, then repeat checks on the public domain.
6. Connect Search Console if the user's authenticated Google session is available. Ownership verification cannot be reported as complete without evidence.

## Baseline

Production mobile Lighthouse: performance 92, accessibility 100, best practices 100, SEO 100. LCP 2.5 s, TBT 70 ms, CLS 0, Speed Index 5.5 s. These are simulated lab results, not field Core Web Vitals or a ranking guarantee. Raw report: `../../output/qa/lighthouse-before.json`.

Confirmed findings: missing explicit high fetch priority for the LCP image; AZ logo visible label missing from accessible name; need a full-resolution screenshot viewer; sitemap dates currently change on every build rather than reflecting content changes.

## Implemented and verified locally

- Explicit high-priority eager loading for hero and case cover images, using the current Next.js image API.
- Matching AZ accessible names; invisible hero controls become hidden from focus when the scroll transition completes.
- Native modal screenshot viewer with Escape, restored trigger focus, explicit close, original-image link and a no-JavaScript fallback. Full-resolution images are requested only after opening.
- Twitter summary cards, project breadcrumbs and CreativeWork data connected to the Person identity. Removed misleading generated sitemap modification dates.
- Consistent AZ browser/Apple icons; favicon reduced from 25,931 to 3,119 bytes.
- CV GitHub corrected to the current account and portfolio URL added. One-page DOCX/PDF visually inspected after rendering; Bookworm's actual source repository preserved.
- Project maintenance and Search Console handoff documentation.

`npm run lint`, `npm run build`, `git diff --check` and all four end-to-end scripts passed against the production build. Chromium coverage includes 390/768/1440 widths; WebKit includes 320/390/1440. Checks cover all project routes, image decoding, scroll transitions, live reduced-motion changes, clipboard feedback, no-JavaScript content, unique metadata, JSON-LD parsing, social images, sitemap, 404 status/noindex, CV response, keyboard navigation and screenshot-dialog focus restoration. No physical-device or field-traffic claim is made.

## External dependency

The isolated production follow-up measured performance 83, LCP 2.9 s, TBT 30 ms and CLS 0.017, with substantial network latency. Accessibility/best-practices/SEO remained 100. Rather than selecting the earlier higher score, the mobile animation path was split: native Web Animations/IntersectionObserver retain the reveal and parallax behavior; GSAP/Lenis are fetched only for desktop with motion enabled. The full visual/function suite was rerun. A separate regression script checks actual fetched script content and breakpoint cleanup.

Production follow-up found conflicting inherited `index` metadata on unknown routes alongside Next.js's automatic `noindex`. Indexing now defaults to disabled in the layout, and only known pages opt in through `SITE_INDEXABLE=true`. Regression coverage checks both unknown project and unknown top-level URLs, plus indexability of valid production pages.

Search Console needs the owner's Google login. Its ownership verification and sitemap submission remain pending. See `search-console.md`.
