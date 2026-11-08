import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.QA_URL || 'http://localhost:3000';
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined });
try {
  for (const [width, reducedMotion] of [[390, 'no-preference'], [1440, 'reduce'], [1440, 'no-preference']]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion });
    const scriptBodies = [];
    page.on('response', async response => {
      if (response.request().resourceType() === 'script') {
        try { scriptBodies.push(await response.text()); } catch {}
      }
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => entry.name));
    assert.equal(scriptBodies.some(body => /ScrollTrigger|Lenis|gsap/i.test(body)), false, `${width}/${reducedMotion}`);
    assert.equal(resources.some(url => /desktop-motion|motion-experience|gsap|lenis/i.test(url)), false, `${width}/${reducedMotion}`);
    assert.equal(await page.locator('.scroll-cue, .journey-progress, .build-scene').count(), 0);
    await page.close();
  }
} finally {
  await browser.close();
}
console.log('Passed: native scrolling with no scroll-animation bundle or decorative scroll cue.');
