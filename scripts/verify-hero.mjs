import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined });
const base = process.env.QA_URL || 'http://localhost:3000';
const errors = [];
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('.hero-portrait img').count(), 1);
    assert.equal(await page.locator('.exhibit').count(), 3);
    assert.equal(await page.locator('.scroll-cue, .journey-progress, .build-scene, .process-track, .contact-orb').count(), 0);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.doesNotMatch(await page.locator('body').innerText(), /[↗↓←→]/);
    await page.locator('.hero-actions a[href="#work"]').evaluate(el => el.click());
    await page.waitForFunction(() => location.hash === '#work');
    assert.ok(await page.locator('#work').evaluate(el => Math.abs(el.getBoundingClientRect().top) < 5));
    await page.close();
  }
  const nojs = await browser.newPage({ javaScriptEnabled: false });
  await nojs.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await nojs.locator('h1').count(), 1);
  assert.equal(await nojs.locator('[data-project-card]').count(), 3);
  assert.equal(await nojs.locator('.hero-portrait img').count(), 1);
  assert.deepEqual(errors, []);
  await nojs.close();
} finally {
  await browser.close();
}
console.log('Passed: clean hero, visible portrait, work anchor, responsive width, and server-rendered content.');
