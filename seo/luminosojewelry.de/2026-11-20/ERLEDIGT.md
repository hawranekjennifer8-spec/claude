# Erledigt – luminosojewelry.de – 20.11.2026

Heute kein KRITISCH-Punkt offen → nichts geändert.

Bestätigt behoben seit 07.11. (nicht in diesem Lauf, sondern zwischenzeitlich):
- **Steuerhinweis § 19 UStG:** „inkl. MwSt.“ ist von der Startseite verschwunden; Produktseiten zeigen direkt unter dem Preis „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. zzgl. Versandkosten …“. **Woran man es merkt:** Strg+F „MwSt“ auf Startseite und Produktseite findet nichts mehr; Abmahnrisiko aus dem alten Fund entfällt.
- **Title Startseite / Produkte:** Marke nur noch einmal. **Woran man es merkt:** In Google (site:luminosojewelry.de) erscheinen in den nächsten 1–3 Wochen die neuen Titel; in der Search Console steigt die Klickrate für „Goldschmuck“-Suchanfragen.

---

## Nachtrag 20.11. (begleiteter Lauf mit Jenny) – HOCH-Punkte behoben

### Live (Shopify-Daten, sofort wirksam)
1. **146 von 148 kaputten Umlaut-Adressen umbenannt** (z. B. `anh-nger-333-gelbgold` → `anhaenger-333-gelbgold`, `s-wasserzuchtperle` → `suesswasserzuchtperle`, `wei` → `weiss`, `t-rkis` → `tuerkis`), jeweils mit automatischer 301-Weiterleitung.
   **Woran man es merkt:** `/products/anh-nger-333-gelbgold` leitet per 301 auf `/products/anhaenger-333-gelbgold` weiter (geprüft). In der Search Console tauchen die neuen Adressen in 1–4 Wochen auf, die alten verschwinden.
   **Ausnahme:** Die Hero-Kette (Kleeblatt) und die Lookbook-Kette (585 Tricolor) haben wieder ihre alten Adressen, weil das Live-Theme sie fest eingebaut hat. Siehe „Offen“.
2. **10 doppelte Kollektionen ausgeblendet** (schmuck-aus-gelbgold, schmuck-aus-silber, ohrstecker, ketten, schmuck-aus-edelstahl, armbander, anhanger, fussketten, ringe, schmuck-sets): `seo.hidden` gesetzt, Shopify gibt dort jetzt `noindex` aus, und sie sind raus aus der Sitemap. Dazu 301-Weiterleitungen angelegt (goldschmuck, silberschmuck, ohrringe, ketten-colliers, edelstahlschmuck, armbaender, anhaenger, fussketten-gold-silber, ringe-gold-silber, sets), die greifen, sobald die alten Kollektionen gelöscht oder aus dem Onlineshop genommen sind. Ausblenden per Connector ist gesperrt.
   **Woran man es merkt:** `/collections/ketten` hat `<meta name="robots" content="noindex,nofollow">` (geprüft). Die Sitemap hat weniger Kollektionen.
3. **8 dünne Seiten auf noindex** (APPI, PIPEDA, GDPR, US-Laws, Wunschliste ×2, Ringgröße- und Schmuckpflege-Seite mit nur einer Zeile). Das Hauptmenü verweist jetzt auf die echten Ratgeber-Artikel, und „Ringe“ im Hauptmenü zeigt auf ringe-gold-silber.
   **Woran man es merkt:** `/pages/appi-compliance` hat `noindex` (geprüft).
4. **11 eigene Meta-Beschreibungen** für Impressum, Versand, AGB, Widerrufsbelehrung, Datenschutz, Rücksendung, FAQ, Kontakt, Über uns und Vertrag widerrufen, alle aus den echten Seiteninhalten.
   **Woran man es merkt:** Im Quelltext von `/pages/versand` steht die neue Beschreibung „Versand aus Deutschland mit der Deutschen Post: 4,99 €, ab 49 € …“ (geprüft). Google zeigt sie in 1–3 Wochen.

### Gespeichert im Theme „LUMINOSO 2026 – Clean“, wartet auf Veröffentlichung
- Art.-Nr. aus der Produkt-Überschrift genommen (bleibt unter „Details“).
- Header und Footer verlinken „Schmuck-Sets“ auf `/collections/sets` (24 statt 4 Stücke, mit dem Sets-Hero).
- Produkt-Szenenbilder auf die neuen Adressen umgestellt.
- Zusätzlicher noindex-Fallback im `<head>` für ausgeblendete Seiten.
- **Veröffentlichen schlägt fehl:** Shopify meldet „changed_on_shopify“ bei `config/settings_data.json`, und das bleibt auch nach dem Abgleich so. Das muss im Shopify-Admin gelöst werden (siehe ACTION-PLAN).

