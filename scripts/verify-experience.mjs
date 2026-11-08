import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base = process.env.QA_URL || 'http://localhost:3005';
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined });
const errors = [];
const outputDir = process.env.QA_OUTPUT_DIR || '../output/qa';
await mkdir(outputDir, { recursive: true });
for (const width of [390, 768, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  const sequence = await page.locator('main > section').evaluateAll(sections => sections.map(section => section.id || section.className));
  assert.deepEqual(sequence, ['top', 'work', 'services', 'process-section', 'about', 'contact']);
  assert.equal(await page.locator('[data-project-card]').count(), 3);
  assert.equal(await page.locator('.portal-reveal, .reveal-wall, .work-index, .craft-section').count(), 0);
  for (const project of await page.locator('[data-project-card]').all()) {
    assert.notEqual(await project.evaluate(el => getComputedStyle(el).position), 'sticky');
  }
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({path: `${outputDir}/contribution-${width}.png`});
  assert.equal(await page.locator('.service-grid article').count(), 4);
  await page.locator('.process-section').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${outputDir}/process-${width}.png` });
  assert.equal(await page.locator('.process-steps li').count(), 4);
  await page.getByRole('button', { name: 'Copy email' }).click();
  await page.getByRole('status').filter({ hasText: 'Email address copied.' }).waitFor();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'ahmedabozahra68@gmail.com');
  await page.screenshot({ path: `${outputDir}/contact-${width}.png` });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  assert.equal(await page.locator('.scroll-cue, .journey-progress, .build-scene, .process-track').count(), 0);
  await context.close();
}
const page = await browser.newPage({ javaScriptEnabled: false });
await page.goto(base);
assert.equal(await page.locator('.service-grid article').count(), 4);
assert.equal(await page.locator('.process-steps li').count(), 4);
for (const path of ['aso-clo', 'easylink-telecom', 'qalb-zaker', 'bookworm']) {
  await page.goto(`${base}/work/${path}`);
  const next = page.locator('.case-next a[href^="/work/"]').first();
  if (await next.count()) {
    const href = await next.getAttribute('href');
    assert.notEqual(href, `/work/${path}`);
    assert.equal((await page.goto(base + href)).status(), 200);
  }
}
assert.deepEqual(errors, []);
await browser.close();
console.log('Passed: responsive scenes, copy email, reduced-motion cleanup, no-JS content and next-project navigation.');
