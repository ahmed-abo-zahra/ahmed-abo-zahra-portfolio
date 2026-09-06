import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const base = process.env.QA_URL || 'http://localhost:3000';
const browser = await chromium.launch();
const results = [];
for (const [width, reducedMotion] of [[390, 'no-preference'], [1440, 'reduce'], [1440, 'no-preference']]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion });
  const scripts = [];
  page.on('response', response => {
    if (response.request().resourceType() === 'script') scripts.push(response.text());
  });
  await page.goto(base, { waitUntil: 'networkidle' });
  const source = (await Promise.all(scripts)).join('\n');
  const shouldLoad = width >= 900 && reducedMotion === 'no-preference';
  assert.equal(source.includes('ScrollTrigger'), shouldLoad, `${width}/${reducedMotion}`);
  results.push({ width, reducedMotion, desktopLibraryLoaded: shouldLoad, scriptBytesDecoded: Buffer.byteLength(source) });
  if (shouldLoad) {
    await page.locator('.hero-journey.is-cinematic').waitFor();
    await page.setViewportSize({ width: 390, height: 900 });
    await page.locator('.hero-journey.is-cinematic').waitFor({ state: 'detached' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(100);
    assert.equal(await page.locator('.architecture').evaluate(el => el.style.transform), '');
  }
  await page.close();
}
await browser.close();
await writeFile('../output/qa/motion-loading.json', JSON.stringify({ base, results }, null, 2));
console.log(JSON.stringify(results));
console.log('Passed: desktop motion is absent from mobile/reduced-motion downloads; live breakpoint cleanup works.');
