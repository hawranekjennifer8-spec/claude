# ACTION-PLAN ristorantedagraziella.de – 16.11.2026

## KRITISCH
- Keine Funde, die die Indexierung blockieren oder eine Abstrafung auslösen. (Seite ist erreichbar, indexierbar, HTTPS ok.)

## HOCH (innerhalb 1 Woche)
1. `<link rel="canonical" href="https://ristorantedagraziella.de/">` in den `<head>` – entschärft den indexierbaren Zwilling auf delightful-manatee-5bfb0a.netlify.app.
2. Meta-Description (ca. 150 Zeichen, nur echte Fakten), z. B.: „Sizilianische Küche im Familienbetrieb in Bad Kreuznach: hausgemachte Pasta, Pinsa, wechselnde Tafel-Gerichte. Jetzt Tisch reservieren – auch für Weihnachten.“
3. JSON-LD `Restaurant` mit Name, Adresse, Telefon (+49 671 28336), E-Mail, `servesCuisine: Sizilianisch/Italienisch`, `openingHoursSpecification` **genau** aus dem Abschnitt „Öffnungszeiten“ der Seite, `hasMenu` (Verweis auf das bestehende Menu), `acceptsReservations: true`, Geo/Maps-Link. Keine Bewertungen erfinden.
4. Lightbox auf die vorhandenen Dateien `img/gXX-….jpg` umstellen statt Base64 im Script; Logo als Datei (WebP/SVG) – spart ca. 500 KB.

## MITTEL (innerhalb 1 Monat)
5. robots.txt (mit Sitemap-Zeile) + sitemap.xml (Startseite + Weihnachtsmenü-PDF).
6. Open-Graph-/Twitter-Tags mit Wintergarten-Foto (g01-abendstimmung.jpg).
7. Favicon / apple-touch-icon aus dem Logo.
8. Google-Unternehmensprofil prüfen: gleiche NAP-Daten, Website-Link, Öffnungszeiten identisch zur Seite (braucht Jennys/Inhaber-Zugang).

## NIEDRIG
9. llms.txt mit Kurzfakten (Adresse, Küche, Reservierung).
10. Impressum/Datenschutz zusätzlich als eigene URLs (/impressum, /datenschutz) – besser auffindbar.
11. Bei Gelegenheit: Netlify-Projekt so einstellen, dass *.netlify.app auf die Domain umleitet (Redirect-Regel in `_redirects`/`netlify.toml`).
