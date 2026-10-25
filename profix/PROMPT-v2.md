# Profix Gebäudereinigung · Prompt v2 (Art Direction)

Grundlage für diesen Prompt:
- Masterprompt v7 und die CLEANY-Referenz
- tasteskill v2: Richtung „One motif“, Seed 940901378, mit Marke beibehalten (`--keep palette,type`)
- Vercel Web Interface Guidelines

## 1. Inventar: Was nur Profix hat
- **Name:** PROFIX = „Profi“ + „fix“. Das Logo ist ein Tropfen mit Abzieher, Haus und Staubsauger, in Hellblau `#67BFFD`, Grün `#00FF30`, Taupe `#74655F` und Schwarz.
- **Ort und Betrieb:** Büchnerstraße 11, Wiesbaden-Biebrich, am Rhein. Meisterbetrieb im Gebäudereiniger-Handwerk, Suat Kaya & Baris Aktan GbR.
- **Eigene Worte und Ziele:** „Geht nicht, gibt’s bei uns nicht!“, „Dienstleister aus Leidenschaft“, Ziele Qualität, Flexibilität und absolute Zuverlässigkeit.
- **Echte Zahlen:**
  - Rhythmus täglich, wöchentlich, monatlich oder individuell
  - Glastrennwände bis 1,80 m Höhe
  - Jalousien alle 1–3 Jahre
  - Winterdienst 24 h
  - 12 Leistungen
  - 5,0 ★ bei 26 Google-Rezensionen
- **Echte Aufgabenliste** der Unterhaltsreinigung (Leistungsverzeichnis) und das Angebot einer genehmigten Referenzliste.
- **Kurios bei der Sonderreinigung:** „sogar ein Kreuzfahrtschiff“.
- **Echtes Foto:** Glasdach, Juli 2023, aus dem Google-Profil. Begradigt (18°), Kontrast und Schärfe leicht nachbearbeitet; das Motiv ist unverändert.

## 2. Die Idee
> Auf dieser Seite wird **der Abzieher-Strich aus dem Profix-Logo** zum **einzigen Motiv**.

Eine Kapsel mit runden Enden (die saubere Bahn, die ein Abzieher hinterlässt) ist:
- die Maske jedes Fotos
- die Form der Buttons
- der Aufzählungspunkt
- das große Band in der Seitenmitte
- die Spur des Hero-Wischs

**Live-Element:** Der *Reinigungsplan*. Besucher wählen Objekt, Rhythmus und Leistungen. Daraus entsteht live ein Leistungsverzeichnis (ein Blatt wie im echten Angebot), mit den echten Aufgaben von Profix, und lässt sich per Klick als Anfrage-E-Mail senden.

## 3. Style-Brief
- **Feel:** klar, frisch, handwerklich präzise. Wie eine frisch abgezogene Scheibe: viel Weiß, ein starkes Blau, ein grüner Akzent.
- **Type:** Eine Familie, Plus Jakarta Sans (lokal), mit fünf Größen:
  - Display: `clamp(64px, 11vw, 190px)`, 800, Laufweite −0,055em
  - H2: `clamp(40px, 5.2vw, 88px)`, 800, Laufweite −0,045em
  - Statement: 32 px
  - Text: 18 px
  - Klein: 15 px
- **Color:**
  - Grund `#FFFFFF`, Feld `#E7F3FC`, Tinte `#0B1A26`
  - Motivblau `#67BFFD` als große Fläche
  - Tiefes Feld `#0E2A3F`
  - Aktion Grün `#2BD35A` (abgeleitet vom Logo-Grün `#00FF30`, damit es lesbar bleibt) mit Tinte
  - Taupe `#74655F` nur im Footer-Wortbild
- **Layout:**
  - 12-Spalten-Raster, Außenränder 24–40 px, Sektionsabstand 160–220 px
  - Jede Sektion hat eine eigene Komposition, kein Kartenraster
  - Eckradius: Kapsel (999 px) für Bilder und Buttons, sonst eckig
- **Motion und Pacing:**
  - Hero-Wisch (Signatur, ca. 3,5 s)
  - Index mit Vorschau bei den Leistungen
  - Gestaffelte Eingänge (Überschrift, dann Text, dann Bild, 70 ms versetzt, 24 px)
  - Langsamer Zoom auf dem Hero-Foto
  - Akkordeon mit Farbstufen
  - Karteikarten-FAQ
  - Gutschein-Perforation
  - Lenis-Smooth-Scroll
  - Reduced Motion: alles sofort sichtbar

**5 Always**
1. Echte Daten.
2. Ein Motiv.
3. Große Typo.
4. Grün nur für Aktionen.
5. Jede Sektion mit Überschrift.

