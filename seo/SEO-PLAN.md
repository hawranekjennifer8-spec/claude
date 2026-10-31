# SEO-Plan (Claude SEO von Daniel Agrici) – täglich 10 Uhr, eine Website pro Tag

Grundlage: SEO-Kit „Orange Hat Guy · Folge 19“ (Leitfaden, 5 Schritte) + Plugin github.com/AgriciDaniel/claude-seo (MIT, v2.5.0).
Reihenfolge laut Leitfaden: erst günstig (/seo technical + /seo page Startseite), dann volle Prüfung, dann nur KRITISCH beheben, danach erneut prüfen und vergleichen.

## Reihenfolge der Websites (Status pflegen!)
| # | Website | Hosting / Zugriff | Status |
|---|---|---|---|
| 1 | https://magnifio.de | Shopify (Shopify-Connector) | offen |
| 2 | https://luminosojewelry.de | Shopify | offen |
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
