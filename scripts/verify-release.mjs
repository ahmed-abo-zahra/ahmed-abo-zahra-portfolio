import { chromium, webkit } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.QA_URL || 'http://localhost:3009';
const canonicalBase = 'https://ahmedabozahra.me';
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.goto(base);
const routes = await page.locator('.project-bottom a').evaluateAll(links => links.map(a => a.getAttribute('href')));
assert.ok(routes.length >= 3);
const titles = new Set();
const results = [];
for (const route of ['/', ...routes]) {
  assert.equal((await page.goto(base + route)).status(), 200);
  const title = await page.title();
  assert.ok(!titles.has(title)); titles.add(title);
  assert.equal(await page.locator('h1').count(), 1);
  if (base === canonicalBase || process.env.QA_INDEXABLE === 'true') {
    assert.equal(await page.locator('meta[name="robots"]').first().getAttribute('content'), 'index, follow');
  }
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), canonicalBase + (route === '/' ? '' : route));
  assert.ok((await page.locator('meta[name="description"]').getAttribute('content')).length > 40);
  assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute('content'), 'summary_large_image');
  const og = await page.locator('meta[property="og:image"]').first().getAttribute('content');
  assert.equal((await context.request.get(og.replace(canonicalBase, base))).status(), 200);
  for (const text of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(text);
  if (route !== '/') {
    const graph = await page.locator('script[type="application/ld+json"]').first().textContent();
    assert.match(graph, /BreadcrumbList/);
    const trigger = page.locator('.image-preview').first();
    await trigger.click();
    const dialog = page.locator('dialog[open]');
    await dialog.waitFor();
    await dialog.locator('img').evaluate(img => img.decode());
    await page.screenshot({ path: `../output/qa/viewer-${route.split('/').pop()}.png` });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.ok(await trigger.evaluate(el => el === document.activeElement));
  }
  results.push({ route, title, status: 'passed' });
}
for (const route of ['/work/not-a-real-project', '/not-a-real-page']) {
  assert.equal((await page.goto(base + route)).status(), 404);
  for (const tag of await page.locator('meta[name="robots"]').all()) assert.match(await tag.getAttribute('content'), /noindex/);
}
const sitemap = await (await context.request.get(base + '/sitemap.xml')).text();
for (const route of routes) assert.ok(sitemap.includes(canonicalBase + route));
assert.equal((await context.request.get(base + '/Ahmed_Abo_Zahra_CV.pdf')).status(), 200);
await page.goto(base);
await page.keyboard.press('Tab');
assert.equal(await page.locator(':focus').textContent(), 'Skip to work');
await page.keyboard.press('Enter');
await page.waitForTimeout(1400);
await page.keyboard.press('Tab');
// The skip link must hand focus to the work itself. Assert that intent, not one link's wording.
const landed = await page.evaluate(() => {
  const element = document.activeElement;
  return { inWork: !!element?.closest('#work'), href: element?.getAttribute('href') ?? '' };
});
assert.ok(landed.inWork, `skip link should move focus into the work section, got ${JSON.stringify(landed)}`);
assert.match(landed.href, /^(#|\/work\/)/);
assert.deepEqual(errors, []);
await browser.close();

// Safari engine: layout, scroll enhancement and image viewer.
const safari = await webkit.launch();
for (const width of [320, 390, 1440]) {
  const tab = await safari.newPage({ viewport: { width, height: 900 } });
  await tab.goto(base, { waitUntil: 'networkidle' });
  assert.ok(await tab.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  if (width === 320) await tab.screenshot({ path: '../output/qa/safari-320.png', fullPage: true });
  await tab.locator('#contact').scrollIntoViewIfNeeded();
  await tab.goto(base + routes[0]);
  await tab.locator('.image-preview').first().click();
  await tab.locator('dialog[open] img').evaluate(img => img.decode());
  await tab.getByRole('button', { name: 'Close image', exact: true }).click();
  assert.equal(await tab.locator('dialog[open]').count(), 0);
  await tab.close();
}
await safari.close();
await mkdir('../output/qa', { recursive: true });
await writeFile('../output/qa/release-checks.json', JSON.stringify({ base, checkedAt: new Date().toISOString(), results, browsers: ['Chromium', 'WebKit'], errors }, null, 2));
console.log('Passed: metadata, schema, social images, sitemap, 404, CV, keyboard navigation, full-resolution viewer, Chromium and WebKit.');
