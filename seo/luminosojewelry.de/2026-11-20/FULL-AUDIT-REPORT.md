# SEO-Audit luminosojewelry.de – 20.11.2026 (Runde 2)

Grundlage: Claude SEO (AgriciDaniel/claude-seo, Ablauf seo + seo-audit; Skripte `parse_html.py`, `page_checks.py`). Shop-Typ: E-Commerce (Shopify).
Geprüft: Roh-HTML von Startseite, /en, 7 Produktseiten (Stichprobe quer durch die Sitemap), 3 Kollektionen, Versand, AGB, Impressum, US-Laws-Seite; robots.txt, sitemap.xml (alle DE-Teil-Sitemaps: 1.153 URLs, davon 1.082 Produkte), agents.md, llms.txt.
Nicht geprüft: Core Web Vitals (kein PageSpeed-/CrUX-Zugang), Search Console, Backlinks.

**SEO-Score: ca. 72/100** (07.11.: ca. 64, damals eingeschränkt gemessen)

| Bereich (Gewicht) | Bewertung | Kurz |
|---|---|---|
| Technik (22 %) | gut | Canonical überall selbstreferenzierend, hreflang de/en/x-default, Sitemap vollständig, robots Shopify-Standard, kein noindex-Fehler; Minus: /en mit `lang="en"`, aber deutschem Inhalt |
| Content (23 %) | mittel–gut | Startseite 1.180 Wörter, FAQ zu 333/375/585, Versand, Pflege; Produkttexte sachlich mit Maßen/Gewicht; Minus: 1.082 Produkte mit Lieferanten-Textbausteinen, dünne Pflichtseiten (APPI, PIPEDA, US Laws) indexiert |
| On-Page (20 %) | gut | Titles 42–64 Zeichen, Marke nur noch einmal; Meta-Descriptions auf Start/Produkt/Kollektion gut; Minus: Pflichtseiten mit 320-Zeichen-Auto-Description, Art.-Nr. in H1 |
| Schema (10 %) | mittel | Product + Offer (EUR, InStock) + Brand, Organization, FAQPage; fehlt: BreadcrumbList, Bewertungen (richtig so, keine vorhanden) |
| Performance (10 %) | mittel (Labor) | Startseite 204 KB HTML; erstes Bild lazy geladen (LCP-Risiko), 12 Bilder ohne width/height |
| KI-Suche / GEO (10 %) | gut | agents.md, llms.txt, agentic-Sitemap (Shopify), FAQ-Antworten gut zitierbar |
| Bilder (5 %) | mittel | 21 von 66 Bildern Startseite mit leerem Alt, Produktseiten 7–14 je Seite |

## Vergleich mit Action-Plan vom 07.11.
| # | Punkt | Stand 20.11. |
|---|---|---|
| 1 KRITISCH | „Alle Preise inkl. MwSt.“ auf der Startseite | **erledigt** – kein „inkl. MwSt.“ mehr auf Start, Kollektionen, Produkten; Produktseite: „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. zzgl. Versandkosten – in Deutschland ab 49 € versandkostenfrei.“ |
| 2 HOCH | Title/Description Startseite | **erledigt** – „Schmuck aus Gold & 925 Sterlingsilber \| LUMINOSO Jewelry“ (56 Z.), Description 157 Z. |
| 3 HOCH | Marke doppelt im Produkt-Title | **erledigt** – „… \| LUMINOSO“ |
| 4 HOCH | Kaputte Umlaut-Slugs | **offen** – noch 148 URLs (`anh-nger`, `s-wasserzuchtperle`, `armb-nder` …) |
| 5 HOCH | Canonical/hreflang/Product-Schema prüfen | **geprüft, ok** (siehe oben), neuer Fund zu /en |
| 6 MITTEL | Alt-Texte | teilweise offen |
| 7 MITTEL | Produktnamen vereinheitlichen | weitgehend erledigt (Titel jetzt „Typ – Material“) |
| 8 MITTEL | H1 Startseite mit Suchbegriff | offen (H1 „Ein Funkeln, das bleibt.“) – Title trägt den Suchbegriff, daher nur MITTEL |
| 9 MITTEL | /en prüfen | **verschärft → HOCH**: /en liefert deutschen Inhalt mit `lang="en"` |
| 10/11 NIEDRIG | Ratgeber, Search Console/Merchant Center | Ratgeber teils als FAQ auf Startseite erledigt; GSC unbekannt |

## Funde im Detail
1. **/en = deutscher Inhalt mit englischer Sprachangabe.** `https://www.luminosojewelry.de/en` hat `<html lang="en">`, aber Title, H1 und Texte auf Deutsch; alle Produkte verweisen per hreflang auf /en-Zwillinge. Folge: ~1.100 Duplikat-Seiten, falsches Sprachsignal.
2. **148 Produkt-URLs mit zerstörten Umlauten** (`/products/anh-nger-925-silber-rhodiniert-s-wasserzuchtperle-wei`). Suchbegriffe „Anhänger“, „Süßwasser“, „weiß“ fehlen in der URL.
3. **478 Produkt-URLs mit Lieferanten-Artikelnummer** (`…-art-nr-025230036`), Art.-Nr. steht auch in der H1. Für Kundinnen ohne Wert, verwässert die H1.
4. **Doppelte Kollektionen:** `ketten` und `ketten-colliers` (beide H1 „Ketten & Colliers“), ebenso `armbander`/`armbaender`, `anhanger`/`anhaenger`, `ringe`/`ringe-gold-silber`, `fussketten`/`fussketten-gold-silber`, `ohrstecker`/`ohrstecker-gold-silber`, `sets`/`schmuck-sets` – konkurrieren um dieselben Suchbegriffe.
5. **Dünne Pflichtseiten indexiert:** `/pages/appi-compliance`, `/pages/pipeda-compliance`, `/pages/us-laws-compliance`, `/pages/gdpr-compliance` (App-generiert, für einen deutschen Shop ohne Nutzen) sowie doppelt `widerruf`/`widerrufsrecht` und Ringgröße als Seite + Blogartikel.
6. **Pflichtseiten ohne eigene Meta-Description:** Versand, AGB, Impressum nehmen 320 Zeichen Fließtext (Impressum-Description beginnt mit Name und Adresse).
7. **Erstes Bild lazy geladen** (Startseite) und 12 Bilder ohne Größenangabe → LCP/CLS-Risiko.
8. **Preisformat „€205,90“** statt deutsch üblich „205,90 €“ (Shopify-Währungsformat).
9. **Black Week ab 23.11.:** Bei Rabattangaben muss nach § 11 PAngV der niedrigste Preis der letzten 30 Tage als Bezug genannt werden – vor Start prüfen.
10. **Positiv:** § 19 UStG jetzt überall korrekt (Produkt, Versand, AGB, Impressum mit § 5 DDG), Versandschwelle einheitlich 49 €, keine erfundenen Bewertungen/Sterne, Product-Schema mit EUR, agents.md/llms.txt vorhanden.

Hinweis: Die Versandkostenfrei-Grenze steht jetzt überall bei 49 € (im alten Plan 29 €) – einheitlich, daher kein Fund.
