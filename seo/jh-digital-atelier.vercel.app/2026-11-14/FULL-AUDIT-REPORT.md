# SEO-Audit: jh-digital-atelier.vercel.app (Portfolio J.H. Digital Atelier)
Datum: 14.11.2026 · Grundlage: Claude SEO (AgriciDaniel/claude-seo), Skripte `page_checks.py` auf den Quelldateien (Branch jh-portfolio-site, Commit 1fee595 = aktueller Produktions-Deploy) + Live-Abruf über Vercel (robots.txt, OG-Bild) + Vercel-Domain-Konfiguration.
Einschränkung: Direkter Web-Abruf aus der Cloud blockiert (Proxy 403); keine Felddaten (CrUX/GSC), kein Lighthouse. Score daher Schätzung.

## SEO-Score: ca. 58/100
| Bereich (Gewicht) | Einschätzung |
|---|---|
| Technik (22 %) | ca. 70 – HTTPS + HSTS, robots.txt ok, Canonical selbstreferenzierend, Sitemap vorhanden. Aber: eigene Domain nicht verbunden, Sitemap enthält noindex-Seiten. |
| Inhalt (23 %) | ca. 50 – nur ca. 270 Wörter auf der Startseite, keine Leistungs-/Ortsseiten, Projektliste nur per JavaScript. |
| On-Page (20 %) | ca. 75 – Title (46 Z.) und Description (115 Z.) gut, genau eine H1, saubere Überschriften-Hierarchie, lang="de". |
| Schema (10 %) | ca. 10 – kein JSON-LD (kein ProfessionalService/Person/WebSite). |
| Performance (10 %) | ca. 70 (geschätzt) – 52 KB HTML, Schriften selbst gehostet, Media mit 1-Jahres-Cache. Ungeprüft ohne Lighthouse. |
| KI-/GEO-Sichtbarkeit (10 %) | ca. 40 – Arbeiten nur clientseitig gerendert, kein Schema, kein llms.txt. |
| Bilder (5 %) | ca. 60 – alle Bilder per JS eingefügt (im HTML 0 `<img>`), OG-Bild 1200×630 vorhanden. |

## Funde
### Technik
- **Eigene Domain jenniferhawranekdigitalatelier.de zeigt NICHT auf die Website.** DNS bei IONOS (A-Record 217.160.0.161), Vercel meldet „misconfigured“, die Domain ist im Vercel-Projekt nicht eingetragen. Die Website nennt die Domain aber im Kontaktbereich → Besucher und Google landen auf IONOS statt im Portfolio; Markensuche läuft ins Leere.
- Sitemap listet impressum.html und datenschutz.html, beide sind `noindex,nofollow` → widersprüchliches Signal.
- Impressum/Datenschutz ohne Canonical und Description (bei noindex unkritisch).
- vercel.json setzt keine Sicherheits-Header außer HSTS (kein X-Content-Type-Options, Referrer-Policy).
- Sitemap: nur Startseite hat lastmod (25.10.), seither mehrere Inhalts-Updates.

### Inhalt / E-E-A-T
- Startseite ca. 270 Wörter, Präsentationsformat (Slides). Für „Webdesign Wiesbaden“ fehlen Leistungs- und Ortsinhalte.
- **Ortsangaben widersprüchlich:** Startseite „Webdesign aus Wiesbaden“, „entsteht persönlich in Wiesbaden“; Impressum-Anschrift Großkrotzenburg (63538). Für Local SEO (NAP) und Glaubwürdigkeit klären.
- Kontakt nur über Instagram-Link; E-Mail steht nur im Impressum.
- Positiv: persönliche Vorstellung (Jennifer Hawranek), klarer Ablauf, KI-Kennzeichnung nach Art. 50 KI-VO im Impressum, § 19 UStG korrekt.

### Schema
- Kein strukturiertes Datum. Empfohlen: `ProfessionalService` (Name, Gründerin, Adresse wie Impressum, sameAs Instagram) + `WebSite`.

### KI-Sichtbarkeit (GEO)
- Projektnamen (Da Graziella, ZITRA, PYRO, MAGNIFIO, LUMINOSO, ZOIA Kids, Café wunderbar …) stehen nur im JavaScript → KI-Crawler ohne JS sehen „Ausgewählte Arbeiten“ ohne Inhalt.
- Kein llms.txt.

### Bilder
- 0 `<img>` im ausgelieferten HTML; Alt-Texte nicht prüfbar ohne Rendering.
