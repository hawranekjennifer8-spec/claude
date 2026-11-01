# SEO-Prüfung magnifio.de – 01.11.2026

**Umfang (eingeschränkt):** Die Seite war aus der Cloud-Umgebung nicht direkt erreichbar (Proxy 403), daher liefen die Python-Skripte des Plugins claude-seo nicht gegen die Seite. Geprüft wurde über einen externen Abrufdienst (gerenderter Text, kein Roh-HTML): Startseite, Produktseite „Die Zoe Jacke“, robots.txt, sitemap.xml. Meta-Descriptions, Canonicals, hreflang, strukturierte Daten und Core Web Vitals konnten **nicht** geprüft werden.

**SEO-Score (Schätzung aus den geprüften Teilen): ca. 60/100**

| Bereich | Einschätzung |
|---|---|
| Technik (robots, Sitemap, Crawlbarkeit) | gut – Shopify-Standard, Sitemap mit DE + /en/, Filter-/Sortier-Fallen gesperrt |
| Startseite (On-Page) | schwach – Title nur „MAGNIFIO“, H1 „Die Herbst-Edit“ ohne Suchbegriff |
| Produktseiten (Inhalt) | gut – eigene Texte, Größentabelle, Pflege, Versand, Widerruf, Gewährleistungshinweis |
| Preise/Währung | kritisch – Preise werden in USD ($) ausgeliefert |
| Darstellung/Vertrauen | Fehltexte sichtbar („NaN / von-Infinity“, „Stückpreis/ pro“, Abhol-Fehler) |
| Schema / GEO | nicht prüfbar; positiv: agentic-Sitemap und agents.md vorhanden |
| Lokal | nicht relevant (reiner Onlineshop) |

## Funde im Detail

1. **Preise in USD statt EUR.** Startseite und Produktseiten zeigen dem Abruf „$73.00“ usw., während Versandkosten in € genannt werden („11,99 €“). Ursache ist sehr wahrscheinlich ein USD-Markt in Shopify Markets mit Länder-/IP-Erkennung. Google crawlt überwiegend von US-IPs → Google kann USD-Preise indexieren (Snippets, Merchant Center, Produkt-Rich-Results passen nicht zum deutschen Shop).
2. **Startseiten-Title nur „MAGNIFIO“.** Kein Suchbegriff (z. B. Damenmode, Schmuck, Taschen). Wichtigstes On-Page-Signal ungenutzt.
3. **Sichtbare Fehltexte auf der Produktseite:** Galerie-Zähler „NaN / von-Infinity“, leeres Feld „Stückpreis/ pro“, „Verfügbarkeit für Abholungen konnte nicht geladen werden – Aktualisieren“ (Abholung scheint gar nicht angeboten). Wirkt unfertig, schadet Vertrauen und Conversion.
4. **Doppelte Handles mit „-1“:** z. B. /collections/pullover-1, /collections/taschen-1, /products/paillettenkleid-lela-1, mehrere Produkte mit „…-1“/„-2“. Hinweis auf Duplikate oder alte Kopien → mögliche Duplicate-Content-Risiken.
5. **Lange Lieferanten-Handles:** z. B. /products/perlenketten-herzperlen-lassig-taglich-einfache-serie-damenschmuck, /products/handtaschen-einfarbig-elegant-nylon-versammlung-party-zubehor-1 – passen nicht zum Produktnamen.
6. **Alt-Texte:** alle Bilder einer Produktseite heißen gleich („Die Zoe Jacke“), keine Farbe/Ansicht.
7. **Ausverkaufte Artikel in „New In“** (Strickpullover Zebrastreifen, Wildleder-Optik-Jacke) prominent auf der Startseite.
8. **Positiv:** § 19 UStG-Hinweis an jedem Preis, Versand-/Widerrufslinks, EU-Gewährleistungsmitteilung, Größentabelle, Pflegehinweise, robots.txt sauber.
