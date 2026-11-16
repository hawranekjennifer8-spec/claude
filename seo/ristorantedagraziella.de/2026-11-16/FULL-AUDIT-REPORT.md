# SEO-Audit ristorantedagraziella.de – 16.11.2026

Grundlage: SEO-Kit (Claude SEO, Daniel Agrici, skills/seo + seo-audit), Abläufe technical, page, content, schema, geo, local selbst abgearbeitet. Geprüft: Live-HTML der Startseite (Einseiter, 745 KB), Header, robots.txt, sitemap.xml, Bilder, PDF, Netlify-Projekt `delightful-manatee-5bfb0a` (nur Lesezugriff). Keine Lighthouse-/CrUX-Messung (keine API-Schlüssel), keine Search-Console-Daten.

## SEO Health Score: ca. 57/100

| Bereich | Bewertung | Kurz |
|---|---|---|
| Technik | 55 | HTTPS + HSTS, http→https 301, www→301 ok; aber robots.txt/sitemap.xml 404, kein Canonical, netlify.app-Zwilling indexierbar |
| On-Page | 55 | Title gut („Sizilianische Küche in Bad Kreuznach“), H1 vorhanden; **keine Meta-Description**, keine OG-Tags, kein Favicon |
| Inhalt / E-E-A-T | 75 | ca. 3.600 Wörter, echte Speisekarte, Geschichte, Allergene, Impressum (§ 5 DDG), Datenschutz, Fonts lokal |
| Schema | 35 | nur `Menu` (Weihnachtsmenü); **kein `Restaurant`/`LocalBusiness`** mit Adresse, Telefon, Öffnungszeiten, `servesCuisine` |
| Performance | 45 | HTML 745 KB, davon ca. 520 KB Base64-Bilder (Lightbox-Array im JS + Logo-PNGs); Galeriebilder sonst gut (srcset, lazy, width/height) |
| Bilder | 75 | 17/19 mit Alt-Text (2 leere sind Lightbox-Platzhalter, ok) |
| GEO / KI-Suche | 45 | kein llms.txt, keine strukturierten Fakten (Schema) für KI-Antworten; Inhalte selbst gut zitierbar |
| Lokal | 50 | NAP auf der Seite, Maps-Link, Tel-Link; aber ohne Schema; Google-Unternehmensprofil nicht prüfbar |

## Funde im Detail
1. **Kein Canonical + indexierbarer Zwilling** `https://delightful-manatee-5bfb0a.netlify.app/` liefert dieselbe Seite mit 200, ohne noindex/Redirect (die Vorschau `graziella-vorschau` ist korrekt noindex).
2. **Keine Meta-Description** – Google baut das Snippet selbst (oft aus Impressum/Cookie-Text).
3. **Kein Restaurant-Schema** – für lokale Suche/Maps/KI-Antworten die wichtigste Auszeichnung.
4. **745 KB HTML**: ca. 15 Galerie-JPEGs als Base64 doppelt im Lightbox-Script, Logo als Base64-PNG (61 KB + 22 KB). Belastet LCP/TBT auf Mobil.
5. robots.txt und sitemap.xml fehlen (404) – bei einem Einseiter nicht schlimm, aber Standard.
6. Keine Open-Graph-Tags (WhatsApp/Facebook-Vorschau ohne Bild/Text), kein Favicon.
7. Impressum/Datenschutz als Abschnitte im Einseiter (#-Links) – rechtlich ok, für „Impressum“-Suche aber nicht als eigene URL erreichbar.

## Was gut ist
HTTPS, Weiterleitungen, `lang="de"`, sprechender Title, eine H1, saubere H2-Struktur, lokale Fonts, echte Fotos mit guten Alt-Texten, Allergenkennzeichnung, Weihnachtsmenü als PDF + Schema.
