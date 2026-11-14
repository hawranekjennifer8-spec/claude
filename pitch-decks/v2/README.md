# Pitch-Decks v2 (Keynote-tauglich)

Ablauf in der Higgsfield-Sandbox unter /home/user/dk:

1. `./runrec.sh <key…>` – Echtzeit-Aufnahme (Desktop 1280×800 und iPhone) ab Seitenaufruf, also inklusive Intro-/Logo-Animation, plus alte Seite
2. `./buildall.sh <key…>` – Loop-Videos (H.264 High 4.1, 30 fps, yuv420p, faststart, ohne Ton, ≥45–60 s vorgeloopt mit Überblendung), damit Keynote auf dem iPad nichts nachladen oder neu starten muss
3. `./mkdeck.sh <key…>` – Deck erzeugen, `post.py` setzt Autoplay (stumm, Endlosschleife) und Fade-Übergänge; Datei heißt wie der Betrieb, ZIP bewahrt den Dateinamen
4. `./qadeck.sh <key>` – alle Folien als Kontaktbogen rendern und prüfen

Folienfolge: Titel → QR „Schauen Sie gleich mit“ → Kompliment mit Google-Sternen → Szene → Vorher-Fundstücke → Kosten → Vorschlag → „So öffnet sich Ihre Seite“ (Intro Desktop + Handy) → Vorher/Nachher Desktop + Handy → Seite in Bewegung → 3 Highlights → Paket → Preise → Abschluss mit QR.
Upload-Grenze für Dateien: unter 100 MB (sonst einzelne Videos mit höherem CRF neu kodieren).
Rüppel vorerst ausgelassen (Seite wird überarbeitet).
