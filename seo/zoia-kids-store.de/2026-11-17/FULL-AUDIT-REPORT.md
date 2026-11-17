# SEO-Audit zoia-kids-store.de – 17.11.2026

Ablauf nach Claude SEO (seo-audit: seo-technical, seo-page, content, schema, geo, local/ecommerce), inline nacheinander.
Grundlage: Live-Abruf Startseite, /collections/all, /pages/impressum, eine Produktseite (Milchzahndose Tiermotive), /products.json.
**Eingeschränkt:** Shopify antwortet der Cloud-Umgebung oft mit 429 – robots.txt, sitemap.xml und /policies/* waren nicht abrufbar. Kein Shopify-Admin-Zugriff (Connector ist auf LUMINOSO angemeldet). Keine Search-Console-/CrUX-Daten.

**Geschäftstyp:** E-Commerce (Shopify, Baby-/Kindergeschenke, 42 Produkte), Kleinunternehmerin nach § 19 UStG (laut Impressum).

## SEO Health Score: ca. 62/100
| Bereich | Bewertung |
|---|---|
| Technik (Indexierbarkeit, Canonical, HTTPS) | gut – self-canonicals überall, lang="de", HTTPS |
| On-Page Startseite | mittel – Title „ZOIA Kids Store – Zoia Kids Store“ (doppelt, ohne Suchbegriff), H1 ohne Suchbegriff |
| On-Page Produkt | gut – eigener SEO-Title und Meta-Description, sprechende URL |
| Schema | mittel – Product + Offer (EUR, InStock) vorhanden; keine Organization/WebSite auf der Startseite, keine GTIN |
| Content / E-E-A-T | mittel – ~700 Wörter Startseite, Markengeschichte vorhanden; Kundenstimmen ohne Quelle |
| Bilder | mittel – Startseite alle Alt-Texte da, aber Kollektion 20/42 und Produktseite 16/26 ohne Alt |
| Recht/Vertrauen (wirkt auf Conversion + Abmahnrisiko) | schwach – siehe KRITISCH |
| GEO / KI-Suche | nicht messbar (robots.txt/llms.txt nicht abrufbar) |

## Funde im Detail
### Technik
- Canonical korrekt (Start, Kollektion, Produkt, Impressum). og:image mit **http://** statt https.
- Header: x-frame-options gesetzt; kein HSTS-Header gesehen (Shopify-Standard, niedrig).
- 41–43 Skripte pro Seite, 3 Google-Fonts-Familien per Preload (Nunito, Playfair Display, Quicksand) – Ladezeit und DSGVO (Google Fonts extern geladen → IP-Übertragung an Google).
- Produkt-Handle mit „-1“-Suffix (`personalisierte-milchzahndose-aus-holz-mit-tiermotiven-1`) → Duplikat-Rest.

### Startseite (seo-page)
- Title: „ZOIA Kids Store – Zoia Kids Store“ – Markenname doppelt, kein Suchbegriff (z. B. personalisierte Babygeschenke).
- Meta-Description gut, aber abgeschnitten (>160 Zeichen).
- H1 „Geschenke, die das Herz berühren“ – emotional, ohne Suchbegriff.
- Abschnitt „Echte Stimmen – Das sagen unsere Kunden“: 3 Fünf-Sterne-Zitate (Sarah M., Laura K., Maja R.) fest im Theme, ohne Bewertungs-App, ohne Datum, ohne Hinweis, ob/wie geprüft wird.
- Aussage „alles sicher geprüft“ ohne Beleg (Prüfnorm/CE).

### Produktseite
- „inkl. MwSt.“ unter dem Preis, obwohl laut Impressum § 19 UStG gilt (keine Umsatzsteuer).
- „Versand wird beim Checkout berechnet“ unter dem Preis, Ankündigungsleiste sagt „Kostenloser Versand“ – widersprüchlich.
- Keine Lieferzeit sichtbar (bei personalisierten Artikeln besonders wichtig).
- Keine GPSR-Angaben (Hersteller/Verantwortlicher, Warn-/Altershinweise) für Baby-Spielzeug sichtbar.
- Product-Schema ohne GTIN/MPN und ohne shippingDetails/hasMerchantReturnPolicy.

### Impressum
- Zwei H1 „Impressum“; Überschrift „§ 18 Abs. 2 MSt“ (richtig: MStV).
- Kleinunternehmer-Hinweis vorhanden und korrekt formuliert.

### Local / E-Commerce
- Reiner Onlineshop, kein lokales SEO nötig. Merchant-Center/kostenlose Google-Shopping-Einträge nicht prüfbar.
