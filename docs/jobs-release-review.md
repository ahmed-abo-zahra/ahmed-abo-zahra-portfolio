# Job-application portfolio update - 11 October 2026

## Presentation

Homepage selected work: ASO CLO, Easylink Telecom, Qalb Zaker. Bookworm remains accessible at its existing URL and in the sitemap. Each featured case explains the implementation, independent role, user workflow, available features, and release/demo boundaries. Default CV download is now the job-focused one-page version.

## Evidence

- ASO source: local OSA-CLO checkout, Next.js/React/TypeScript storefront and admin route handlers. Screenshots captured from localhost in demo mode with fictional fixtures only. Catalog/product, dashboard overview, and partner product management reviewed. CSV export downloaded successfully. `DEMO_TEST_URL=http://localhost:3051 node scripts/test-demo-api.mjs` passed 21 checks and restored the local data file: session forgery, partner ownership, image/product creation/deletion, variant validation, combined stock, server pricing, masked tracking.
- ASO public preview: https://aso-clo-frontend-demo.vercel.app/ (standalone HTML/CSS/JavaScript). It does not demonstrate the Next.js backend/dashboard. The older https://osa-clo.vercel.app/ currently has an empty catalog and is not used as the portfolio preview. No live Supabase or payment claims were added. No ASO deployment or real customer data changes were made.
- Easylink: homepage and call-center service page respond successfully at https://easylink-eg.com/. Case covers the public site; screenshot service descriptions belong to the company, not an assertion that the developer supplies telecom services.
- Qalb Zaker: https://qalb-zaker.vercel.app/ responds successfully. Landing page RTL, features, responsive layouts, and motion are shown; app concept illustrations are not treated as evidence of a released application.
- CV: one page; seven valid URI annotations; rendered and reviewed. Education and freelance dates retain the previously confirmed values. Source: `scripts/build_jobs_cv.py`.

## Regression checks

The additional screenshot layout exposed an existing absolute-positioning issue. Feature image previews now have their own relative box, and release QA opens every image on each featured case rather than only the cover. Test suite includes the new ASO route and preserved Bookworm route.

Build, ESLint, desktop/mobile layout, reduced motion, no-JavaScript content, metadata/schema/canonical URLs, sitemap, 404, PDF delivery, viewer/keyboard focus, and Chromium/WebKit are release checks. Contact delivery was verified in the previous release and the form implementation was not changed in this update.
