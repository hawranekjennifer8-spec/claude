import { chromium } from 'playwright';
const [, , url, out] = process.argv;
const b = await chromium.launch();
for (const [mode, o] of [['d', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1' }]]) {
  const c = await b.newContext(Object.assign({ ignoreHTTPSErrors: true }, o)); const p = await c.newPage();
  let ok = false;
  for (const pre of ['https://', 'http://', 'https://www.', 'http://www.']) { try { await p.goto(pre + url, { waitUntil: 'load', timeout: 30000 }); ok = true; break; } catch (e) {} }
  await p.waitForTimeout(3500);
  await p.screenshot({ path: `${out}/old_${mode}.png` });
  console.log(mode, ok, p.url());
  await c.close();
}
await b.close();
