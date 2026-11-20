# SEO-Plan (Claude SEO von Daniel Agrici) – täglich 10 Uhr, eine Website pro Tag

Grundlage: SEO-Kit „Orange Hat Guy · Folge 19“ (Leitfaden, 5 Schritte) + Plugin github.com/AgriciDaniel/claude-seo (MIT, v2.5.0).
Reihenfolge laut Leitfaden: erst günstig (/seo technical + /seo page Startseite), dann volle Prüfung, dann nur KRITISCH beheben, danach erneut prüfen und vergleichen.

## Reihenfolge der Websites (Status pflegen!)
| # | Website | Hosting / Zugriff | Status |
|---|---|---|---|
| 1 | https://magnifio.de | Shopify (Shopify-Connector) | Runde 2 geprüft 19.11. (ca. 61/100) – KRITISCH (USD-Währung, Title) weiter offen, Connector auf MAGNIFIO umstellen |
| 2 | https://luminosojewelry.de | Shopify | Runde 2 geprüft 20.11. (ca. 72/100) – kein KRITISCH mehr (MwSt. behoben); HOCH offen: /en deutsch mit lang=en, doppelte Kollektionen, 148 Umlaut-Slugs |
| 3 | https://jh-digital-atelier.vercel.app (Portfolio; Domain jenniferhawranekdigitalatelier.de) | Vercel, Repo-Branch jh-portfolio-site | geprüft 14.11. (ca. 58/100) – KRITISCH: Domain .de nicht verbunden (Vercel + IONOS-DNS), offen |
| 4 | https://ristorantedagraziella.de | Netlify | geprüft 16.11. (ca. 57/100) – nichts KRITISCH; HOCH-Punkte (Canonical, Meta-Description, Restaurant-Schema, 500 KB Base64) offen, brauchen Netlify-Deploy-Quelle |
| 5 | https://pyrothebrand.com | Shopify (Connector aktuell auf PYRO angemeldet) | geprüft 18.11. (ca. 67/100) – KRITISCH: Kundenstimmen ohne Echtheitshinweis (§ 5b UWG), offen – Live-Theme für Claude gesperrt, Jenny blendet aus |
| 6 | https://zoia-kids-store.de | Shopify | geprüft 17.11. (eingeschränkt, ca. 62/100) – KRITISCH: „inkl. MwSt.“ trotz § 19 UStG, Versand widersprüchlich, Kundenstimmen ohne Beleg; offen, Shopify-Zugriff auf ZOIA nötig |
| 7+ | Zweite Runde: jede Seite erneut prüfen und mit letztem ACTION-PLAN vergleichen | – | – |

Konzeptseiten (jh-konzept-*) sind absichtlich noindex – NICHT prüfen.

## Ablage
seo/<domain>/<datum>/FULL-AUDIT-REPORT.md, ACTION-PLAN.md, ERLEDIGT.md (was behoben wurde + woran man es merkt)

