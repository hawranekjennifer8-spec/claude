# LUMINOSO – Masterprompt Relaunch (18.11.2026)
Ziel: ein Schmuck-Shop auf 20.000-€-Agenturniveau. Edel, ruhig und emotional, mit Vertrauen beim Kauf von Stücken zwischen 30 und 1.100 €. Dazu Kategorien, die man sofort versteht, und echtes SEO.
Gilt zusätzlich zu: MASTER-INIT, CONTENT-REELS-PROMPT (§ 7 Produktbild-Look), Rechts-Prompt, Realismus-Standard.

## 1. Audit Ist-Zustand (live, 18.11.)
- 820 Produkte, 14 Kollektionen. Theme „LUMINOSO v4“.
- **Bilder**
  - 676 von 820 Produkten haben nur 1 Bild (Lieferanten-Freisteller).
  - Hero und Sektionen arbeiten mit KI-Models. Laut Jenny wirken die „sehr nach KI“, und das zerstört Vertrauen.
- **Startseite:** riesige Leerflächen, weil Sektionen nicht laden (graue Kästen). Die Seite ist 11.600 px hoch, davon ein großer Teil leer.
- **Namen und Texte**
  - Etwa 434 Produkte haben technische Titel („Anhänger mit Kette 925 Sterling Silber rhodiniert …“).
  - Etwa 386 haben schöne Namen („Quiete Creolen“).
  - Alle Beschreibungen beginnen mit identischen Textbausteinen. Das ist Duplicate Content.
- **Kategorien**
  - „Geschenke bis 100 €“ enthält 660 Produkte. Damit ist die Kategorie wertlos.
  - Produkttypen sind doppelt („Fußkette/Fusskette“, „Creole/Creolen“).
  - Der Hersteller ist doppelt eingetragen („LUMINOSO/Luminoso“).
- **Produktseite:** Der Button „Zahlungspflichtig bestellen“ steht beim Artikel. Dorthin gehört „In den Warenkorb“, die Button-Lösung nach § 312j BGB gilt erst am Ende des Checkouts. Die Zahlungs-Logos sind riesig, die Breadcrumb führt über „Geschenke bis 100 €“.
- **SEO**
  - Title „Luminoso Jewelry – Wunderschöner zeitloser Schmuck!“ ist schwach, die Meta-Description werblich.
  - Keine Kategorie-Texte mit Suchintention („Goldcreolen 585“, „Kette mit Anhänger Silber“).
- **Preise:** Einzelne Silberartikel liegen auffällig hoch (Ohrclip 925 für 739,90 €). Gegen die Kalkulation prüfen (Gold × 1,7, Silber × 2,5 auf den Einkaufspreis bei schmuckkauf.de).

## 2. Leitidee
**„Gemacht, um Licht zu fangen.“** LUMINOSO heißt leuchtend. Jedes Bild handelt von Licht auf Metall und Stein.
Emotion: Schmuck markiert Momente (Geburt, Ja-Wort, Abschluss, „einfach so“) und bleibt, wenn der Moment vorbei ist.
Story der Seite: Licht → Material (Gold/Silber, Feingehalt erklärt) → Stück → Moment → Geschenk.

## 3. Bildwelt (KEINE KI-Gesichter, keine Shootings)
1. **Stillleben-Sets** als leere Szenen, generiert und geprüft: Travertin, Elfenbein-Seide, Sandstein mit Wassertropfen, Leinen mit Fensterschatten, warme Steinnische, Messingschale.
   - Ton in Ton: Elfenbein, Champagner, Sand, Gold.
   - Gegenlicht mit weichen echten Schatten und Korn.
2. **Produkte:** IMMER die echten Packshots, freigestellt und mit Kontaktschatten, Lichtrichtung und Farbtemperatur passend in die Sets komponiert. Nie per KI neu zeichnen, weil sich dabei Fassung und Steine verändern würden.
3. **Haut höchstens als enger Ausschnitt** (Schlüsselbein, Ohr, Handgelenk im Gegenlicht), nur als Stimmung und ohne fremden Schmuck.
   - Pflicht: Poren, feine Härchen, natürliche Falten, 5 Finger.
   - Jedes Bild bei 100 % prüfen. Fällt es durch, fliegt es raus.
4. Makro-Gefühl: Funkeln, Schärfeebene, Lichtreflexe. Keine Bokeh-Kitschkugeln, keine Glitzer-Partikel.

## 4. Style-Brief
- **Farben:**

  | Name | Hex | Rolle |
  |---|---|---|
  | Elfenbein | #F4EFE6 | Grund |
  | Champagner | #E9DFCF | Flächen |
  | Sand | #CDBB9E | Linien und Hover |
  | Altgold | #9C7A3C | Akzent, sparsam: Preise, aktive Zustände |
  | Tinte | #1C1A17 | Text und dunkle Sektion |
  | Rauch | #6F665C | Fließtext sekundär |