**5 Never**
1. Verläufe.
2. Schatten.
3. Glas-Navigation.
4. Icon-Karten.
5. 01/02/03-Nummern, Eyebrow-Labels oder Großbuchstaben-Sperrschrift.

## 4. Seitenablauf (jeder Abschnitt mit seinem Argument)
1. **Hero**
   - Inhalt:
     - links „Alles sauber.“ (h1)
     - Satz: „Profix ist Meisterbetrieb im Gebäudereiniger-Handwerk aus Wiesbaden-Biebrich – für Büros, Treppenhäuser, Glas, Industrie und den Winter im Rhein/Main-Gebiet.“
     - Button „Kostenlose Beratung“, Telefon, Google-Wertung als Satz
     - rechts eine riesige blaue Kapsel (vom Viewport angeschnitten) mit dem echten Glasdach-Foto
   - Animation:
     - Die ganze erste Seite ist beschlagen: weicher Schleier mit Kalk-Flecken.
     - Feiner Schaum (Hunderte Bläschen mit Glanzpunkt) wird in Stößen aufgesprüht.
     - Ein echter Abzieher (Gummilippe, Edelstahl-Schiene, grüner Griff) zieht in Bahnen. Jede Bahn hinterlässt eine saubere Kapsel, an der Kante laufen Tropfen ab.
     - Am Ende streift ein Glanz über die H1.
     - Wer mit Maus oder Finger wischt, wischt mit.
2. **Leistungen.** „Zwölf Leistungen, ein Betrieb.“ als Index mit Vorschau:
   - 12 Zeilen in großer Schrift.
   - Hover oder Fokus öffnet rechts ein blaues Kapsel-Panel auf Höhe der Zeile, mit den echten Details.
   - Am Handy klappt jede Zeile auf.
3. **Reinigungsplan (Live-Element).** „Ihr Reinigungsplan.“: Auswahl links, rechts das Leistungsverzeichnis, das sich live füllt, darunter „Plan per E-Mail anfragen“.
4. **Großes Band.** Die Kapsel über die volle Breite in Motivblau, darin: „Geht nicht, gibt’s bei uns nicht.“ (ihr Satz)
5. **Über uns.** Inset-Panel in tiefem Blau:
   - Statement „Dienstleister aus Leidenschaft.“
   - Historisches Fensterputzer-Foto (Staatsarchiv Freiburg) in der Kapsel-Maske als Bild des Handwerks
   - Drei Ziele, die Inhaber, Button
6. **Ablauf.** „So läuft’s ab.“: horizontales Akkordeon dunkel → hell (Anfragen · Kostenlose Beratung · Profix übernimmt).
7. **Zuhause in Biebrich.** Vier Orte als Kapseln mit Bildunterschrift (Schloss Biebrich, Rhein bei Biebrich, Kurhaus Wiesbaden, Jagdschloss Platte), Credits im Footer.
8. **FAQ.** „Gut zu wissen.“: Karteikarten mit Reitern, eine offen.
9. **Kontakt.** Ausschneide-Gutschein „Gutschein für ein kostenloses Beratungsgespräch“ mit Perforation (Kerben und Punkte), Formular → mailto. Daneben Telefon, Adresse, Öffnungszeiten laut Google.
10. **Footer.** PROFIX aus Blöcken in den Markenfarben, Links, Bild-Credits, Konzept-Hinweis, Impressum und Datenschutz.

## 5. Video-/Motion-Prompt der Hero-Szene
In dieser Reihenfolge: Subject, Action, Camera, Lighting, Style, Pacing.
- **Subject:** beschlagene Glasfläche vor der Profix-Startseite.
- **Action:** Schaum in drei Sprühstößen, dann drei Abzieher-Bahnen links→rechts→links, Tropfen an den Kanten, Glanzstreifen.
- **Camera:** statisch, frontal, die Glasfläche füllt das Bild.
- **Lighting:** helles Tageslicht, Schaum mit kühlen blauen Glanzlichtern.
- **Style:** fotorealistischer Schaum, matte Kalkflecken, kein Comic-Look.
- **Pacing:** 0,4 s Ruhe, 0,9 s Schaum, 2,1 s Wischen, 0,6 s Glanz.

## 6. Bildquellen (ehrlich)
- **Profix:** Glasdach-Foto aus dem Google-Profil, Logo von der Website.
- **Wikimedia Commons (nur Umfeld, nie als Profix-Objekt):**
  - Fensterputzer, Landesarchiv BW / Staatsarchiv Freiburg W 134 Nr. 007183B, CC BY 4.0
  - Kurhaus Wiesbaden, Martin Kraft, CC BY-SA 4.0
  - Jagdschloss Platte, Pedelecs, CC BY-SA 3.0
  - Schloss Biebrich und Fähre Tamara, Ansgar Koreng, CC BY-SA 3.0
