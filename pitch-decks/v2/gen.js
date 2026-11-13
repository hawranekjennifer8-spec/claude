// J.H. Digital Atelier – Pitch-Decks im roten Faden von Pizza Elisa / Eiscafé am Rhein
// node gen.js <key>   (Inhalte in sites.js, Medien in m/<key>/)
const pptxgen = require('pptxgenjs');
const fs = require('fs');
const SITES = require('./sites.js');
const KEY = process.argv[2];
const C = SITES[KEY];
if (!C) { console.error('unknown', KEY); process.exit(1); }
const M = 'm/' + KEY + '/';

const W = 13.333;
const HEAD = 'Georgia', BODY = 'Arial';
const ESP = '17110C', CREAM = 'F3EDE2', PAPER = 'FBF8F2', INK = '1B1513', MUTED = '6F655B', GREYBG = 'E4E0DA';
const BR = 852 / 1280;      // browser mockup h/w (Leiste + 1280x800)
const PH = 1320 / 636;      // phone mockup h/w
const A = C.acc, AS = C.accSoft;
const DATE = '01.11.2026', SHOT = '13.11.2026';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'J.H. Digital Atelier';
pres.company = 'J.H. Digital Atelier';
pres.title = 'Vorschlag für ' + C.name;
pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };

const TOTAL = 17;
let n = 0;
const b64 = f => 'image/png;base64,' + fs.readFileSync(f).toString('base64');

function newSlide(bgc) { const s = pres.addSlide(); s.background = { color: bgc }; n++; s._n = n; return s; }
function label(s, t, color) { s.addText(t, { x: 0.6, y: 0.55, w: 9, h: 0.3, fontFace: BODY, fontSize: 10, bold: true, charSpacing: 3, color, margin: 0, isTextBox: true }); }
function title(s, runs, o) { s.addText(runs, Object.assign({ fontFace: HEAD, fontSize: 40, margin: 0, valign: 'top', isTextBox: true, paraSpaceAfter: 0, fit: 'shrink' }, o)); }
function text(s, t, o) { s.addText(t, Object.assign({ fontFace: BODY, fontSize: 15, margin: 0, valign: 'top', isTextBox: true, color: MUTED, lineSpacingMultiple: 1.2, fit: 'shrink' }, o)); }
function foot(s, dark) {
  const c = dark ? '8A7E70' : '9A8F82';
  s.addText('J.H. DIGITAL ATELIER', { x: 0.6, y: 6.95, w: 4, h: 0.25, fontFace: BODY, fontSize: 8, bold: true, charSpacing: 4, color: c, margin: 0, isTextBox: true });
  s.addText(String(s._n).padStart(2, '0') + ' / ' + TOTAL, { x: W - 2.6, y: 6.95, w: 2, h: 0.25, fontFace: BODY, fontSize: 8, bold: true, charSpacing: 3, color: c, align: 'right', margin: 0, isTextBox: true });
}
function L(t, it, color, br) { return { text: t, options: Object.assign({}, it ? { italic: true, color } : {}, br ? { breakLine: true } : {}) }; }
// title helper: [plain, italic] or [[t,italic],...] lines
function runs(lines, accent) { return lines.map((l, i) => L(l[0], l[1], accent, i < lines.length - 1)); }
function img(s, file, x, y, w, ratio) { s.addImage({ path: file, x, y, w, h: w * ratio }); }
function shadowBox(s, x, y, w, h, r) { s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: r, fill: { color: 'FFFFFF', transparency: 100 }, line: { color: 'FFFFFF', transparency: 100 }, shadow: { type: 'outer', color: '1A120C', opacity: 0.28, blur: 18, offset: 6, angle: 90 } }); }
// video in browser frame (frame baked into the video)
function bvid(s, clip, x, y, w, name) {
  const h = w * BR;
  shadowBox(s, x, y, w, h, 0.06);
  s.addMedia({ type: 'video', path: M + clip + '.mp4', cover: b64(M + clip + '_p.png'), x, y, w, h, objectName: 'vid' + clip });
}
function pvid(s, clip, x, y, w) {
  const h = w * PH;
  s.addMedia({ type: 'video', path: M + clip + '.mp4', cover: b64(M + clip + '_p.png'), x, y, w, h, objectName: 'vid' + clip });
}
function tag(s, t, x, y, color, fill) { s.addText(t, { x, y, w: 1.5, h: 0.32, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 3, color, fill: fill ? { color: fill } : undefined, align: 'center', valign: 'middle', margin: 0, isTextBox: true }); }
function stars(s, x, y, size, color) { s.addText('★★★★★', { x, y, w: 3, h: size / 60, fontFace: BODY, fontSize: size, color, margin: 0, isTextBox: true }); }
function numberedRows(s, rows, x, y, w, dark, step) {
  step = step || 1.45;
  rows.forEach((r, i) => {
    const yy = y + i * step;
    s.addShape(pres.ShapeType.line, { x, y: yy - 0.18, w, h: 0, line: { color: dark ? '3A3029' : 'D8CFC2', width: 0.75 } });
    s.addText(String(i + 1).padStart(2, '0'), { x, y: yy, w: 0.9, h: 0.6, fontFace: HEAD, fontSize: 30, italic: true, color: dark ? AS : A, margin: 0, isTextBox: true });
    s.addText(r[0], { x: x + 1.0, y: yy + 0.02, w: w - 1.0, h: 0.4, fontFace: HEAD, fontSize: 20, color: dark ? CREAM : INK, margin: 0, isTextBox: true, fit: 'shrink' });
    s.addText(r[1], { x: x + 1.0, y: yy + 0.47, w: w - 1.0, h: step - 0.62, fontFace: BODY, fontSize: 13, color: dark ? 'BFB3A4' : MUTED, margin: 0, isTextBox: true, lineSpacingMultiple: 1.12, fit: 'shrink' });
  });
}
function bullets(s, list, o) {
  s.addText(list.map((t, i) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: i < list.length - 1 } })), Object.assign({ fontFace: BODY, fontSize: 15, color: MUTED, margin: 0, isTextBox: true, paraSpaceAfter: 9, valign: 'top', fit: 'shrink' }, o));
}

