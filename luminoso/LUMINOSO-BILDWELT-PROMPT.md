# LUMINOSO – Bildwelt-Prompt v2 (18.11.2026)

Gilt für jedes Szenen-, Kategorie- und Stimmungsbild von luminosojewelry.de.
Zusätzlich gelten: MASTER-INIT, LUMINOSO-MASTERPROMPT (Farben, Typo), CONTENT-REELS-PROMPT § 7 (Produktbild-Look), Realismus-Standard (model-fotografie-prompts), Taste-Erweiterung (Exklusiv-Luxus-Stil, Luis Ganssloser/karellabs Grading).

## 0. Fehler-Logbuch v1 – darf nie wieder passieren
Jennys Urteil: „Alle Produktbilder wirken künstlich … wozu ein leeres Brett?“

| Fehler v1 | Ursache | Regel v2 |
|---|---|---|
| Schmuck wirkt aufgeklebt | Freisteller per PIL auf KI-Hintergrund gesetzt; Licht, Reflexe und Farbtemperatur kamen aus dem Studio-Packshot, nicht aus der Szene | Produkt wird **in der Szene fotografiert/gerendert** – mit dem echten Packshot als Identitäts-Referenz, nie nachträglich montiert |
| Schmuck winzig im großen leeren Raum | Weitwinkel-Set, Stück nimmt 3–5 % der Fläche ein | Makro-Nähe: Stück füllt 20–40 % des Bildes, Kamera auf Höhe des Schmucks, 100-mm-Makro-Anmutung |
| Schmuck schwebt | Kontaktschatten gezeichnet, Ring berührt die Fläche nicht | Physikalischer Kontakt: Ring liegt/lehnt, Kette fällt mit Gewicht, Kontaktschatten + Spiegelung der Unterlage im Metall |
| Gold zitronig, flach | Packshot-Weißabgleich | Gold spiegelt die Szene (warmes Fensterlicht, Travertin, Seide), echte Glanzkanten, Steine mit Funkeln/Dispersion |
| Leeres Requisit (Messingschale, Brett, Seide ohne Stück) | „Set“ als Hintergrund benutzt | **Kein Bild ohne echtes Produkt.** Jedes Requisit hat einen Grund (es trägt, hält, umrahmt das Stück) |
| Gleiche Sets mehrfach | Wenige Hintergründe für viele Kategorien | Jede Kategorie bekommt ihr eigenes Bild mit einem passenden echten Stück |

## 1. Leitidee
„Gemacht, um Licht zu fangen.“ – jedes Bild zeigt, wie Licht auf echtem Gold, Silber, Perle und Stein liegt.

## 2. Visual System
- **Palette (hell, Ton in Ton – Jenny: „Farben gut, schön hell“):** Elfenbein #F4EFE6, Champagner #E9DFCF, Sand #CDBB9E, Altgold #9C7A3C; dunkle Sektion: Tinte #1C1A17 mit warmem Honiglicht.
- **Licht:** EINE motivierte Quelle – tiefe Nachmittagssonne durch ein Fenster (harte, warme Schattenkante + weicher Abfall), oder für die dunkle Gold-Sektion ein einzelner warmer Spot. Gegenlicht lässt Perlen/Steine leuchten.
- **Untergründe:** gepflegt, hochwertig, sauber: Travertin (feine Poren, geschliffen), Elfenbein-Seide/Satin, ungebleichtes Leinen, heller Sandstein, polierter Messing nur als Träger. Nie rissig, staubig, fleckig.
- **Requisiten:** max. 1–2 pro Bild, mit Funktion (Trockengräser-Halm als Schattenwerfer, Wassertropfen für Funkeln, Schmuckschatulle beim Geschenk). Keine Blüten-Deko-Orgien, keine Glitzer-Partikel, keine Bokeh-Kugeln.
- **Medium/Grade:** Mittelformat-Look, 100-mm-Makro, f/4–f/5.6, Schärfeebene exakt auf dem Stück, natürlicher Abfall; feines Filmkorn, cremige Lichter, angehobene matte Schatten, keine Übersättigung.

