import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base = process.env.QA_URL || 'http://localhost:3005';
const browser = await chromium.launch();
const errors = [];
for (const width of [390, 768, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('.craft-heading').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `../output/qa/craft-${width}.png` });
  await page.locator('[data-layer="data"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `../output/qa/craft-expanded-${width}.png` });
  assert.equal(await page.locator('.craft-chapter').count(), 3);
  await page.locator('.process-section').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `../output/qa/process-${width}.png` });
  assert.equal(await page.locator('.process-steps li').count(), 4);
  await page.getByRole('button', { name: 'Copy email' }).click();
  await page.getByRole('status').filter({ hasText: 'Email address copied.' }).waitFor();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'ahmedabozahra68@gmail.com');
  await page.screenshot({ path: `../output/qa/contact-${width}.png` });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  assert.ok(await page.locator('.system-plane').evaluateAll(elements => elements.every(element => !element.style.transform)));
  await context.close();
}
const page = await browser.newPage({ javaScriptEnabled: false });
await page.goto(base);
assert.equal(await page.locator('.craft-chapter').count(), 3);
assert.equal(await page.locator('.process-steps li').count(), 4);
for (const path of ['easylink-telecom', 'qalb-zaker', 'bookworm']) {
  await page.goto(`${base}/work/${path}`);
  const next = page.locator('.case-next a').first();
  assert.notEqual(await next.getAttribute('href'), `/work/${path}`);
  assert.equal((await page.goto(base + await next.getAttribute('href'))).status(), 200);
}
assert.deepEqual(errors, []);
await browser.close();
console.log('Passed: responsive scenes, copy email, reduced-motion cleanup, no-JS content and next-project navigation.');
