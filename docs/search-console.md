# Search Console handoff

The code publishes crawlable content, per-page canonicals, descriptions, social previews, Person/CreativeWork/BreadcrumbList data and a sitemap. Ownership verification is separate from these code features.

1. Sign in at https://search.google.com/search-console with the Google account that should own the property.
2. Add the URL-prefix property `https://ahmedabozahra.me/` (or the domain property if DNS verification is preferred).
3. For URL-prefix verification, obtain Google's HTML verification file or meta-tag token. The file can be placed in `public/` unchanged; a meta-tag token can be added through Next.js metadata. Do not share a Google password or login code.
4. Deploy the verification artifact, verify ownership in Search Console, and submit `https://ahmedabozahra.me/sitemap.xml`.
5. Inspect the homepage URL and request indexing. Review actual indexing and field Core Web Vitals once Google has collected data.

Status on 6 September 2026: the available browser opened the Search Console sign-in entry page. Ownership and sitemap submission have not been completed or claimed.

Official reference: https://support.google.com/webmasters/answer/9008080