## 3. Produkttreue (Pflicht)
- Referenz = Original-Packshot aus dem Shop (CDN, 1200–2000 px).
- Prompt sagt explizit: exakt dieses Stück, gleiche Fassung, gleiche Anzahl/Form/Farbe der Steine, gleiche Kettenart, gleiche Proportionen; keine zusätzlichen Steine, keine Gravuren, kein Text.
- Prüfung nach jeder Generierung gegen den Packshot: Steinzahl, Steinform/-farbe, Fassung (Krappen/Zarge), Schienenbreite, Kettenglieder, Metallfarbe (Gelbgold/Bicolor/Silber). Abweichung → verwerfen, nicht ausliefern.
- Bild zeigt das Stück, das verlinkt wird (Alt-Text = echter Produktname).

## 4. Shot-Liste
| # | Platz | Stück (echt) | Szene | Format |
|---|---|---|---|---|
| 1 | Hero Desktop | Giardino Ring 585 Smaragd | Ring steht leicht schräg auf geschliffenem Travertin, Fensterschatten-Kante läuft hinter ihm, Smaragd leuchtet im Gegenlicht | 16:9, 4K |
| 2 | Hero Handy | Giardino Ring | gleiche Szene, Hochformat, Ring im oberen Drittel frei für Text unten | 4:5 |
| 3 | Gold-Sektion | Rebecca Ring 375 Zirkonia | warmer Spot in Steinnische, Ring auf Honig-Travertin, Zirkonia funkeln | 4:5 |
| 4 | Jahrestag | Rosso Collier Rubin | Kette fällt natürlich über Leinen-Falte im Fensterlicht, Rubin im Licht | 4:5 |
| 5 | Zur Geburt | Perla Ohrhänger | Perlen auf Elfenbein-Seide, weiches Gegenlicht, Perlglanz | 4:5 |
| 6 | Geburtstag | Stella Kette | Kette auf hellem Sandstein mit wenigen echten Wassertropfen | 4:5 |
| 7 | Einfach so | Ornella Creolen bicolor | Creolen in/an polierter Messingschale, Sonnenkante | 4:5 |
| 8 | Geschenke-Abschluss | Perla Ohrhänger o. Ä. in offener Elfenbein-Schatulle | Schatulle + Seidenband auf Travertin, Platz für Headline | 16:9 |
| 9–14 | Kategorie-Heros | je ein echtes Stück (Armband, Fußkette, Silber, Set, Kinder, Herren) | eigenes Set je Kategorie | 4:5 |

## 5. Prompt-Vorlage (Nano Banana Pro, Referenz = Packshot)
Shot/Framing → Stück (exakt aus Referenz) → Lage/Kontakt → Untergrund/Set → Licht → Palette/Medium → Verbote.

> Macro still-life photograph for a fine jewelry house. The exact piece from the reference image – identical setting, identical stones (count, cut, colour), identical band/chain and metal colour, nothing added or removed – [Lage, z. B. resting at a slight angle on …]. It touches the surface with a soft contact shadow and the polished metal reflects the warm surroundings. [Untergrund]. Late-afternoon sun through a window from the left creates one crisp warm shadow edge and gentle falloff; the stones catch the light with natural sparkle. Palette ivory, champagne, sand and soft gold, tone on tone. Medium-format camera, 100 mm macro, f/5, focus exactly on the piece, natural depth of field, fine film grain, creamy highlights, slightly lifted matte shadows. Photorealistic, no CGI look, no floating, no added jewellery, no text, no logos, no watermark.

## 6. Abnahme (jedes Bild bei 100 %)
1. Produkttreue (§ 3) bestanden.
2. Kontakt/Schatten physikalisch, nichts schwebt, Größe plausibel.
3. Licht aus EINER Richtung, Reflexe passen.
4. Untergrund sauber und hochwertig, keine KI-Artefakte (verschmolzene Glieder, doppelte Krappen, Wurmketten).
5. Farbwelt hell Ton in Ton, Serie wirkt wie EIN Shooting.
6. Bildausschnitt: Stück im Fokus und mittig/bewusst platziert, Text-Freiraum passt zum Layout (Desktop + Handy geprüft).
Fällt ein Punkt durch: neu generieren oder verwerfen.

## 7. Recht
KI-Hinweis nur im Impressum („Einzelne Stimmungsbilder wurden mit KI-Unterstützung erstellt; Produktfotos zeigen die echten Artikel.“). Keine fremden Marken/Logos auf Schatullen oder Requisiten.