- **Typo:** Cormorant Garamond (Light/Italic) für Headlines, Geist für UI und Fließtext, Geist Mono für Labels. Alles lokal gehostet, keine Google-CDN.
- **Layout:** viel Luft, editoriale Raster (große Bildfläche + kurzer Absatz), angeschnittene Bilder, nummerierte Labels „[ 01 · LICHT ]“.
- **Motion:** Lenis Smooth-Scroll, GSAP ScrollTrigger, Bild-Reveal per Maske, langsamer Parallax, Lichtkante wandert über das Hero-Bild, Hover-Wechsel zum 2. Bild bzw. Licht-Sweep über Produktkarten.
  - Keine Wackel- oder Spielerei-Effekte.
  - prefers-reduced-motion respektieren.
- **5 Always:**
  - Echte Produktfotos.
  - Material und Feingehalt sichtbar.
  - Preis klar mit Kleinunternehmer-Hinweis.
  - Vertrauen direkt am Kaufbutton.
  - Mobile zuerst.
- **5 Never:**
  - KI-Gesichter.
  - Leere Sektionen.
  - Pop-up-Spam.
  - Fake-Bewertungen oder Fake-Knappheit („nur noch 2!“).
  - Fremdmarken (Cartier, Van Cleef …).

## 5. Informationsarchitektur (neu)
- **Schmuck**
  - Ohrringe: Ohrstecker · Creolen · Ohrhänger
  - Ketten & Anhänger: Anhänger · Ketten & Colliers · Anhänger mit Kette
  - Armbänder · Fußketten · Ringe · Sets
- **Material:** Gold (333 · 375 · 585) · Silber 925 (rhodiniert · vergoldet · rosévergoldet) · Edelstahl
- **Welten:** Echtsteine & Perlen · Herz & Symbole · Kinderschmuck · Herren & Unisex
- **Geschenke:** nach Preis (bis 50 · 50–150 · 150–300 · über 300) und nach Anlass (Geburtstag, Jahrestag, Geburt/Taufe, einfach so)
- **Filter:** Material, Legierung, Stein, Farbe (Silber/Gold/Rosé), Preis, Sortierung.
- **Kategorie-Seite:** Hero-Stillleben + 2 Sätze, Unterkategorie-Chips, Raster 4 bzw. 2 Spalten, SEO-Text und FAQ unten.

## 6. Produktseite
- Galerie (Packshot + Stillleben-Szene + Detail).
- Titel mit Eigenname + Material, Preis, Hinweis „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet“ und Versandkosten-Link.
- Varianten als ruhige Chips.
- Button „In den Warenkorb“, darunter 3 Vertrauenszeilen:
  - Versand (gratis ab 29 €, laut Live-Seite)
  - 14 Tage Widerrufsrecht
  - Material-Echtheit (Punze)
- Akkordeons: Details & Maße · Material & Pflege · Herstellerangaben (GPSR) · Versand & Rückgabe.
- „Passt dazu“ (gleiche Linie/Material).
- Kleine Zahlungs-Logos.

## 7. SEO
- Title-Muster:
  - Produkt: „{Name} – {Material} | LUMINOSO“
  - Kategorie: „{Kategorie} aus {Material} kaufen | LUMINOSO“
- Meta-Descriptions einzigartig.
- H1 genau einmal pro Seite.
- Strukturierte Daten: Product, Offer, BreadcrumbList, FAQPage, Organization.
- Einzigartige Beschreibungen ohne Bausteine.
- Kategorie-Texte zu Suchbegriffen (Goldcreolen, Kette mit Anhänger Silber, Ohrstecker Gold 585, Kinderschmuck Silber, Geschenk Freundin Schmuck).
- Alt-Texte mit Material, sprechende Handles.
- Interne Links Material ↔ Typ, Ratgeber „333, 375 oder 585?“.
- Produktnamen-Bereinigung: technische Titel bekommen Eigennamen. Nur nach Prüfung: keine geschützten Namen, Prüfung gegen DPMA/EUIPO bei Serien-Namen.

## 8. Recht (Shop, Stand 18.11.2026)
- Impressum § 5 DDG, Datenschutz, AGB, Widerrufsbelehrung + Muster-Formular, Widerrufsbutton „Vertrag widerrufen“ (§ 356a BGB) auf allen Seiten.
- § 19 UStG-Hinweis, PAngV (Gesamtpreis, Versand), keine Streichpreise ohne 30-Tage-Tiefstpreis.
- GPSR-Herstellerangaben, korrekte Feingehalte (Zirkonia ≠ Diamant, „Blautopas (behandelt)“, „Opal (synthetisch)“ beibehalten).
- Consent vor Tracking, Fonts lokal, BFSG-Basics (Kontrast, Tastatur, Alt-Texte).
- Keine Fremdmarken, keine erfundenen Bewertungen.

## 9. Umsetzung
1. Klickbarer Prototyp (Startseite, Kategorie, Produkt) mit echten Produkten, Preisen und Bildern aus dem Live-Shop → Vercel-Vorschau → Jennys Freigabe.
2. Danach als neues Shopify-Theme (unveröffentlicht, Vorschau) + Datenbereinigung (Typen, Hersteller, Kollektionen, Titel, SEO-Felder) über die Admin-API. Erst nach Freigabe live.
