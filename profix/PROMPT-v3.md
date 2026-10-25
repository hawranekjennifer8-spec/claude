# Profix Gebäudereinigung · Prompt v3 „Masterpiece“

Jennys Entscheidungen vom 25.10.2026:
- Statt fremder Fotos: 3D und Code. Dazu nur das echte Glasdach-Foto und das Logo.
- Look: hell und frisch.
- Story beim Scrollen: Rundgang durchs Gebäude. Jeder Raum wird sauber gewischt, sobald er erscheint.

Raus aus v2: Fensterputzer-Archivfoto, Schloss Biebrich, Fähre, Kurhaus, Jagdschloss Platte und die gesamte Sektion „Zuhause in Biebrich“.

## 1. Die Idee
> **Das Leistungsverzeichnis von Profix wird zum begehbaren 3D-Gebäude.** Jeder Raum steht für eine echte Leistung. Er erscheint verstaubt, ein 3D-Abzieher zieht durch, und hinter ihm wird der Raum sauber. Parallel haken sich die echten Aufgaben von Profix ab.

- Das Motiv bleibt die Kapsel: der Abzieher-Strich aus dem Logo.
- Das Live-Element bleibt der Reinigungsplan.

## 2. Die 5 Pflicht-Elemente (Masterprompt)
1. **Scroll-Storyline:** Kamerafahrt durch 5 Räume des 3D-Modells: Büro, Treppenhaus, Glas, Industriehalle, Winter.
2. **Smooth Animations:** Lenis, GSAP und gedämpfte Kamera mit Easing, nichts springt.
3. **Hero-Video:** Hier eine lebende 3D-Szene statt Video: das ganze Gebäudemodell im Überblick, langsam schwebend, hinter einer beschlagenen Scheibe, die der Abzieher freiwischt.
4. **Hover-Reveal:** Index der 12 Leistungen mit Vorschau-Panel. Im 3D-Raum leuchten beim Abhaken die Objekte auf, die gerade gereinigt werden.
5. **Object Breakdown:** Der Profix-Tropfen aus dem Logo als 3D-Glasobjekt, das sich beim Scrollen in seine drei Segmente zerlegt (Haus, Staubsauger, Abzieher = die drei Bereiche des Logos).

## 3. 3D-Art-Direction (three.js r134, lokal)
- **Stil:** Architekturmodell bzw. Diorama, isometrische Anmutung (Kamera mit FOV 26°), Räume als Schnittmodell mit Boden und zwei Wänden. Matte weiße und hellblaue Oberflächen, weiche Schatten (PCF Soft), Hemisphären-Licht, Umgebungsreflexionen über PMREM.
- **Farben:**
  - Wände `#F4F8FB`, Boden `#E3EEF6`
  - Akzente Profix-Blau `#67BFFD`, Grün `#2BD35A`, Taupe `#74655F`
  - Tinte `#0B1A26`
  - Glas: hellblau, durchscheinend mit Spiegelung
- **Schmutz-Shader** (für alle Materialien über `onBeforeCompile`):
  - Ein Welt-Schwellwert `uWipe` trennt staubig (entsättigt, grau-braune Wolkenflecken aus Value-Noise) von sauber.
  - An der Wischkante läuft ein heller Glanzstreifen mit.
  - Staubpartikel schweben im ungeputzten Teil, Funkel-Sterne erscheinen im sauberen.