// ------------------------------------------------------------------ 01 Titel
let s = newSlide(ESP);
label(s, '[ J.H. DIGITAL ATELIER · VORSCHLAG FÜR ' + C.name.toUpperCase() + ' ]', 'A89A88');
title(s, [L(C.title[0], false, null, true), L(C.title[1], true, AS, true), L(C.title[2], true, AS)], { x: 0.6, y: 1.45, w: 5.2, h: 3.1, fontSize: (m => m > 20 ? 32 : m > 13 ? 37 : 44)(Math.max(...C.title.map(t => t.length))), color: CREAM, lineSpacingMultiple: 0.95 });
text(s, C.sub + '\n' + C.place + ' · November 2026', { x: 0.6, y: 4.75, w: 5.0, h: 0.9, fontSize: 14, color: 'BFB3A4' });
bvid(s, 'intro', 6.05, 1.25, 6.9);
foot(s, true);
s.addNotes(C.notes.title || 'Begrüßung, kurz vorstellen: „Wir sind von J.H. Digital Atelier, einem Webdesign-Studio aus Wiesbaden. Wir haben uns Ihren Auftritt im Netz angeschaut und Ihnen etwas mitgebracht – zehn Minuten, dann entscheiden Sie selbst.“ Noch nicht zu viel verraten.');

