import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.QA_URL || 'http://localhost:3000';
const browser = await chromium.launch();
const errors = [];
for (const width of [390, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  for (const route of ['/', '/work/easylink-telecom', '/work/qalb-zaker', '/work/bookworm']) {
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, route);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);
    const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(dimensions.scroll <= dimensions.width, `${route} overflows at ${width}: ${JSON.stringify(dimensions)}`);
    for (const img of await page.locator('img').all()) {
      if (!await img.isVisible()) continue;
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(image => image.decode());
      assert.ok(await img.evaluate(image => image.naturalWidth > 0));
    }
    if (route === '/') {
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `../output/qa/final-home-${width}.png` });
      assert.ok(await page.locator('a[href="mailto:ahmedabozahra68@gmail.com"]').count());
      assert.ok(await page.locator('a[href="https://wa.me/201010752614"]').count());
    }
  }
  await page.close();
}
assert.deepEqual(errors, []);
const result = await fetch(base + '/Ahmed_Abo_Zahra_CV.pdf');
assert.equal(result.status, 200);
assert.match(result.headers.get('content-type'), /pdf/);
await browser.close();
console.log('Passed: 4 routes × 3 widths, image decoding, headings, overflow, contact links, PDF, and browser errors.');
