#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/9ac94296-803f-41ae-9880-5cc732289e28.zip" -o /tmp/pm.zip
rm -rf /tmp/x && mkdir -p /tmp/x
unzip -o -q /tmp/pm.zip "profix/*" -d /tmp/x
rm -rf media && mv /tmp/x/profix/media media
ls media
