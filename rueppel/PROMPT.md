# Creative-Director-Prompt: Gebäudereinigung Rüppel (v2, „edel, nicht KI“)

## Auftrag
Konzeptseite für die **Gebäudereinigung Rüppel Service GmbH**, Wiesbaden-Delkenheim. Ziel ist ein Niveau wie bei einem Architekturbüro oder einer Galerie, nicht wie die üblichen „sauber & blau“-Templates. Jennys Kritik an Profix: wirkt nach KI, 3D billig. Deshalb gilt hier:
- nur **echte Fotos** des Betriebs (von gebaeudereinigung-rueppel.de),
- ruhige Typografie mit viel Weißraum,
- wenige, aber präzise Bewegungen.

## Faktenbasis (nur von der Website des Betriebs)
- Gegründet 1984, Familienunternehmen in 3. Generation, „Seit über 40 Jahren“, „100 % Vertrauenssache“.
- 1977 Meisterprüfung Ludwig Rüppel; 1990 Nordenstadt; 2005 Übernahme durch Udo Ernst; 2014 Graffiti-Guard; 2017 Umzug Delkenheim und Silberner Meisterbrief; 2019 Winterdienst; 2020 Kölner Dom (Reinigung in bis zu 100 Meter Höhe) und „Die Steinreiniger Rhein-Main“; 2022 TÜV-zertifizierte Solaranlagen-Reinigung; 2024 „Die nächste Generation ist schon fleißig am Üben“.
- Referenzen:
  - Kurhaus Wiesbaden (Sonderreinigung)
  - Kölner Dom (Graffitientfernung & -schutz)
  - Theodor-Heuss-Brücke (Bauwerksreinigung)
  - Marriott Wiesbaden (Außenanlagen)
  - Busbahnhof Aschaffenburg
  - Stadt Hofheim (Bahnhofsunterführungen)
  - Dom zu Worms (Taubenkot)
  - Rheingau (Fassadenreinigung am Rhein)
  - Raumschießanlage Taunusstein
  - Kunden laut Liste: Sto AG, Flint Group, Dyckerhoff, Baresel, Landeshauptstadt Wiesbaden, Gemeinde Villmar u. a.
- Leistungen A–Z: 44 Einträge, wörtlich von der Website. Sonderleistungen: Bodensanierung PU-Siegel, Graffiti, Taubenkot, Schießstand, Solar, Steinreinigung.
- Kontakt:
  - Berta-Cramer-Ring 26, 65205 Wiesbaden
  - Tel. 06122 70 46 30, info@rueppelservice.de
  - Erreichbar Mo–Fr 9–15 Uhr
- Impressum laut Website: Gebäudereinigung Rüppel Service GmbH, Inhaber Udo Ernst, AG Wiesbaden HRA 8357, USt-IdNr. DE 241321686.
  - **Widerspruch:** Eine GmbH steht im HRB, nicht im HRA. Das melde ich Jenny.
- **Keine erfundenen Höhenangaben.** Belegt ist nur „bis zu 100 Meter“ (Kölner Dom). Der Höhenmesser zeigt deshalb nur „Boden“ und „100 m“.

## Bilder
- 34 echte Fotos, Blau-Randstreifen der Originalseite abgeschnitten, schonend vergrößert.
- Ausgeschlossen sind Stockfotos von der Website (Büro-Pärchen, Handschuh-Glas, Urlaubs-Zettel usw.) und das Foto mit Kindern.
- Jedes Motiv einmal pro Seite, Fokus mittig.