// ------------------------------------------------------------------ 02 QR – live mitschauen
s = newSlide(CREAM);
label(s, '[ LIVE MITSCHAUEN ]', A);
title(s, [L('Schauen Sie', false, null, true), L('gleich mit.', true, A)], { x: 0.6, y: 1.6, w: 6.4, h: 2.4, fontSize: 52, color: INK, lineSpacingMultiple: 0.95 });
text(s, 'Kamera aufs Handy, Code scannen – und die neue Seite während der Präsentation selbst durchscrollen. So, wie ' + C.whoPl + ' sie erleben würden.', { x: 0.6, y: 4.2, w: 5.6, h: 1.0 });
text(s, C.url, { x: 0.6, y: 5.35, w: 6.5, h: 0.35, fontSize: 12, bold: true, color: INK });
s.addShape(pres.ShapeType.roundRect, { x: 7.85, y: 1.05, w: 4.85, h: 4.85, rectRadius: 0.16, fill: { color: 'FFFFFF' }, line: { color: 'E3DACD', width: 0.75 }, shadow: { type: 'outer', color: '3A2A1A', opacity: 0.12, blur: 16, offset: 5, angle: 90 } });
s.addImage({ path: M + 'qr.png', x: 8.2, y: 1.4, w: 4.15, h: 4.15 });
foot(s, false);
s.addNotes('Gleich am Anfang den Inhaber den Code selbst scannen lassen: „Nehmen Sie gern Ihr Handy – dann sehen Sie die Seite parallel bei sich.“ Das Erlebnis auf dem eigenen Handy ist das stärkste Argument.');

// ------------------------------------------------------------------ 03 Ausgangspunkt
s = newSlide(CREAM);
label(s, '[ 01 · DER AUSGANGSPUNKT ]', A);
title(s, [L(C.start.head[0]), L(C.start.head[1], true, A)], { x: 0.6, y: 0.95, w: 12, h: 0.9, fontSize: 38, color: INK });
if (C.start.stats) {
  C.start.stats.forEach((st, i) => {
    const x = 0.6 + i * 4.15;
    s.addText(st[0], { x, y: 2.15, w: 3.9, h: 1.7, fontFace: HEAD, fontSize: st[0].length > 6 ? 64 : 92, color: A, margin: 0, isTextBox: true, valign: 'bottom', fit: 'shrink' });
    s.addShape(pres.ShapeType.line, { x, y: 4.05, w: 3.6, h: 0, line: { color: 'D8CFC2', width: 0.75 } });
    s.addText(st[1], { x, y: 4.25, w: 3.6, h: 0.9, fontFace: HEAD, fontSize: 18, color: INK, margin: 0, isTextBox: true, fit: 'shrink' });
    s.addText(st[2], { x, y: 5.2, w: 3.6, h: 0.5, fontFace: BODY, fontSize: 10, color: '9A8F82', margin: 0, isTextBox: true });
  });
  text(s, C.start.line, { x: 0.6, y: 6.05, w: 12, h: 0.45, fontSize: 17, color: INK, italic: true, fontFace: HEAD });
} else {
  s.addText(C.start.rating, { x: 0.45, y: 1.95, w: 5.2, h: 2.7, fontFace: HEAD, fontSize: 190, color: A, margin: 0, isTextBox: true, valign: 'top' });
  stars(s, 0.65, 4.75, 26, 'C9A46A');
  text(s, C.start.count + ' Bewertungen auf Google', { x: 0.65, y: 5.35, w: 5, h: 0.35, fontSize: 15, bold: true, color: INK });
  text(s, 'Quelle: Google Maps, Stand ' + DATE, { x: 0.65, y: 5.75, w: 5, h: 0.3, fontSize: 10, color: '9A8F82' });
  s.addText([L(C.start.three[0], false, null, true), L(C.start.three[1], false, null, true), L(C.start.three[2], true, A)], { x: 6.6, y: 2.25, w: 6.1, h: 2.0, fontFace: HEAD, fontSize: 32, color: INK, margin: 0, isTextBox: true, lineSpacingMultiple: 1.05, fit: 'shrink' });
  text(s, C.start.para, { x: 6.6, y: 4.5, w: 5.6, h: 1.4, fontSize: 16 });
}
foot(s, false);
s.addNotes(C.notes.start);

