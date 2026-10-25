#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/3cfcc237-090e-47c8-a03c-96e312621a11.zip" -o /tmp/pm.zip
rm -rf /tmp/x && mkdir -p /tmp/x
unzip -o -q /tmp/pm.zip "profix/*" -d /tmp/x
rm -rf media && mv /tmp/x/profix/media media
ls media
