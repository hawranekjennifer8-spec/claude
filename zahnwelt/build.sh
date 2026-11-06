#!/bin/sh
# ZAHNWELT Dr. Doganay & Kollegen – Konzeptseite. Echte Praxisfotos + Logo von zahnwelt-wiesbaden.de liegen als Zip auf dem Higgsfield-CDN.
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/398aedb0-4634-4b97-8f19-ed014c06770e.zip" -o /tmp/zw-media.zip
rm -rf img brand && unzip -o -q /tmp/zw-media.zip
ls img brand | wc -l