// ------------------------------------------------------------------ 03 Moment der Wahrheit
s = newSlide(ESP);
label(s, '[ 02 · DER MOMENT DER WAHRHEIT ]', 'A89A88');
title(s, [L(C.scene[0], false, null, true), L(C.scene[1], true, AS)], { x: 0.6, y: 1.5, w: 7.2, h: 2.2, fontSize: 46, color: CREAM, lineSpacingMultiple: 0.98 });
text(s, C.scene[2], { x: 0.6, y: 4.0, w: 6.4, h: 1.7, fontSize: 17, color: 'BFB3A4' });
if (C.oldNone) {
  s.addShape(pres.ShapeType.roundRect, { x: 8.6, y: 0.9, w: 3.75, h: 5.6, rectRadius: 0.3, fill: { color: '221A14' }, line: { color: '3A3029', width: 1 } });
  s.addText([L('Keine eigene', false, null, true), L('Website.', true, AS)], { x: 8.85, y: 2.3, w: 3.25, h: 1.4, fontFace: HEAD, fontSize: 30, color: CREAM, align: 'center', margin: 0, isTextBox: true });
  text(s, C.oldNone, { x: 8.95, y: 3.9, w: 3.05, h: 1.6, fontSize: 13, color: 'BFB3A4', align: 'center' });
} else {
  img(s, M + 'old_p.png', 8.85, 0.45, 3.1, PH);
  text(s, 'Heute: ' + C.oldUrl, { x: 8.1, y: 6.95, w: 4.6, h: 0.25, fontSize: 9, color: '8A7E70', align: 'center' });
}
s.addText(String(s._n).padStart(2, '0') + ' / ' + TOTAL, { x: 0.6, y: 6.95, w: 2, h: 0.25, fontFace: BODY, fontSize: 8, bold: true, charSpacing: 3, color: '8A7E70', margin: 0, isTextBox: true });
s.addNotes(C.notes.scene);

// ------------------------------------------------------------------ 04 Was er heute findet
s = newSlide(GREYBG);
label(s, '[ 03 · WAS ' + C.who.toUpperCase() + ' HEUTE FINDET ]', '8C8279');
title(s, [L('Was ' + C.who, false, null, true), L('heute findet', true, A)], { x: 0.6, y: 0.95, w: 4.55, h: 1.3, fontSize: 30, color: INK, lineSpacingMultiple: 0.98 });
if (!C.oldNone) img(s, M + 'old_b.png', 5.3, 1.0, 7.9, BR);
else { s.addShape(pres.ShapeType.roundRect, { x: 5.3, y: 1.0, w: 7.9, h: 7.9 * BR, rectRadius: 0.1, fill: { color: 'D6D1CA' }, line: { color: 'C9C2B8' } }); s.addText([L('www.' + C.wish, false), L('', false)], { x: 5.3, y: 2.6, w: 7.9, h: 1, fontFace: HEAD, fontSize: 30, color: '8C8279', align: 'center', isTextBox: true }); text(s, 'Diese Adresse führt heute nirgendwohin.', { x: 5.3, y: 3.6, w: 7.9, h: 0.4, fontSize: 13, align: 'center', color: '8C8279' }); }
numberedRows(s, C.findings, 0.6, 2.6, 4.55, false, 1.33);
text(s, C.oldNone ? ('Recherche vom ' + DATE + ' · Google, Instagram') : ('Aufnahme von ' + C.oldUrl + ', ' + SHOT), { x: 0.6, y: 6.6, w: 7, h: 0.25, fontSize: 9, color: '9A8F82' });
foot(s, false);
s.addNotes(C.notes.findings);