- **3D-Abzieher:** Gummilippe dunkel, Schiene Edelstahl (metallic), Griff grün. Er fährt in Raumtiefe von links nach rechts, exakt auf der Wischkante.
- **Die Räume** (nur echte Leistungen und Aufgaben):
  1. **Büro = Unterhaltsreinigung:** Schreibtische, Monitore, Stühle, Pflanze, Papierkorb, Glastrennwand mit Maßlinie „1,80 m“. Aufgaben: Papierkörbe leeren, Böden feucht wischen, Monitore und Tastaturen entstauben, Glastrennwände bis 1,80 m.
  2. **Treppenhaus = Treppenhausreinigung:** zwei Läufe mit Podest, Geländer, Fenster. Aufgaben: jede Etage bis zum Keller, Geländer und Fensterbänke inklusive, auf Wunsch Grundreinigung mit Einscheibenmaschine.
  3. **Glas = Fenster- und Glasreinigung:** Glasfassade und Glasdach-Reihe (Anspielung auf das echte Einsatzfoto). Aufgaben: Fenster und Glasflächen, Glasfassaden und Wintergärten, Glasdächer und Leuchtschriften.
  4. **Halle = Industriereinigung:** Maschinen, Rohrleitungen, Regale, Industrieboden. Aufgaben: Maschinen und Fertigungsanlagen, Industrieböden, Kessel, Tanks und Elektroanlagen.
  5. **Winter = Winterdienst:** Gehweg, Gebäudeecke, Bäume, Schneefall. Hier räumt der Abzieher als Schneeschieber den Weg frei. Aufgaben: Räumen und Streuen, Eisbeseitigung, 24-Stunden-Service.

## 4. Seitenablauf
1. **Hero:**
   - Inhalt: „Alles sauber.“, Satz, Button „Kostenlose Beratung“, Telefon, Google-Wertung.
   - Bühne: die 3D-Gesamtansicht aller 5 Räume, sauber, mit leichter Maus-Parallaxe.
   - Animation: Die beschlagene Scheibe mit Schaum wird freigewischt (wie bisher, nur besser).
2. **Rundgang (gepinnt, 5 Kapitel):**
   - Links eine Textkarte mit Leistung, Satz und den Aufgaben, die sich synchron zur Wischkante abhaken.
   - Rechts der Raum.
   - Eine Fortschrittsleiste mit den 5 Raumnamen. Klick fährt dorthin.
3. **Leistungen:** alle 12 als Index mit Vorschau-Panel.
4. **Reinigungsplan:** live erzeugtes Leistungsverzeichnis mit mailto.
5. **Aus dem Einsatz:** das echte Glasdach-Foto groß in der Kapsel, Bildunterschrift „Einsatzfoto von Profix, Juli 2023“, dazu die Glas-Fakten.
6. **Band:** „Geht nicht, gibt’s bei uns nicht.“
7. **Über uns:** helles Panel, der Profix-Tropfen als 3D-Glasobjekt mit Object Breakdown, Ziele, Inhaber.
8. **Ablauf:** Akkordeon dunkel → hell.
9. **FAQ:** Karteikarten.
10. **Kontakt:** Gutschein mit Perforation.
11. **Footer:** Blockwortmarke.

## 5. Motion und Pacing
- **Hero:** 0,2 s Ruhe, 0,9 s Schaum, 2 s Wischen, 0,6 s Glanz. Danach schwebt das Modell (Sinus ±0,15, Rotation ±3°).
- **Rundgang pro Raum:**
  - 0–22 %: Kamerafahrt mit Ease-in-out zum Raum.
  - 22–78 %: Wischen von links nach rechts; die Aufgaben haken sich bei 30/45/60/75 % ab.
  - 78–100 %: Halten, Funkeln.
- **Weiter:** Gestaffelte Eingänge (70 ms), Button-Feedback, Panel-Crossfade 240 ms.
- **Reduced Motion:** statische saubere Räume, alle Aufgaben abgehakt.
- **Performance:**
  - Pixel-Ratio max. 1,75, am Handy 1,25
  - Schatten 2048 bzw. 1024
  - Rendern nur, wenn sichtbar (IntersectionObserver)
  - Ohne WebGL: Text-Fallback

## 6. Style-Regeln (tasteskill + Masterprompt)
- Eine Schrift (Plus Jakarta Sans, lokal), höchstens 9 Größen.
- Keine Eyebrows, keine 01/02/03, keine Verläufe oder Schatten auf Flächen, keine Glas-Navigation, keine Icon-Karten.
- Grün nur für Aktionen.
- Bilder: nur echtes Profix-Material (Glasdach-Foto, Logo). Alles andere ist sichtbar gezeichnet bzw. 3D. Kein Archivbild, kein Stockbild, kein KI-Bild.
- QA: Inspector bei 1440/768/390 mit 0 FAIL, Screenshots selbst prüfen, 20-Punkte-Launch-Check, Portfolio-Video neu aufnehmen.