## Lauf-Protokoll
- 2026-10-31: magnifio.de NICHT geprüft – Website aus der Cloud-Umgebung nicht erreichbar (Proxy 403, Web-Abruf ohne Freigabe), Shopify-Connector muss neu verbunden werden, Plugin-Installation (pip) wurde blockiert. Status bleibt „offen“, nächster Lauf startet wieder mit magnifio.de.
- 2026-11-01: magnifio.de eingeschränkt geprüft (externer Abruf: Startseite, Produktseite, robots, Sitemap). Score ca. 60/100. Kritisch: USD-Preise, Title nur „MAGNIFIO“. Nichts behoben – Shopify-Connector muss neu verbunden werden. Nächster Lauf: luminosojewelry.de; KRITISCH-Fixes magnifio nachholen, sobald Shopify verbunden.
- 2026-11-02: luminosojewelry.de NICHT geprüft – kein Zugriff auf die Seite: Proxy 403, Web-Abruf ohne Freigabe abgelehnt (Anfrage im unbeaufsichtigten Lauf unbeantwortet), Websuche fand die Domain nicht, Shopify-Connector muss neu verbunden werden. Plugin-Klonen/Installation wurde von der Sicherheitsprüfung blockiert. Kein Report angelegt, nichts behoben. Status bleibt „offen“.
- 2026-11-07: luminosojewelry.de eingeschränkt geprüft (externer Abruf: Startseite, Produktseite, robots, Sitemap; kein Roh-HTML). Score ca. 64/100. Kritisch: „Alle Preise inkl. MwSt.“ auf der Startseite widerspricht § 19 UStG. Nicht behoben – Shopify-Connector muss neu verbunden werden. Nächster Lauf: jh-digital-atelier.vercel.app (Portfolio).
- 2026-11-14: Portfolio jh-digital-atelier.vercel.app geprüft (Quellcode Branch jh-portfolio-site + Live-Abruf über Vercel). Score ca. 58/100. Kritisch: jenniferhawranekdigitalatelier.de zeigt auf IONOS statt Vercel. Nicht behoben – Domain-Eintrag in Vercel nicht freigegeben, DNS braucht IONOS-Zugang. Nächster Lauf: ristorantedagraziella.de.
- 2026-11-16: ristorantedagraziella.de geprüft (Live-HTML + Netlify-Projekt lesend). Score ca. 57/100. Kein KRITISCH. Top: kein Canonical bei indexierbarem netlify.app-Zwilling, keine Meta-Description, kein Restaurant-Schema, 745 KB HTML. Nichts geändert. Nächster Lauf: PYRO (Shopify).
- 2026-11-17: PYRO übersprungen (Shop-URL nirgends im Repo, Shopify-Connector auf LUMINOSO angemeldet). Stattdessen zoia-kids-store.de eingeschränkt geprüft (Start, Kollektion, Produkt, Impressum; robots/Sitemap 429). Score ca. 62/100. Kritisch: „inkl. MwSt.“ trotz § 19 UStG, „Kostenloser Versand“ vs. „Versand im Checkout“, fest eingebaute Kundenstimmen ohne Prüfhinweis. Nichts behoben – kein Shopify-Zugriff auf ZOIA. Hinweis: Shopify-Connector ist jetzt mit LUMINOSO verbunden → MwSt.-Fix Luminoso kann im nächsten begleiteten Lauf erledigt werden (Live-Theme braucht Jennys Ja). Nächster Lauf: zweite Runde, magnifio.de (am längsten nicht geprüft) – oder PYRO, falls URL eingetragen.
- 2026-11-18: pyrothebrand.com geprüft (Live-Abruf 10 Seiten, robots, Sitemaps, llms.txt, Shopify-Admin lesend). Score ca. 67/100. Kritisch: fest eingebaute Kundenstimmen auf allen Produktseiten ohne Echtheitshinweis (templates/product.json). Hoch: EN-Metadaten deutsch, Organization-sameAs leer, doppelte/dünne Seiten (contact/kontakt, men/men-1, leerer Blog). Nichts geändert – Live-Theme-Commit wird vom Connector abgelehnt. § 19 UStG korrekt umgesetzt. Nächster Lauf: zweite Runde, magnifio.de (am längsten nicht geprüft).
- 2026-11-19: Runde 2 – magnifio.de erneut geprüft (Plugin-Skripte + Live-Abruf Start, Produkt, robots, Sitemaps; viele 429). Score ca. 61/100 (vorher 60). Gegenüber 01.11.: Meta-Description jetzt da (zu lang), NaN/Infinity weg, § 19 UStG korrekt; weiter offen: USD-Preise je nach Standort, Title nur „MAGNIFIO“, 29 Doppel-Handles, Abhol-Fehlertext, fehlende Alt-Texte. Nichts behoben – Shopify-Connector ist mit LUMINOSO verbunden. Nächster Lauf: Runde 2, luminosojewelry.de (geprüft 07.11.) – Connector passt dort, MwSt.-Fix möglich, sofern Live-Theme freigegeben.
- 2026-11-20: Runde 2 – luminosojewelry.de erneut geprüft (Plugin-Skripte, Roh-HTML Start, /en, 7 Produkte, 3 Kollektionen, Pflichtseiten, alle Sitemaps). Score ca. 72/100 (vorher 64). KRITISCH „inkl. MwSt.“ ist behoben, Titles korrigiert, § 19 UStG überall korrekt. Neu/offen (HOCH): /en liefert deutschen Inhalt mit lang=en (~1.100 Duplikate), 7 doppelte Kollektionen, 148 kaputte Umlaut-Slugs. Nichts geändert (kein KRITISCH). Nächster Lauf: Runde 2, Portfolio jh-digital-atelier.vercel.app (geprüft 14.11.).