// ------------------------------------------------------------------ 05 Was das kostet
s = newSlide(CREAM);
label(s, '[ 04 · WAS DAS KOSTET ]', A);
title(s, [L('Was Sie das '), L(C.costWord, true, A), L(' kostet')], { x: 0.6, y: 0.95, w: 12, h: 0.9, fontSize: 38, color: INK });
numberedRows(s, C.cost, 0.6, 2.35, 12.1, false);
foot(s, false);
s.addNotes(C.notes.cost);

// ------------------------------------------------------------------ 06 Divider
s = newSlide(ESP);
label(s, '[ 05 · DER VORSCHLAG ]', 'A89A88');
title(s, [L('Und so könnte', false, null, true), L('es aussehen.', true, AS)], { x: 0.6, y: 2.2, w: 5.6, h: 2.6, fontSize: 54, color: CREAM, lineSpacingMultiple: 0.95 });
bvid(s, 'hero', 6.6, 1.5, 6.3);
foot(s, true);
s.addNotes('Kurze Pause, dann umschalten. „Wir haben uns erlaubt, schon mal etwas vorzubereiten.“ – Laptop oder Tablet zum Inhaber drehen.');

// ------------------------------------------------------------------ 08 Der erste Eindruck (Intro)
s = newSlide(ESP);
label(s, '[ 06 · DER ERSTE EINDRUCK ]', 'A89A88');
title(s, [L('So öffnet sich '), L('Ihre Seite.', true, AS)], { x: 0.6, y: 0.95, w: 12, h: 0.75, fontSize: 34, color: CREAM });
bvid(s, 'intro', 0.6, 2.05, 7.2);
pvid(s, 'pintro', 8.15, 2.05, 2.3);
tag(s, 'AM COMPUTER', 0.6, 1.62, 'D6CCC0');
tag(s, 'AM HANDY', 8.55, 1.62, 'D6CCC0');
text(s, 'Die ersten Sekunden entscheiden. So begrüßt Ihre neue Seite jeden Besucher – echte Aufnahmen der Konzeptseite beim ersten Aufruf.', { x: 10.8, y: 2.1, w: 1.95, h: 3.2, fontSize: 13, color: 'BFB3A4' });
foot(s, true);
s.addNotes('Nichts sagen, einfach laufen lassen. Dann: „Das ist der erste Eindruck – am Computer und am Handy. Genau hier entscheidet ' + C.who + ', ob ' + C.who2 + ' bleibt.“');

// ------------------------------------------------------------------ 09 Vorher / Nachher Desktop
s = newSlide(PAPER);
label(s, '[ 07 · VORHER / NACHHER ]', A);
title(s, [L(C.ba[0] + ' '), L('Ein ganz anderer Eindruck.', true, A)], { x: 0.6, y: 0.95, w: 12, h: 0.8, fontSize: 34, color: INK });
if (!C.oldNone) img(s, M + 'old_b.png', 0.25, 2.0, 6.4, BR);
else { s.addShape(pres.ShapeType.roundRect, { x: 0.25, y: 2.0, w: 6.4, h: 6.4 * BR, rectRadius: 0.08, fill: { color: 'E9E4DD' }, line: { color: 'D8CFC2' } }); s.addText('Keine eigene Website', { x: 0.25, y: 3.7, w: 6.4, h: 0.6, fontFace: HEAD, fontSize: 24, italic: true, color: '8C8279', align: 'center', isTextBox: true }); }
bvid(s, 'hero', 6.7, 2.0, 6.4);
tag(s, 'VORHER', 0.75, 6.45, '8C8279', 'E9E4DD');
tag(s, 'NACHHER', 7.2, 6.45, 'FFFFFF', A);
text(s, C.ba[1], { x: 2.4, y: 6.5, w: 4.0, h: 0.3, fontSize: 12, color: '8C8279' });
text(s, C.ba[2], { x: 8.85, y: 6.5, w: 4.3, h: 0.3, fontSize: 12, color: INK });
s.addNotes('Nichts sagen, drei Sekunden wirken lassen. Dann: „Links das, was ' + C.who + ' heute sieht. Rechts das, was ' + C.who2 + ' sehen könnte.“');

