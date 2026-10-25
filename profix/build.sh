#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/f21ac379-e1d2-4e4f-9ec5-0579046790fa.zip" -o /tmp/pm.zip
rm -rf /tmp/x && mkdir -p /tmp/x
unzip -o -q /tmp/pm.zip "profix/*" -d /tmp/x
rm -rf media && mv /tmp/x/profix/media media
ls media
