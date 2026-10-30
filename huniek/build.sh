#!/bin/sh
# Huniek – Konzeptseite. Echte Fotos und Logo-Vektoren von huniek.de liegen als Zip auf dem Higgsfield-CDN.
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/cdcc5c9f-c86f-455b-a423-abfbc2b14eb1.zip" -o /tmp/hu-media.zip
rm -rf img && unzip -o -q /tmp/hu-media.zip
ls img | wc -l
