#!/bin/sh
# Bohemian Beauty by Ann – Konzeptseite. Echte Fotos und Logo-Vektor von bohemianbeauty.de liegen als Zip auf dem Higgsfield-CDN.
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/cd04ea5c-213f-4ccb-9afa-f147366dc21e.zip" -o /tmp/bb-media.zip
rm -rf img && unzip -o -q /tmp/bb-media.zip
ls img | wc -l
