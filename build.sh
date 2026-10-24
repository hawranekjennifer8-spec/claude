#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/0c1b5fd5-4510-4db4-8fad-d62ae41f6ef2.zip" -o /tmp/v.zip
unzip -o -q /tmp/v.zip -d media
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/8bffba5e-a409-4099-9682-7f9f5a948313.zip" -o /tmp/v2.zip
unzip -o -q /tmp/v2.zip -d media
rm -f media/mira* media/goldwabe* media/rheinkante* media/lina*
ls media
