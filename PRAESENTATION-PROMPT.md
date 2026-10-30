# J.H. Digital Atelier – Portfolio als PowerPoint (Prompt v1, 30.10.2026)

**Projekt:** Das Portfolio jh-digital-atelier.vercel.app als PowerPoint-Präsentation (.pptx), 1:1 im Look der Website.
**Für wen:** Inhaber von Restaurants, Hotels, Shops und Handwerksbetrieben beim Pitch vor Ort (Laptop oder Fernseher). Ziel: „So eine Website will ich auch.“
**Tool:** pptxgenjs (Struktur, Theme, Layouts) + OOXML-Nachbearbeitung für Animationen, gebaut in der Higgsfield-Sandbox mit den Original-Medien des Portfolios.

## Style-Brief
- **Feel:** Ein ruhiges Keynote-Magazin in Porzellan und Nachtschwarz, in dem jede Arbeit als laufender Film gezeigt wird.
- **Type:** Headlines Bodoni MT (Didone wie Bodoni Moda im Portfolio), Akzentwort kursiv; Fließtext Calibri; Labels in Versalien, weit gesperrt, Format „[ 03 · Restaurant ]“.
- **Color:** Porzellan #F4F2EE (Grund), Tinte #141416, Stein #6C6862, Gold #A8844F (Akzent), Nacht #0B0C10 mit #EEEBE4 für dunkle Folien; pro Projekt dessen Hintergrundfarbe aus dem Portfolio.
- **Layout:** Strenges Raster, Text und Vorschau in getrennten Feldern, nie überlappend; Projektfolien 4:6 (Text links, Browser-Rahmen mit Video rechts).
- **Motion:** Folienübergang „Verblassen“ (langsam); Texte steigen gestaffelt auf (0,8 s, 0,15 s Abstand); jedes Projektvideo startet beim Öffnen der Folie automatisch, stumm, in Endlosschleife.

**Always:** 1) echte Bildschirmaufnahmen der Seiten als Video; 2) JH-Monogramm im Kreis als Markenzeichen; 3) Konzepte klar als „Konzept-Entwurf · nicht beauftragt“; 4) gleiche Titelposition auf gleichen Folientypen; 5) Kontakt- und Impressumsdaten von Jenny korrekt.
**Never:** 1) Text über Videos/Bildern; 2) Zierstreifen/Linien unter Titeln; 3) Stockfotos oder KI-Bilder; 4) Text kleiner als 10 pt; 5) erfundene Kennzahlen oder Kundenstimmen.

## Folienplan (18)
1 Titel (Nacht) · 2 Ausgewählte Arbeiten (Raster aller 12 Projekte) · 3–8 Kundenprojekte (Da Graziella, ZITRA, PYRO, MAGNIFIO, LUMINOSO, ZOIA) · 9 Trenner „Konzepte aus der Region“ · 10–15 Konzepte (Café wunderbar, Eichenhonig, Team Bau, PASTASCIUTTA, PROFIX, Kaffee & Kissen) · 16 Haltung „Zeit ist Luxus.“ (Nacht, Video-Wand) · 17 Ablauf + Leistungen · 18 Kontakt (Nacht).

## QA
validate.py ohne Fehler, jede Folie als Bild geprüft (Überlauf, Überlappung, Kontrast), Videos mit Autostart und Schleife im XML, Dateigröße unter 60 MB.
