# Aktionsplan: jh-digital-atelier.vercel.app – 14.11.2026

## KRITISCH
1. **Domain jenniferhawranekdigitalatelier.de mit Vercel verbinden.** Heute nicht erledigt (Vercel-Änderung wurde im unbeaufsichtigten Lauf nicht freigegeben). Schritte:
   a) Vercel → Projekt jh-digital-atelier → Settings → Domains → `jenniferhawranekdigitalatelier.de` hinzufügen (+ `www.` mit Weiterleitung auf die Hauptdomain).
   b) IONOS → Domains → DNS: A-Record `@` → `76.76.21.21`; CNAME `www` → `cname.vercel-dns.com`. **MX-Einträge NICHT ändern** (E-Mail info@… läuft über IONOS).
   c) Danach (sobald die Domain lädt): Canonical, og:url, og:image, robots.txt und sitemap.xml im Branch jh-portfolio-site auf die .de-Domain umstellen, vercel.app-Adresse per 308 auf .de weiterleiten. Das kann Claude übernehmen.

## HOCH
2. Ortsangabe klären: Wiesbaden (Startseite) vs. Großkrotzenburg (Impressum). Einheitlich formulieren, z. B. „aus Großkrotzenburg für Wiesbaden & Rhein-Main“ – nur nach Jennys Angabe.
3. JSON-LD `ProfessionalService` + `WebSite` ergänzen (nur Impressum-Daten, keine Bewertungen/Preise).
4. Projektliste (Namen, Branche, Kurztext, Link) zusätzlich als statisches HTML ausliefern bzw. `<noscript>`-Liste, damit Crawler die Arbeiten sehen.
5. Mehr Text: kurze Leistungsabschnitte (Webdesign, Shopify-Shops, Branding) mit echtem Ortsbezug.

## MITTEL
6. impressum.html und datenschutz.html aus der Sitemap nehmen (sind noindex); lastmod aktualisieren.
7. E-Mail-Kontakt (mailto) zusätzlich zum Instagram-CTA im Kontaktbereich.
8. Sicherheits-Header in vercel.json (X-Content-Type-Options, Referrer-Policy, Permissions-Policy).

## NIEDRIG
9. llms.txt mit Kurzprofil und Projektliste.
10. Lighthouse/PageSpeed messen, sobald Abruf möglich; Google Search Console für die .de-Domain einrichten.