## Design-System
- Papier `#F3F1EB`, Tinte `#0E1A23`, Rüppel-Blau `#00538C` (aus dem Logo), Linie `rgba(14,26,35,.14)`.
- Schrift: **Newsreader** (Editorial-Serif, OFL) für Headlines, kursiv für Akzente; **Inter Tight** für Text und Labels. Beide lokal gehostet.
- Raster: 12 Spalten, großzügige Ränder (clamp 20–64 px), Haarlinien statt Boxen, keine Schatten und keine Rundungen über 2 px.
- Referenzen, nach denen ich mich richte:
  - 21st.dev „Editorial Image Hero“ (#19077) für das ruhige Editorial-Layout.
  - 21st.dev „Hover Image List“ (#28258) für die Leistungsliste.
  - 21st.dev „Comparison Slider with Highlights“ (#19262) für Vorher/Nachher.
  - 21st.dev „Scroll Horizontal Gallery“ (#24623) für die Referenzen.
  - 21st.dev „Giant Wordmark Footer“ (#35508) für den Footer.
  - Jennys Logistik-Reel (@mattxwebb) für Kapitel-Storytelling im Vollbild.
  - Masterprompt: CLEANY und 20-Punkte-Check.
  - taste-skill-Richtung „Editorial / Architectural“.

## Seitenablauf und Animationen (GSAP + ScrollTrigger + Lenis, lokal)
1. **Intro (1,2 s):** Logo aus der Mitte, eine blaue Haarlinie zieht quer, der Vorhang hebt sich.
2. **Hero „Iris“:**
   - Auf Papierweiß ein kreisrunder Ausschnitt mit der echten **Kurhaus-Kuppel von unten** (symmetrisch, Fokus mittig).
   - Headline in Serif: „Vom Boden bis in 100 Meter Höhe.“ Zeilen fahren aus einer Maske.
   - Beim Scrollen öffnet sich der Kreis zum Vollbild, man „blickt in die Kuppel“. Die Headline weicht nach oben aus, Bildunterschrift „Kurhaus Wiesbaden · Sonderreinigung“.
   - Handy: gleiche Logik, Kreis 78vw, Hero füllt den Bildschirm (kein Band).
3. **Haltung:** Ihr eigener Satz, groß in Serif: „Vertrauen, Zuverlässigkeit, Sicherheit und Diskretion – das ist die Basis unserer Arbeit.“ Wort für Wort von Grau zu Tinte beim Scrollen. Darunter drei Fakten mit Haarlinien: seit 1984 · dritte Generation · Meisterbetrieb.
4. **Aufstieg (Kapitel im Vollbild, gepinnt):**
   - Sechs Kapitel: Boden → Glas → Fassade → Brücke → Kuppel → Dom. Jedes Kapitel ist ein Vollbild-Foto; das nächste schiebt sich per clip-path **von unten nach oben** darüber (Aufstieg).
   - Links eine vertikale Skala „Boden … 100 m“ mit wanderndem Punkt. Rechts unten das Kapitelwort in großer Serif, eine Zeile Leistung und der Referenzname.
   - Handy: gleiche Mechanik, Text in einer Platte unten.
5. **Vorher/Nachher:** Ziehbarer Schieber (Maus, Touch, Tastatur) über drei echte Boden-Sanierungen mit PU-Siegel (Halle, Sanitär, Flur). Tabs mit Haarlinien.
6. **Leistungen:**
   - Nummerierte Liste mit Haarlinien (01–10). Beim Hover folgt ein echtes Foto dem Cursor, mit Lerp und leichter Neigung. Am Handy klappt der Eintrag auf und zeigt das Foto.
   - Darunter „Von A bis Z“: alle 44 Leistungen als typografische Spalten mit Buchstaben-Index.
7. **Referenzen:** Horizontale, gepinnte Galerie mit großen Bildkarten. Fortschrittslinie unten, Kundenliste als ruhiger Marquee.
8. **Familie seit 1977:** Zeitleiste; die Jahreszahl steht groß sticky links und wechselt, rechts die Einträge. Bilder: Meisterbrief 1977, Silberner Meisterbrief, Firmensitz Delkenheim.
9. **Team:** Büroteam als Namensliste in Serif (Name, Funktion), ohne Porträts, weil keine vorhanden sind.
10. **Kontakt:** Große Serif-Zeile „Sprechen wir über Ihr Gebäude.“ mit Telefon, E-Mail und Anfrage-Formular (mailto), Adresse und Erreichbarkeit.
11. **Footer:** Riesen-Wortmarke „Rüppel“, die sich beim Hineinscrollen von Kontur zu Fläche füllt. Impressum und Datenschutz.

## Qualität
- Kein Element überlappt, kein Text auf unruhigem Bild ohne Verlauf.
- `prefers-reduced-motion` schaltet alles auf statisch.
- Bilder mit `srcset` (sm/groß), `loading=lazy` außer Hero.
- Inspector, 20-Punkte-Launch-Check, Screenshots PC (1440) und iPhone (390).
- Vercel-Projekt `jh-konzept-rueppel`, noindex. Danach ins Portfolio, mit Autoplay-Vorschau.
