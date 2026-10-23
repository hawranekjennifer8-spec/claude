#!/bin/sh
set -e
curl -sSL "https://d2ol7oe51mr4n9.cloudfront.net/user_3DwQyx0Gmhz59plV9eJMlvUOn5h/79977897-b79e-449f-8b26-c0525e0a2932.zip" -o /tmp/v.zip
unzip -o -q /tmp/v.zip -d media
ls media
