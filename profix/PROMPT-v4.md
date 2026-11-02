# Profix Gebäudereinigung · Prompt v4 „Glasklar“ (01.11.2026)

Jennys Feedback: v3 (3D-Architekturmodell) „nicht high end“. Entscheidung: **hell & cinematic**, fotorealistische Detail- und Makroaufnahmen erlaubt (nur Material, Räume, Hände mit Handschuhen – keine Gesichter, kein erfundenes Team). KI-Hinweis nur im Impressum.

## 1. Referenzen zerlegt (CD-Schritt 1)
- **CLEANY** (sally.intoai): Hero-Moment „Schaum → Wisch → Ergebnis“, helles Weiß/Hellblau, klare CTA-Farbe. → KEEP: Wisch als Kernmoment. CHANGE: kein Template-Look, keine Leistungs-Kacheln.
- **Apple-Design / VELHARMON**: eine Botschaft pro Screen, riesige ruhige Typo, nummerierte Mini-Labels, Fortschrittslinie, butterweiches Scrollen. → KEEP.
- **@zachex Editorial**: Bilder sprechen lassen, angeschnittene Bilder, Split-Screen, Riesen-Wortmarke. → KEEP.
- **design4me**: Smooth Image Trail / Hover-Reveal für die Leistungsliste. → KEEP.
- SKIP: 3D-Diorama, Icon-Karten, Glas-Navigation, Verläufe.

## 2. Style-Brief
**Feel:** Wie frisch geputztes Glas am Morgen – kühl, hell, still, präzise. Ein Architekturmagazin, kein Handwerker-Baukasten.
**Type:** Instrument Serif (Kursiv-Akzente, Headlines bis 15 vw) + Plus Jakarta Sans (Text, Labels 11 px, Sperrung 0,18 em). Beide lokal.
**Color:** Weiß #FFFFFF, Nebel #F2F6F9, Glas #E4EEF5, Tinte #0B1A26, Profix-Blau #2E9BEA (Akzent, Linien), Profix-Grün #23C552 (nur Aktionen).
**Layout:** 12er-Raster, Rand clamp(20 px, 4 vw, 64 px), Haarlinien statt Boxen, Vollbild-Fotos mit 2-px-Rundung, viel Weißraum.
**Motion & Pacing:** Lenis (lerp 0,08), GSAP expo.out 1,2–1,6 s, Wörter gleiten aus Masken (Stagger 0,06), Bilder mit leichtem Zoom-out 1,08→1,0. Signatur: **Beschlag-Wisch** – eine beschlagene Scheibe (Canvas: Unschärfe + Kondens-Tropfen) wird von einer Abzieherkante streifenfrei freigezogen, im Hero automatisch, später gekoppelt an den Scroll.

**5 Always:** echte Profix-Daten · ein Gedanke pro Screen · Grün nur für Aktionen · Motiv mittig im Bildausschnitt · Desktop und Handy geprüft.
**5 Never:** Stockfotos/Archivbilder · Gesichter oder erfundenes Personal · Icon-Kacheln · Text über unruhigen Bildstellen · hängende Animationen.

## 3. Bildwelt (fotorealistisch, Canva-Generator)
Hero-Glaswand im Büro am Morgen · Makro Abzieher-Gummilippe mit Wasserfilm · Handschuh-Hand mit Mikrofasertuch auf weißem Schreibtisch · Treppenhaus mit Edelstahlgeländer · Industriehalle mit Scheuersaugmaschine · geräumter Weg im Schnee zur blauen Stunde · Polster-Reinigung Makro · Wassertropfen auf Glas (Textur). Dazu das echte Glasdach-Einsatzfoto von Profix.

## 4. Seitenablauf
1. **Intro + Hero:** Vollbild-Glaswand, darüber Beschlag. Die Abzieherkante zieht diagonal durch → „Alles *glasklar.*“ – Satz, „Kostenlose Beratung“, Telefon, 5,0 ★ (26, Google).
2. **Statement (gepinnt):** „Ein Strich. *Kein Streifen.*“ – Makro Abzieher; beim Scrollen wischt die Kante die beschlagene Makroaufnahme frei.
3. **Zahlen:** Meisterbetrieb · 12 Leistungen · 24-h-Winterdienst · 5,0 bei Google.
4. **Fünf Orte (horizontale Strecke):** Büro, Treppenhaus, Glas, Halle, Winter – je ein großes Foto, Leistung, 3 echte Aufgaben.
5. **Leistungen:** 12 Einträge als editoriale Liste, Hover/Tap: Foto folgt dem Cursor, Details klappen auf.
6. **Aus dem Einsatz:** echtes Glasdach-Foto groß, Split-Screen mit Text.
7. **Reinigungsplan:** Objekt, Rhythmus, Leistungen → Leistungsverzeichnis live, mailto.
8. **Haltung:** „Geht nicht, gibt’s bei uns nicht.“ Riesen-Zitat, Qualität · Flexibilität · Zuverlässigkeit, Inhaber Suat Kaya & Baris Aktan.
9. **Ablauf (3 Schritte) · FAQ · Kontakt (Formular → mailto) · Footer mit Riesen-Wortmarke PROFIX.**

## 5. Technik & Recht
Vanilla HTML/CSS/JS, GSAP 3 + ScrollTrigger + Lenis lokal, Fonts lokal, keine Cookies/Embeds, noindex (Konzept). Impressum/Datenschutz mit Profix-Daten, KI-Hinweis nur im Impressum. QA: 1440/768/390 + iPhone, Launch-Check.
