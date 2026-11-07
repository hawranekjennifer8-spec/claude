# SEO-Plan (Claude SEO von Daniel Agrici) – täglich 10 Uhr, eine Website pro Tag

Grundlage: SEO-Kit „Orange Hat Guy · Folge 19“ (Leitfaden, 5 Schritte) + Plugin github.com/AgriciDaniel/claude-seo (MIT, v2.5.0).
Reihenfolge laut Leitfaden: erst günstig (/seo technical + /seo page Startseite), dann volle Prüfung, dann nur KRITISCH beheben, danach erneut prüfen und vergleichen.

## Reihenfolge der Websites (Status pflegen!)
| # | Website | Hosting / Zugriff | Status |
|---|---|---|---|
| 1 | https://magnifio.de | Shopify (Shopify-Connector) | geprüft 01.11. (eingeschränkt) – KRITISCH-Fixes offen, Shopify neu verbinden |
| 2 | https://luminosojewelry.de | Shopify | geprüft 07.11. (eingeschränkt, ca. 64/100) – KRITISCH-Fix (MwSt.-Hinweis) offen, Shopify neu verbinden |
| 3 | https://jh-digital-atelier.vercel.app (Portfolio; Domain jenniferhawranekdigitalatelier.de) | Vercel, Repo-Branch jh-portfolio-site | offen |
| 4 | https://ristorantedagraziella.de | Netlify | offen |
| 5 | PYRO (Shop-URL im Shopify-Connector nachsehen) | Shopify | offen |
| 6 | https://zoia-kids-store.de | Shopify | offen |
| 7+ | Zweite Runde: jede Seite erneut prüfen und mit letztem ACTION-PLAN vergleichen | – | – |

Konzeptseiten (jh-konzept-*) sind absichtlich noindex – NICHT prüfen.

## Ablage
seo/<domain>/<datum>/FULL-AUDIT-REPORT.md, ACTION-PLAN.md, ERLEDIGT.md (was behoben wurde + woran man es merkt)

## Lauf-Protokoll
- 2026-10-31: magnifio.de NICHT geprüft – Website aus der Cloud-Umgebung nicht erreichbar (Proxy 403, Web-Abruf ohne Freigabe), Shopify-Connector muss neu verbunden werden, Plugin-Installation (pip) wurde blockiert. Status bleibt „offen“, nächster Lauf startet wieder mit magnifio.de.
- 2026-11-01: magnifio.de eingeschränkt geprüft (externer Abruf: Startseite, Produktseite, robots, Sitemap). Score ca. 60/100. Kritisch: USD-Preise, Title nur „MAGNIFIO“. Nichts behoben – Shopify-Connector muss neu verbunden werden. Nächster Lauf: luminosojewelry.de; KRITISCH-Fixes magnifio nachholen, sobald Shopify verbunden.
- 2026-11-02: luminosojewelry.de NICHT geprüft – kein Zugriff auf die Seite: Proxy 403, Web-Abruf ohne Freigabe abgelehnt (Anfrage im unbeaufsichtigten Lauf unbeantwortet), Websuche fand die Domain nicht, Shopify-Connector muss neu verbunden werden. Plugin-Klonen/Installation wurde von der Sicherheitsprüfung blockiert. Kein Report angelegt, nichts behoben. Status bleibt „offen“.
- 2026-11-07: luminosojewelry.de eingeschränkt geprüft (externer Abruf: Startseite, Produktseite, robots, Sitemap; kein Roh-HTML). Score ca. 64/100. Kritisch: „Alle Preise inkl. MwSt.“ auf der Startseite widerspricht § 19 UStG. Nicht behoben – Shopify-Connector muss neu verbunden werden. Nächster Lauf: jh-digital-atelier.vercel.app (Portfolio).
