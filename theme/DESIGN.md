# DESIGN.md – LUMINOSO Jewelry (Relaunch 11/2026, J.H. Digital Atelier)

## Brand overview
Schmuck aus echtem Gold (333/375/585) und 925 Sterlingsilber, 30–1.100 €. Zielgruppe: Frauen 25–55, die sich selbst oder anderen etwas Bleibendes schenken. Gefühl: ruhig, warm, vertrauenswürdig, edel – Licht auf Metall.

## Design thesis
„Gemacht, um Licht zu fangen.“ – jede Fläche ist warmes Licht auf Stein, Seide oder Leinen; das Produkt ist das einzige Funkeln.

## Colors
| Name | Wert | Token | Rolle |
|---|---|---|---|
| Elfenbein | #F4EFE6 | --ivory | Seitengrund |
| Champagner | #E9DFCF | --champ | Flächen |
| Karte | #EFE8DC | --card | Produktbild-Hintergrund (Packshots mit multiply) |
| Sand | #CDBB9E | --sand | Linien, Hover |
| Altgold | #9C7A3C | --gold | Akzent sparsam |
| Tinte | #1C1A17 | --ink | Text, dunkle Sektionen |
| Rauch | #6F665C | --smoke | Sekundärtext |

## Typography
- Cormorant (Garamond, 300/italic 300) – Headlines, Produktnamen; 40–132px; lh 1.02; ls -0.015em
- Geist 400 – Fließtext 15px/1.6
- Geist Mono 500 – Labels/Buttons 10.5–12px, Versal, ls .16–.22em
Alle Schriften lokal über Shopify Files.

## Spacing and composition
Seitenrand clamp(18px,4vw,64px); Sektionen clamp(80px,12vw,170px); Radius 4px (Bilder), 999px (Buttons/Chips); Schatten nur als weicher Drop-Shadow unter freigestellten Produkten. Raster 4/2 Spalten, Gap 14px.

## Components
Primärbutton Tinte gefüllt (Hover Altgold); Sekundär Outline; Chips (Unterkategorien); Produktkarte (Champagner-Fläche, Packshot multiply, 2. Bild + Licht-Sweep bei Hover, Name Serif, Material klein, Preis Mono); Kategorie-Kachel (Cut-out-Produkt + Glow); Header sticky, auf Hero transparent, Mega-Menü 4 Spalten + Bild; Footer Tinte mit „Vertrag widerrufen“-Button.

## Dos and Don'ts
Do: echte Produktfotos, Material/Feingehalt sichtbar, § 19 UStG-Hinweis, Vertrauen am Kaufbutton, viel Luft.
Don't: KI-Gesichter/Models, leere Sektionen, Pop-ups, Fake-Knappheit/Bewertungen, Fremdmarken, mehr als eine Akzentfarbe.

## Motion philosophy
Lenis Smooth-Scroll, GSAP-Reveals (expo.out, 1.2s), Masken-Reveal der Hero-Zeilen, langsamer Parallax, Lichtkante über dem Hero. prefers-reduced-motion: keine Animation.
