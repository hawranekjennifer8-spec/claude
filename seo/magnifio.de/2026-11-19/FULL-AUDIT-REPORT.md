# SEO-Audit magnifio.de – 19.11.2026 (Runde 2, Vergleich mit 01.11.)

Methode: Claude SEO (AgriciDaniel/claude-seo) – Ablauf aus skills/seo-audit, Skript `parse_html.py`; Live-Abruf von Startseite, Produktseite (/products/aurelia-minikleid), robots.txt, Sitemap-Index + Produkt-Sitemap, llms.txt, /en. Shopify drosselt Abrufe stark (429), daher nur Stichprobe. Kein Shopify-Admin-Zugriff (Connector ist mit LUMINOSO verbunden). Keine Core-Web-Vitals-Felddaten (keine Google-API).

## SEO-Score: ca. 61/100 (01.11.: ca. 60)
| Bereich (Gewicht) | Score | Kurzbefund |
|---|---|---|
| Technik (22 %) | 62 | robots/Sitemap ok, Canonical ok, hreflang de/en/x-default ok; aber 29 Doppel-Handles „-1/-2“ in der Produkt-Sitemap, Währung je nach Standort USD |
| Inhalt (23 %) | 60 | Produktnamen teils englisch („Aurelia Dress“) auf deutscher Seite, Beschreibungen ausführlich |
| On-Page (20 %) | 55 | Startseiten-Title weiterhin nur „MAGNIFIO“; Meta-Description vorhanden, aber ca. 330 Zeichen (wird abgeschnitten); H1 „Die Herbst-Edit“ ohne Suchbegriff |
| Schema (10 %) | 70 | Organization, WebSite+SearchAction, Product mit priceCurrency EUR; Organization-sameAs enthält 3 leere Einträge |
| Performance (10 %) | 60 | Startseite ca. 380 KB HTML; keine Felddaten |
| KI-Suche (10 %) | 70 | llms.txt vorhanden, agentic-Sitemap vorhanden |
| Bilder (5 %) | 45 | Startseite 25 von 58 Bildern ohne Alt-Text, Produktseite 12 leere Alt-Texte |

## Vergleich mit Aktionsplan 01.11.
| Punkt 01.11. | Stand 19.11. |
|---|---|
| KRITISCH 1 – Währung EUR | **offen**: Startseite lieferte beim ersten Abruf `Shopify.currency active USD` und $-Preise ($56.00 …), die Produktseite kurz danach EUR. Für Besucher/Crawler außerhalb der EU (z. B. Googlebot aus den USA) erscheinen weiter USD. |
| KRITISCH 2 – Title/Meta-Description | **teilweise**: Meta-Description jetzt da (zu lang), Title weiterhin nur „MAGNIFIO“. |
| HOCH 3 – Fehltexte | „NaN/Infinity“ nicht mehr gefunden ✅; Abhol-Fehlertext „Verfügbarkeit für Abholungen konnte nicht geladen werden“ weiter im Code. |
| HOCH 4 – Doppel-Handles | **offen**: 29 URLs mit „-1/-2“ in der Sitemap. |
| HOCH 5 – /en | /en liefert 200 und hreflang korrekt; Inhalt nicht im Detail geprüft. |
| MITTEL 7 – Alt-Texte | **offen** (s. o.). |
| Rechtliches | Produktseite: „Umsatzsteuerfrei gem. § 19 UStG“ korrekt ✅, kein „inkl. MwSt.“ gefunden. |
