#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/0c1b5fd5-4510-4db4-8fad-d62ae41f6ef2.zip" -o /tmp/v.zip
unzip -o -q /tmp/v.zip -d media
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/419bcaed-8a6c-4040-99d6-ef565e1001d7.zip" -o /tmp/v2.zip
unzip -o -q /tmp/v2.zip -d media
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/03a8ad9f-930d-4bbf-a279-0927f2dd3fc6.zip" -o /tmp/v5.zip
unzip -o -q /tmp/v5.zip -d media
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/43a3104c-845c-4827-99eb-5f0e755f13df.zip" -o /tmp/v6.zip
unzip -o -q /tmp/v6.zip -d media
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/7194bc43-eaae-4beb-8663-f8eafb94b48d.zip" -o /tmp/v7.zip
unzip -o -q /tmp/v7.zip -d media
rm -f media/mira* media/goldwabe* media/rheinkante* media/lina*
ls media
