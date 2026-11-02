#!/bin/sh
# Autolackiererei Götter – Konzeptseite. Echte Werkstattfotos von autolackiererei-wiesbaden.de liegen als Zip auf dem Higgsfield-CDN.
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/409a5a3c-30db-4f33-a915-ce1592f0a781.zip" -o /tmp/gt-media.zip
rm -rf img && unzip -o -q /tmp/gt-media.zip
ls img | wc -l
