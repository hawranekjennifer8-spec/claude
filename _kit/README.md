# J.H. Animations-Kit (lokal gehostet, DSGVO-sicher)

Dieses Kit wird in jede neue Website kopiert, und zwar nur die Dateien, die die Seite wirklich braucht. **Keine CDN-Links** wie `cdn.jsdelivr.net` oder `unpkg.com` in Live-Seiten: Sie übertragen die IP der Besucher an Dritte (siehe Masterprompt 7.3). Die CDN-Zeilen aus den Anleitungen ersetze ich immer durch die lokalen Dateien.

| Datei | Version | Lizenz | Wofür |
|---|---|---|---|
| `vendor/gsap/gsap.min.js` + alle Plugins (ScrollTrigger, SplitText, ScrollSmoother, Flip, Draggable, MorphSVG, DrawSVG, MotionPath, ScrambleText, CustomEase, Observer …) | 3.15.0 | GSAP Standard License: seit 3.13 kostenlos, auch kommerziell und mit allen Bonus-Plugins | Alle Animationen |
| `vendor/lenis.min.js` + `vendor/lenis.css` | 1.3.27 | MIT | Smooth-Scroll |
| `vendor/three.r134.min.js` | r134 | MIT | 3D-Basis für Vanta (Vanta ist mit r134 getestet) |
| `vendor/p5.min.js` | – | LGPL | Nur für die Vanta-Effekte TRUNK und TOPOLOGY |
| `vendor/vanta/vanta.*.min.js` | 0.5.x | MIT | 3D-/WebGL-Hintergründe: fog, waves, clouds, clouds2, birds, net, cells, trunk, topology, dots, rings, halo, globe, ripple |

Die Demo mit allen Vanta-Effekten zum Durchklicken liegt in `index.html`.

## Standard-Setup (Lenis + GSAP ScrollTrigger)
```html
<link rel="stylesheet" href="vendor/lenis.css">
<script src="vendor/gsap/gsap.min.js"></script>
<script src="vendor/gsap/ScrollTrigger.min.js"></script>
<script src="vendor/gsap/SplitText.min.js"></script>
<script src="vendor/lenis.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger, SplitText);
const lenis = new Lenis({ lerp: .085, anchors: true });   // respectReducedMotion ist Standard
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
</script>
```
`anchors: true` macht Ankerlinks smooth. Bei Modals oder scrollbaren Boxen `data-lenis-prevent` setzen.

## SplitText (Zeilen-Reveal)
```js
SplitText.create('.split', { type: 'lines', mask: 'lines', autoSplit: true,
  onSplit: s => gsap.from(s.lines, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: .09 }) });
```

## Vanta-Hintergrund
```html
<div id="bg"></div>
<script src="vendor/three.r134.min.js"></script>
<script src="vendor/vanta/vanta.fog.min.js"></script>
<script>
const fx = VANTA.FOG({ el: '#bg', THREE, highlightColor: 0xc9a46a, midtoneColor: 0x6b4f3a,
  lowlightColor: 0x1a1512, baseColor: 0x0e0d0c, blurFactor: .7, speed: 1.1, zoom: .8 });
// beim Seitenwechsel: fx.destroy()
</script>
```

**Regeln für Vanta:**
- Nur als ruhiger Hintergrund in den Markenfarben einsetzen, nie über echte Fotos oder Text.
- Am Handy ggf. abschalten oder `scaleMobile` setzen; bei `prefers-reduced-motion` ein Standbild zeigen.
- Pro Seite höchstens 1 Effekt, und nach dem Verlassen des Bereichs `destroy()` aufrufen (Performance).
