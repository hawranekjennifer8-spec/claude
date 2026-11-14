// Echtzeit-Aufnahme per CDP-Screencast (keine virtuelle Zeit -> Videos, CSS, Canvas laufen echt)
// node rec.mjs <url> <outdir> <desktop|mobile> <needlesJSON>
import { chromium } from 'playwright';
import fs from 'fs';
const [, , url, out, mode, needlesRaw] = process.argv;
const needles = JSON.parse(needlesRaw || '[]');
fs.mkdirSync(out, { recursive: true });
const MOB = mode === 'mobile';
const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--disable-renderer-backgrounding', '--disable-background-timer-throttling', '--force-color-profile=srgb'] });
const ctx = await b.newContext(MOB
  ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1' }
  : { viewport: { width: 1280, height: 800 }, deviceScaleFactor: +(process.env.DSF || 1.5) });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
const frames = [];
let fi = 0;
cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
  const f = `${out}/f${String(fi++).padStart(5, '0')}.jpg`;
  fs.writeFileSync(f, Buffer.from(data, 'base64'));
  frames.push([f, metadata.timestamp]);
  try { await cdp.send('Page.screencastFrameAck', { sessionId }); } catch (e) {}
});
const marks = [];
const mark = n => marks.push([n, Date.now() / 1000]);
const sleep = ms => new Promise(r => setTimeout(r, ms));
await p.goto('about:blank');
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 90, maxWidth: MOB ? 780 : 1920, maxHeight: MOB ? 1688 : 1200, everyNthFrame: 1 });
await sleep(300);
mark('nav');
await p.goto('https://' + url, { waitUntil: 'commit', timeout: 60000 });
await p.waitForLoadState('load', { timeout: 60000 }).catch(() => {});
mark('load');
await sleep(MOB ? 7000 : 8500);
mark('intro_end');
// Abschnittsziele finden
async function targetY(needle) {
  return await p.evaluate(nd => {
    const norm = s => s.toLowerCase().replace(/[^a-zäöüß0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
    const n = norm(nd);
    let best = null;
    for (const el of document.querySelectorAll('h1,h2,h3,h4,p,blockquote,li,span,div')) {
      if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') continue;
      const t = norm(el.innerText || '');
      if (!t.includes(n)) continue;
      if (!best || t.length < norm(best.innerText).length) best = el;
    }
    if (!best) return null;
    const r = best.getBoundingClientRect();
    return r.top + scrollY - innerHeight * 0.22;
  }, needle);
}
async function scrollTo(y, speed, maxMs) {
  const t0 = Date.now(); let last = Date.now();
  for (;;) {
    const cur = await p.evaluate(() => scrollY);
    if (cur >= y - 4 || Date.now() - t0 > (maxMs || 45000)) break;
    const now = Date.now(); const dt = Math.min(0.08, (now - last) / 1000); last = now;
    const step = Math.max(6, Math.min(speed * Math.max(dt, 0.033), (y - cur) * 0.6));
    if (MOB) await p.evaluate(d => window.scrollBy(0, d), step);
    else await p.mouse.wheel(0, step);
    await sleep(16);
  }
}
async function drift(ms, speed) {
  const t0 = Date.now(); let last = Date.now();
  while (Date.now() - t0 < ms) {
    const now = Date.now(); const dt = Math.min(0.08, (now - last) / 1000); last = now;
    const step = speed * Math.max(dt, 0.016);
    if (MOB) await p.evaluate(d => window.scrollBy(0, d), step); else await p.mouse.wheel(0, step);
    await sleep(16);
  }
}
if (!MOB) await p.mouse.move(640, 420);
// Reihenfolge nach Position
let lastY = 0;
async function findY(alts) { for (const a of [].concat(alts)) { if (a === '__top__') return (lastY = 0); if (a.startsWith('__after__:')) return (lastY = lastY + +a.split(':')[1]); const y = await targetY(a); if (y !== null) return (lastY = y); } return null; }
const tg = [];
for (const n of needles) { const y = await findY(n); tg.push([[].concat(n)[0], y]); }
fs.writeFileSync(out + '/targets.json', JSON.stringify(tg));
const sorted = tg.map((t, i) => [i, t[1]]).filter(t => t[1] !== null).sort((a, b) => a[1] - b[1]);
const speed = MOB ? 650 : 520;
for (const [i] of sorted) {
  const y = String([].concat(needles[i])[0]).startsWith('__after__:') ? tg[i][1] : await findY(needles[i]);
  await scrollTo(y, speed);
  mark('hl' + (i + 1));
  await drift(MOB ? 1800 : 2800, MOB ? 120 : 170);
}
const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
await scrollTo(H - 2, speed * 1.4);
mark('end');
await sleep(1800);
await cdp.send('Page.stopScreencast');
await sleep(300);
fs.writeFileSync(out + '/frames.json', JSON.stringify(frames.map(f => [f[0].split('/').pop(), f[1]])));
fs.writeFileSync(out + '/marks.json', JSON.stringify(marks));
console.log('frames', frames.length, 'marks', JSON.stringify(marks.map(m => m[0])), 'targets', JSON.stringify(tg.map(t => t[1] === null ? 'MISS:' + t[0] : Math.round(t[1]))));
await b.close();
