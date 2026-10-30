# Kaffee & Kissen – Prompt v3 (30.10.2026)

**Projekt:** Konzeptseite für Kaffee & Kissen – Das Boutique-Hotel am Rhein (Oestrich-Winkel, 8 Zimmer, Hofcafé, Fasssauna; Betreiber Keys&Stays GbR).
**Für wen:** Paare und Genießer, die ein kleines, persönliches Haus im Rheingau suchen. Ziel: „Da will ich unbedingt hin.“
**Tool:** Claude (Vanilla HTML/CSS/JS, GSAP + ScrollTrigger + Lenis lokal), Hosting Vercel (Projekt jh-konzept-kaffeekissen, Branch jh-pitches).
**Referenz:** Webild-Villen-Seite (buildwithcoco93) + Aman/Rosewood-Klassik, Jennys Masterprompt v7.

## Style-Brief
**Feel:** Ein helles, klassisch-luxuriöses Boutique-Hotel-Magazin, warm und persönlich, das sich beim Scrollen wie eine Tür öffnet.

**Type:** Cormorant Garamond 300 für Headlines (riesig, enges Tracking −0,02 em, kursive Akzente in Messing), Manrope 300/500 für Text; Labels 11 px Versalien, Sperrung 0,3 em.

**Color:** Elfenbein #F7F2EA (Grund), Papier #FBF8F2, Sand #ECE3D4, Tinte #2A221C, Messing #A3814F (Akzente), Text gedämpft #54483E.

**Layout:** Viel Weißraum, asymmetrisches 12er-Raster, das Bogen-Motiv aus Emblem und Rundbogenfenstern als Bildrahmen.

**Motion & Pacing:** expo.out, Reveals 1,2–1,6 s, Buchstaben-Stagger 0,02 s; Hero-Bilder wechseln alle 6 s mit 1,8 s Crossfade und langsamem Zoom-out (1,08 → 1,0 über 7,5 s), Fortschrittslinien statt Punkte.

**Always:**
1. Nur echte Fotos des Hauses, Profi-Aufnahmen im Hero.
2. Bilder nie größer als ihre Auflösung (Retina 2×).
3. Motiv immer vollständig im Rahmen (Bild-Box wächst mit dem Bogen statt Ausschnitt eines Vollbilds).
4. Jedes Foto nur einmal pro Seite.
5. Text und Bild überlappen nie, Desktop und Handy geprüft.

**Never:**
1. Handyfotos großflächig.
2. Erfundene Begriffe, Zimmernamen oder Fakten.
3. Kleine verlorene Einzelbilder ohne Bezug.
4. Dunkle, schwere Flächen im Hero.
5. KI-Einheitslook (Lila-Verläufe, Glas-Karten, drei gleiche Kacheln).

## Umsetzung
- **Hero:** großer Bogen (Desktop rechts ~46 vw, Handy oben unter dem Logo). Darin wechseln 5 Profi-Fotos: Terrasse, Zimmer mit Kunstwerk, Brotzeit-Tafel im Hof, Flur mit Wandgemälde, Hoftafel mit Blumen. Die Bild-Box wächst beim Scrollen mit dem Bogen auf Vollbild → „Willkommen im Kaffee & Kissen“.
- **Hofcafé:** Frühstückstisch groß, dazu Croissant-Buffet und Innenraum des Hofcafés (Profi-Fotos).
- **Entfernt:** kleines verlorenes Gartenbild unter „Jedes ein Unikat“.
- **Recht:** Impressum/Datenschutz mit Daten der Keys&Stays GbR, Hosting Vercel, noindex, keine Cookies, keine fremden Hosts.
- **Portfolio:** Bildschirmaufnahme 1280×800, 24 s, Autoplay, „Konzept-Entwurf · nicht beauftragt“.
