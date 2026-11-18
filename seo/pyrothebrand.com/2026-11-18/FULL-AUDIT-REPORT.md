# SEO-Audit pyrothebrand.com – 18.11.2026

Grundlage: Claude SEO (AgriciDaniel, seo-audit/seo-technical/seo-page), Live-Abruf (Startseite, Produkt Doberman Tee, Kollektion T-Shirts, Lookbook, Bestseller, Impressum, Kontakt, Über uns, News, /en), robots.txt, Sitemaps, llms.txt, Shopify-Admin (lesend, Live-Theme „PYRO — v19 Live (geprüft 17.11.)“).
Nicht gemessen: Core Web Vitals (kein PageSpeed-/CrUX-Zugang), Backlinks, Search Console.

**SEO-Score: ca. 67/100** · Geschäftstyp: E-Commerce (Streetwear, Shopify, DE + EN)

| Bereich | Gewicht | Score |
|---|---|---|
| Technik | 22 % | 78 |
| Inhalt | 23 % | 60 |
| On-Page | 20 % | 68 |
| Schema | 10 % | 55 |
| Performance (geschätzt) | 10 % | 60 |
| KI-Suche (GEO) | 10 % | 70 |
| Bilder | 5 % | 80 |

## Was gut ist
- HTTPS, http→https und www→Apex per 301, HSTS, X-Frame-Options, CSP-Grundschutz.
- robots.txt mit Sitemap; Sitemap-Index mit 30 Produkten, 11 Seiten, 16 Kollektionen, Blog, EN-Varianten.
- Eigene Titles/Descriptions auf Startseite, Produkten, T-Shirt-Kollektion, Lookbook (z. B. „PYRO Doberman Oversized Tee | PYRO THE BRAND“).
- Canonicals selbstreferenzierend, hreflang de/en/x-default vorhanden.
- § 19 UStG korrekt: „Alle Preise steuerbefreit gemäß § 19 UStG“ (Footer) und „Steuerfrei nach § 19 UStG“ am Preis.
- Impressum nach § 5 DDG, AGB, Datenschutz, Widerruf, Versand, Retouren verlinkt.
- llms.txt vorhanden (Shopify-Agent-Datei), Product-Schema mit Preis/Verfügbarkeit in EUR.
- Bilder: großteils mit Alt-Text (je Seite 4 ohne Alt), Lazy Loading aktiv.

## Funde

### KRITISCH
1. **Kundenstimmen auf jeder Produktseite ohne Hinweis zur Echtheitsprüfung** – Abschnitt „Das sagen unsere Kunden“ (templates/product.json, fest eingetragen: Nico F., Hannah N., Marko D., Marvin Marx, Laura B.). Er erscheint identisch auf allen Produkten, auch beim T-Shirt Bewertungen zu Tracksuit, Hoodie, Mütze. § 5b Abs. 3 UWG verlangt bei Kundenbewertungen die Angabe, ob und wie sichergestellt wird, dass sie von echten Käufer:innen stammen; fehlt sie → Abmahnrisiko. Herkunft der Stimmen ist nicht belegt.

### HOCH
2. **Englische Version nicht übersetzt in Meta-Daten**: /en/products/… hat deutsche Description, /en Startseite Description nur „PYRO THE BRAND STREETWEAR“. hreflang „en“ verweist so auf überwiegend deutsche Signale.
3. **Organization-Schema mit leeren/allgemeinen sameAs** (`""`, `https://facebook.com/`, `https://instagram.com/`) – Google kann die Marke nicht mit echten Profilen verknüpfen.
4. **Doppelte/dünne Seiten in der Sitemap**: /pages/contact und /pages/kontakt (gleicher Inhalt, 16 Wörter, je eigener Canonical); /collections/men („ARTIFACTS“) und /collections/men-1 („IGNITION“) mit internen Handles, ohne Description; /blogs/news leer (4 Wörter).
5. **Fehlende Meta-Descriptions** auf Kontakt, Über uns, Bestseller, News, men/men-1 und weiteren Kollektionen.

### MITTEL
6. Startseite hat zwei H1 (Logo als H1 + „After Hours“); Über-uns-Seite hat gar keine H1; Lookbook hat zwei H1.
7. Über uns nur 61 Wörter – wenig E-E-A-T (wer steckt dahinter, Herkunft, Material, Produktion).
8. HTML sehr groß (Startseite 355 KB, Produkt 482 KB, ~30 Skripte) – LCP/INP-Risiko auf Mobil, CWV nicht gemessen.
9. Product-Schema: brand als „Thing“ statt „Brand“, keine GTIN/MPN, kein hasMerchantReturnPolicy/shippingDetails.
10. Versandhinweise uneinheitlich: Startseite „Kostenloser Versand in Deutschland“, Footer „zzgl. Versandkosten“, Produkt „ggf. zzgl. Versand“ (rechtlich vertretbar, aber für Nutzer unklar).
11. Produkt-Handle pyro-medusa-oversize-tee-1 und pyro-gansters-oversize-tee (Tippfehler) – Kosmetik, Weiterleitung bei Änderung nötig.

### NIEDRIG
12. Je Seite 4 Bilder ohne Alt-Text (wiederkehrende Theme-Elemente).
13. Kein BreadcrumbList-Schema auf Produkt/Kollektion.
14. HSTS max-age nur ~91 Tage.