// ------------------------------------------------------------------ 08 Handy
s = newSlide(CREAM);
label(s, '[ 07 · VORHER / NACHHER · AM HANDY ]', A);
title(s, [L(C.phone[0]), L(C.phone[1], true, A)], { x: 0.6, y: 0.95, w: 4.6, h: 1.5, fontSize: 36, color: INK });
text(s, C.phone[2], { x: 0.6, y: 2.65, w: 4.3, h: 2.2, fontSize: 15 });
if (!C.oldNone) img(s, M + 'old_p.png', 5.75, 0.55, 2.95, PH);
else { s.addShape(pres.ShapeType.roundRect, { x: 5.75, y: 0.55, w: 2.95, h: 2.95 * PH, rectRadius: 0.35, fill: { color: 'E9E4DD' }, line: { color: 'D8CFC2' } }); s.addText('Keine eigene Website', { x: 5.75, y: 3.2, w: 2.95, h: 0.6, fontFace: HEAD, fontSize: 18, italic: true, color: '8C8279', align: 'center', isTextBox: true }); }
pvid(s, 'ph_c', 9.15, 0.55, 2.95);
tag(s, 'VORHER', 6.47, 6.72, '8C8279', 'E9E4DD');
tag(s, 'NACHHER', 9.87, 6.72, 'FFFFFF', A);
s.addNotes('Das ist die wichtigste Folie. „Öffnen Sie gern mal Ihre jetzige Seite auf Ihrem Handy.“ Danach die neue zeigen – oder direkt auf dem eigenen Handy über den QR-Code vom Anfang. Der Unterschied überzeugt mehr als jedes Wort.');

// ------------------------------------------------------------------ 09 In Bewegung
s = newSlide(ESP);
label(s, '[ 08 · IN BEWEGUNG ]', 'A89A88');
title(s, [L('Die neue Seite '), L('in Bewegung', true, AS)], { x: 0.6, y: 0.95, w: 12, h: 0.7, fontSize: 32, color: CREAM });
{ const vw = 7.75, vx = (W - vw) / 2; bvid(s, 'full', vx, 1.8, vw); text(s, 'Echte Bildschirmaufnahme der Konzeptseite', { x: vx, y: 1.8 + vw * BR + 0.1, w: vw, h: 0.3, fontSize: 10, color: '8A7E70', align: 'center' }); }
foot(s, true);
s.addNotes('Das Video startet automatisch. Mitkommentieren: ' + C.videoTalk + ' Nicht über das Video reden – es spricht für sich.');

// ------------------------------------------------------------------ 10–12 Highlights
C.hl.forEach((h, i) => {
  const dark = i === 1;
  s = newSlide(dark ? C.acc2 : (i === 0 ? PAPER : CREAM));
  label(s, '[ HIGHLIGHT ' + (i + 1) + ' ]', dark ? 'D6CCC0' : A);
  title(s, [L(h.t[0], false, null, true), L(h.t[1], true, dark ? AS : A)], { x: 0.6, y: 1.35, w: 4.9, h: 1.9, fontSize: 38, color: dark ? CREAM : INK, lineSpacingMultiple: 0.98 });
  if (h.b) bullets(s, h.b, { x: 0.6, y: 3.45, w: 4.75, h: 2.6, color: dark ? 'E3DAD0' : MUTED });
  else text(s, h.p, { x: 0.6, y: 3.45, w: 4.75, h: 2.4, fontSize: 17, color: dark ? 'E3DAD0' : MUTED });
  bvid(s, 'h' + (i + 1), 5.55, 1.15, 7.45);
  foot(s, dark);
  s.addNotes(h.n);
});

