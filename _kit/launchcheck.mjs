// 20-Punkte-Launch-Check (nach @dimarussu_ „20 things to tell Claude before launching your site“)
// Aufruf: node launchcheck.mjs <url> [<url> …]   (braucht Playwright)
import { chromium, devices } from 'playwright';
const urls = process.argv.slice(2);
const b = await chromium.launch();
for (const url of urls) {
  const base = new URL(url);
  const res = []; const ok = (n, pass, info = '') => res.push([n, pass, info]);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); let bytes = 0; const ext = new Set();
  p.on('response', async r => { try { const l = +r.headers()['content-length'] || 0; bytes += l } catch {} ; const h = new URL(r.url()).host; if (h !== base.host) ext.add(h) });
  const t0 = Date.now(); await p.goto(url, { waitUntil: 'load', timeout: 60000 }); const tLoad = Date.now() - t0;
  await p.waitForTimeout(1500);
  const d = await p.evaluate(() => {
    const q = s => document.querySelector(s), qa = s => [...document.querySelectorAll(s)];
    const links = qa('a[href]').map(a => a.getAttribute('href'));
    return {
      privacy: links.some(h => /datenschutz|privacy/i.test(h)), imprint: links.some(h => /impressum|imprint/i.test(h)),
      terms: links.some(h => /agb|terms/i.test(h)),
      cta: qa('a.btn,button,.btn,a[class*=cta]').filter(e => e.offsetParent).length,
      faq: !!qa('h2,h3').find(h => /faq|fragen/i.test(h.textContent)),
      imgs: qa('img').length, noAlt: qa('img').filter(i => !i.hasAttribute('alt')).map(i => i.getAttribute('src')).slice(0, 5),
      title: document.title, desc: q('meta[name=description]')?.content || '',
      og: { t: !!q('meta[property="og:title"]'), d: !!q('meta[property="og:description"]'), i: !!q('meta[property="og:image"]') },
      icon: !!q('link[rel~=icon]'), canonical: q('link[rel=canonical]')?.href || '', robots: q('meta[name=robots]')?.content || '',
      lang: document.documentElement.lang, h1: qa('h1').length, viewport: !!q('meta[name=viewport]'),
      unnamed: qa('button,a[href]').filter(e => !(e.textContent.trim() || e.getAttribute('aria-label') || e.querySelector('img[alt]:not([alt=""])'))).length,
      forms: qa('form').length, internal: [...new Set(links.filter(h => h && !h.startsWith('#') && !/^(mailto|tel):/.test(h)))]
    }
  });
  const cookies = await ctx.cookies();
  const st = async u => { try { const r = await p.request.get(new URL(u, url).href, { maxRedirects: 3 }); return r.status() } catch { return 0 } };
  const robotsTxt = await st('/robots.txt'), sitemap = await st('/sitemap.xml'), nf = await st('/diese-seite-gibt-es-nicht-404');
  const broken = []; for (const h of d.internal) { if (new URL(h, url).host !== base.host) continue; const s = await st(h); if (s >= 400 || s === 0) broken.push(h + ' → ' + s) }
  const mob = await b.newContext({ ...devices['iPhone 13'] }); const mp = await mob.newPage(); await mp.goto(url, { waitUntil: 'load' }); await mp.waitForTimeout(1200);
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - innerWidth); await mob.close();
  const noindex = /noindex/.test(d.robots);
  ok('01 Datenschutzerklärung verlinkt', d.privacy); ok('02 AGB/Terms (nur bei Shops/Buchung)', d.terms || 'n/a');
  ok('03 klare CTA', d.cta > 0, d.cta + ' Buttons'); ok('04 FAQ', d.faq || 'optional');
  ok('05 robots.txt', robotsTxt === 200, robotsTxt); ok('06 sitemap.xml', sitemap === 200 || (noindex ? 'n/a (noindex)' : false), sitemap);
  ok('07 eigene 404', nf === 404, nf); ok('08 Alt-Texte', d.noAlt.length === 0, d.imgs + ' Bilder, ohne alt: ' + d.noAlt.join(', '));
  ok('09 Analytics (nur mit Consent)', 'bewusst keins');
  ok('10 Meta-Title', d.title.length >= 10 && d.title.length <= 65, d.title.length + ' Z.'); ok('11 Meta-Description', d.desc.length >= 50 && d.desc.length <= 165, d.desc.length + ' Z.');
  ok('12 Social Share (OG)', d.og.t && d.og.d && d.og.i, JSON.stringify(d.og)); ok('13 Favicon', d.icon);
  ok('14 Canonical', !!d.canonical || (noindex ? 'n/a (noindex)' : false), d.canonical);
  ok('15 Cookie-Consent', cookies.length === 0 ? 'nicht nötig (0 Cookies)' : false, cookies.length + ' Cookies');
  ok('16 Mobile', d.viewport && overflow <= 1, 'Overflow ' + overflow + 'px');
  ok('17 Barrierefreiheit (lang, 1×h1, Namen)', !!d.lang && d.h1 === 1 && d.unnamed === 0, `lang=${d.lang} h1=${d.h1} ohneNamen=${d.unnamed}`);
  ok('18 Formulare', d.forms === 0 ? 'keine (mailto)' : 'manuell testen', d.forms);
  ok('19 Broken Links', broken.length === 0, broken.join(' | ')); ok('20 Performance', tLoad < 3500, `load ${tLoad} ms, ~${Math.round(bytes / 1024)} KB, fremde Hosts: ${[...ext].join(',') || 'keine'}`);
  console.log('\n=== ' + url); for (const [n, pass, info] of res) console.log((pass === true ? '✔' : pass === false ? '✘' : '•') + ' ' + n + (typeof pass === 'string' ? ' – ' + pass : '') + (info !== '' ? '  [' + info + ']' : ''));
  await ctx.close();
}
await b.close();