### Panne und Behebung
Die erste Umbenennung hat die fest eingebaute Hero-Kette im Live-Theme gebrochen: Der Startseiten-Hero mit H1 fehlte ca. 20 Minuten. Behoben, indem die beiden betroffenen Produkte ihre alte Adresse zurückbekommen haben. Hero und H1 sind live wieder da (geprüft).

### Noch offen
- Englische Version: Das Theme hat alle Texte fest auf Deutsch eingebaut (keine Übersetzungsdateien). Für eine echte /en-Version muss das Theme auf Übersetzungs-Schlüssel umgebaut und dann veröffentlicht werden. Das hängt am Veröffentlichungsproblem. Produkte danach per Translate & Adapt (Auto-Übersetzung).
- Englische Suchbegriffe in den deutschen Kollektionstexten („Hoops“, „Huggies“, „Charms“, „Layering“).
- Alte Kollektionen löschen bzw. aus dem Onlineshop nehmen (der Connector darf das nicht), danach greifen die 301-Weiterleitungen.
- Footer: „Widerrufsrecht“ verlinkt auf „Vertrag widerrufen“, die Widerrufsbelehrung (`/pages/widerrufsrecht`) ist im Footer nicht verlinkt. Bitte rechtlich prüfen lassen bzw. ergänzen.

---

## Rechts-Check 20.11.2026 (Stand der Gesetze per Websuche geprüft)
**Grund für die Lücke:** Das Theme „LUMINOSO – Echt + Gewährleistung“ vom 19.11. wurde nie veröffentlicht. Live läuft „LUMINOSO 2026 – Clean“ ohne Gewährleistungslabel. Der Connector darf nur Themes veröffentlichen, die er selbst angelegt hat. Deshalb ist **ein Klick von Jenny im Admin nötig**: Onlineshop › Themes › „LUMINOSO – Echt + Gewährleistung“ › ⋯ › Veröffentlichen. (Die Kopie „LUMINOSO – Live 20.11. (Recht + SEO)“ ist ein gescheiterter Umweg und kann gelöscht werden.)

Im Theme „Echt + Gewährleistung“ fertig (Vorschau geprüft):
- EU-Mitteilung „Gesetzliche Gewährleistung“ (amtliche Grafik, farbig, QR) auf jeder Produktseite und im Warenkorb. Pflicht seit 27.09.2026. **Woran man es merkt:** Auf der Produktseite steht unter den Zahlungsarten der blaue Kasten „GESETZLICHE GEWÄHRLEISTUNG“.
- GPSR: „Produktsicherheit (GPSR)“ mit Hersteller Kleckow GmbH, Ersinger Straße 7-9, 75172 Pforzheim, service@kleckow.de, plus Artikelnummer. Gilt für Produkte mit Kleckow-Artikelnummer (SKU beginnt mit einer Ziffer, mindestens 9 Zeichen). Quelle: Kleckows eigene GPSR-Angabe bei eBay. **Woran man es merkt:** eigener Aufklapp-Punkt auf der Produktseite.
- Footer: „Widerrufsbelehrung“ (/pages/widerrufsrecht) im Service-Bereich und in der Rechtsleiste, dazu „Vertrag widerrufen“ als Button und Link.
- Art.-Nr. aus der H1, Sets-Link, neue Produkt-Adressen in den Szenenbildern.

Geprüft und in Ordnung: Widerrufsbutton § 356a BGB (auf jeder Seite, hervorgehoben, zweistufig mit „Widerruf bestätigen“, nur Name, Bestellnummer und E-Mail als Pflichtfelder), Belehrung mit Online-Funktion und Muster-Formular, § 19 UStG ohne „inkl. MwSt.“, Versandkosten-Hinweis am Preis, Impressum § 5 DDG, VSBG-Hinweis ohne OS-Link, Cookie-Banner, Schriften selbst gehostet, keine Fake-Bewertungen, KI-Hinweis im Impressum.

Offen:
- Produkte ohne Kleckow-Artikelnummer (z. B. Perla Reale, Edelstahl): Hersteller nennen.
- Prüfen, ob TikTok- oder Snapchat-Pixel aktiv sind. Die Datenschutzerklärung nennt TikTok nicht.
- Eingangsbestätigung des Widerrufsformulars (EmailJS) einmal mit echter Test-Bestellnummer testen.
- Gewährleistungs-Hinweis zusätzlich in die Bestellbestätigungs-Mail (empfohlen).
- Black Week: Rabatt nur auf den aktuellen Preis. Keine Artikel aufnehmen, deren Preis in den letzten 30 Tagen erhöht wurde (§ 11 PAngV).