// ------------------------------------------------------------------ 13 Paket
s = newSlide(PAPER);
label(s, '[ 09 · WAS SIE BEKOMMEN ]', A);
title(s, [L('Alles aus einer Hand – '), L('fertig, nicht halb fertig', true, A)], { x: 0.6, y: 0.95, w: 12, h: 0.9, fontSize: 34, color: INK });
{
  const items = [
    ['Design & Umsetzung', 'Die Website wie gezeigt – optimiert für Handy, Tablet und Desktop.'],
    C.pkg2,
    ['Domain, SSL & Hosting', C.pkgDomain || 'Ihre eigene Adresse – sicher verschlüsselt, schnell geladen.'],
    ['Google-Optimierung', 'Unternehmensprofil abgestimmt, strukturierte Daten für die Suche.'],
    ['Rechtstexte', 'Impressum, Datenschutzerklärung und Cookie-Hinweis – aktuell und korrekt.'],
    ['Pflege auf Wunsch', C.pkgCare],
  ];
  const cw = 3.85, ch = 2.05, gx = 0.3, gy = 0.3, x0 = 0.6, y0 = 2.35;
  items.forEach((it, i) => {
    const cx = x0 + (i % 3) * (cw + gx), cy = y0 + Math.floor(i / 3) * (ch + gy);
    s.addShape(pres.ShapeType.roundRect, { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.12, fill: { color: 'FFFFFF' }, line: { color: 'E3DACD', width: 0.75 }, shadow: { type: 'outer', color: '3A2A1A', opacity: 0.08, blur: 10, offset: 3, angle: 90 } });
    s.addShape(pres.ShapeType.ellipse, { x: cx + 0.3, y: cy + 0.3, w: 0.5, h: 0.5, fill: { color: A } });
    s.addText(String(i + 1), { x: cx + 0.3, y: cy + 0.3, w: 0.5, h: 0.5, fontFace: HEAD, fontSize: 15, italic: true, color: 'FFFFFF', align: 'center', valign: 'middle', margin: 0, isTextBox: true });
    s.addText(it[0], { x: cx + 0.3, y: cy + 0.95, w: cw - 0.6, h: 0.38, fontFace: HEAD, fontSize: 17, color: INK, margin: 0, isTextBox: true, fit: 'shrink' });
    s.addText(it[1], { x: cx + 0.3, y: cy + 1.35, w: cw - 0.6, h: 0.6, fontFace: BODY, fontSize: 12, color: MUTED, margin: 0, isTextBox: true, lineSpacingMultiple: 1.1, fit: 'shrink' });
  });
}
foot(s, false);
s.addNotes('Paket kurz durchgehen, Betonung: „Sie müssen sich um nichts kümmern.“');

