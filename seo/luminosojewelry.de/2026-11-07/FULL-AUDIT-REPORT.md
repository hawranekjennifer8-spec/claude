# SEO-Audit luminosojewelry.de – 07.11.2026

Grundlage: Claude SEO (AgriciDaniel/claude-seo, Ablauf seo + seo-audit), Shop-Typ: E-Commerce (Shopify).
**Einschränkung:** Direkter Abruf aus der Cloud-Umgebung blockiert (Proxy 403). Geprüft über externen Abruf (gerendertes Markdown) von Startseite, Produktseite Giardino Ring, robots.txt, sitemap.xml. Kein Roh-HTML → Meta-Description, Canonical, hreflang, strukturierte Daten (Product-Schema) und Core Web Vitals konnten **nicht** gemessen werden. Shopify-Connector muss neu verbunden werden.

**SEO-Score (geschätzt, eingeschränkt): ca. 64/100**

| Bereich | Bewertung | Kurz |
|---|---|---|
| Technik (Crawlbarkeit) | gut | robots.txt Shopify-Standard, Sitemap mit Produkten/Seiten/Kollektionen/Blog, DE + /en/ |
| Technik (nicht messbar) | ? | Canonical, hreflang, CWV, Schema – ohne HTML nicht prüfbar |
| On-Page Startseite | mittel | Title mit doppelter Marke und Floskel, H1 ohne Suchbegriff |
| On-Page Produkt | mittel | gute Details (Material, Gewicht, Größen, Artikelnr.), Title mit Marke dreifach |
| Content | gut | eigener Gold-Guide (333/375/585/925), Pflege- und Größenhinweise |
| Recht / Vertrauen | **kritisch** | widersprüchlicher Steuerhinweis (§ 19 UStG vs. „inkl. MwSt.“) |
| URLs | schwach | Umlaute in Slugs zerstört (z. B. `ohrh-nger`, `s-wasserzuchtperle`, `anh-nger`) |
| Bilder | mittel | Hersteller-Rohnamen als Alt-Text, Kampagnenbild ohne Alt-Text |
| GEO / KI-Suche | mittel | Gold-Guide gut zitierbar; Shopify liefert agents.md/UCP automatisch |

## Funde im Detail
1. **Steuerhinweis widersprüchlich (Startseite):** oben „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet“, unter der Gold-Edition aber „Alle Preise inkl. MwSt., zzgl. Versandkosten“. Als Kleinunternehmerin darf keine MwSt. ausgewiesen/behauptet werden – irreführende Preisangabe (PAngV/UWG), abmahnfähig. Produktseite ist korrekt.
2. **Title Startseite:** „Luminoso Jewelry - Wunderschöner zeitloser Schmuck! | LUMINOSO JEWELRY“ – Marke doppelt, kein Suchbegriff (Goldschmuck, 585 Gold, Ohrringe …).
3. **Title Produktseite:** „Giardino Ring 585 Gelbgold mit Smaragd | LUMINOSO | LUMINOSO JEWELRY“ – Marke doppelt (Theme-Suffix + Produkt-Vendor).
4. **H1 Startseite:** „Für Momente, die bleiben.“ – emotional gut, aber ohne Suchbegriff; kein Fließtext-H1-Ersatz mit „Goldschmuck“.
5. **Kaputte URL-Slugs:** Umlaute wurden beim Import zu Bindestrichen (`/products/ohrh-nger-333-gelbgold-glanz-s-wasserzuchtperle`, `/products/anh-nger-333-gelbgold-glanz-swzp-und-zirkonia`, `/products/anh-nger-mit-kette-375-gelbgold-zirkonia`). Schlechte Lesbarkeit, Suchbegriff „Süßwasserperle“ fehlt.
6. **Alt-Texte:** Produktbilder nutzen Lieferanten-Rohnamen („Ohrhänger 333/- Gelbgold glanz Süßwasserzuchtperle“, „SWZP“), Kampagnen-Freisteller ohne Alt-Text.
7. **Produktnamen uneinheitlich:** Karten zeigen „Perla Reale Ohrhänger“, Bild-Alt den Rohnamen – Shopify-Produkttitel teils noch Lieferantentitel.
8. **Englische Version /en/** in der Sitemap – Übersetzungsqualität nicht geprüft; falls nur maschinell oder leer: Duplicate-/Thin-Content-Risiko.
9. **Positiv:** Gratis-Versand-Schwelle, Widerruf, Versandinfo sichtbar verlinkt; „Zahlungspflichtig bestellen“-Button korrekt; Produktdetails vollständig; kein Fake-Social-Proof gefunden.
