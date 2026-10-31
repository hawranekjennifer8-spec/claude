#!/bin/sh
# KAVOS – Konzeptseite. Echte Fotos (Bildnachweis siehe Impressum) und Logo-Vektoren von kavos-wiesbaden.de liegen als Zip auf dem Higgsfield-CDN.
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/63b8cbc2-e076-4855-a439-5f05d88ed023.zip" -o /tmp/kv-media.zip
rm -rf img && unzip -o -q /tmp/kv-media.zip
ls img | wc -l