// ------------------------------------------------------------------ 14 Preis
s = newSlide(ESP);
label(s, '[ 10 · INVESTITION ]', 'A89A88');
title(s, [L('Klare Preise. '), L('Keine Überraschungen.', true, AS)], { x: 0.6, y: 0.95, w: 12, h: 0.9, fontSize: 34, color: CREAM });
{
  const box = (x, head, price, per, lines, hi) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.2, w: 5.75, h: 3.95, rectRadius: 0.14, fill: { color: hi ? CREAM : '221A14' }, line: { color: hi ? CREAM : '3A3029', width: 0.75 } });
    s.addText(head, { x: x + 0.45, y: 2.55, w: 4.9, h: 0.3, fontFace: BODY, fontSize: 10, bold: true, charSpacing: 3, color: hi ? A : 'A89A88', margin: 0, isTextBox: true });
    s.addText([{ text: price, options: { fontSize: 60 } }, { text: per, options: { fontSize: 18, italic: true } }], { x: x + 0.45, y: 2.95, w: 4.9, h: 1.1, fontFace: HEAD, color: hi ? INK : CREAM, margin: 0, isTextBox: true, valign: 'bottom' });
    s.addText(lines.map((l, i) => ({ text: l, options: { bullet: { indent: 14 }, breakLine: i < lines.length - 1 } })), { x: x + 0.45, y: 4.3, w: 4.9, h: 1.6, fontFace: BODY, fontSize: 13, color: hi ? MUTED : 'BFB3A4', margin: 0, isTextBox: true, paraSpaceAfter: 6 });
  };
  box(0.6, 'WEBSITE-PAKET · EINMALIG', '890 €', '', ['Komplette Website wie gezeigt', 'Domain, Google-Einrichtung, Rechtstexte', 'Live in wenigen Tagen'], true);
  box(6.95, 'PFLEGE & SERVICE · OPTIONAL', '39 €', '  / Monat', ['Hosting, Domain & SSL inklusive', C.careLine, 'Monatlich kündbar'], false);
}
text(s, 'Festpreise · Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. ' + C.priceExtra, { x: 0.6, y: 6.35, w: 12, h: 0.35, fontSize: 11, color: '8A7E70' });
foot(s, true);
s.addNotes('Preis ruhig und selbstbewusst nennen, nicht entschuldigen. Danach schweigen und reagieren lassen. Einwände: „Zu teuer“ → ' + C.objection + ' / „Läuft auch so“ → „Absolut – ' + C.runsFine + ' Wir sorgen dafür, dass das auch online jeder sieht.“ / „Mein Neffe macht das“ → „Gern – zeigen Sie ihm die Seite. Wir liefern fertig, rechtssicher und mit Pflege, Sie müssen sich um nichts kümmern.“ / „Muss ich überlegen“ → „Gerne. Der Entwurf steht ja schon – soll ich Ihnen den Link dalassen?“');

// ------------------------------------------------------------------ 16 Abschluss
s = newSlide(ESP);
label(s, '[ J.H. DIGITAL ATELIER ]', 'A89A88');
title(s, [L(C.close[0], false, null, true), L(C.close[1], false, null, true), L(C.close[2], true, AS)], { x: 0.6, y: 1.7, w: 9.4, h: 2.6, fontSize: 46, color: CREAM, lineSpacingMultiple: 0.98 });
s.addShape(pres.ShapeType.roundRect, { x: 10.55, y: 1.55, w: 2.15, h: 2.15, rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'FFFFFF' } });
s.addImage({ path: M + 'qr.png', x: 10.7, y: 1.7, w: 1.85, h: 1.85 });
text(s, 'Live ansehen', { x: 10.55, y: 3.8, w: 2.15, h: 0.3, fontSize: 10, color: 'A89A88', align: 'center' });
s.addShape(pres.ShapeType.line, { x: 0.6, y: 4.75, w: 12.1, h: 0, line: { color: '3A3029', width: 0.75 } });
s.addText([{ text: 'J.H.', options: { fontFace: HEAD, fontSize: 26, charSpacing: 6, color: CREAM, breakLine: true } }, { text: 'DIGITAL ATELIER', options: { fontFace: BODY, fontSize: 9, bold: true, charSpacing: 8, color: 'A89A88' } }], { x: 0.6, y: 5.05, w: 4, h: 0.9, margin: 0, isTextBox: true });
s.addText([L('Jennifer Hawranek', false, null, true), L('jenniferhawranekdigitalatelier.de', false, null, true), L('Instagram @jh.digitalatelier')], { x: 7.6, y: 5.05, w: 5.1, h: 0.95, fontFace: BODY, fontSize: 13, color: 'BFB3A4', align: 'right', margin: 0, isTextBox: true, lineSpacingMultiple: 1.2 });
foot(s, true);
s.addNotes('Abschluss: Danke sagen, Kontaktdaten dalassen, nächsten Schritt konkret machen: „Wenn Sie möchten, ist die Seite in wenigen Tagen unter Ihrer Adresse online.“');

pres.writeFile({ fileName: 'out/raw_' + KEY + '.pptx' }).then(f => console.log('wrote', f, n));
