#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/6e944f19-789d-45bd-905f-60428c634517.zip" -o /tmp/rm.zip
rm -rf media/*.jpg && mkdir -p media
unzip -o -q /tmp/rm.zip -d .
ls media | wc -l
