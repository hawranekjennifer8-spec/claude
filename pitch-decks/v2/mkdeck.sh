#!/bin/bash
cd /home/user/dk; mkdir -p out final zips
for k in "$@"; do
  name=$(node -e "const S=require('./sites.js');console.log(S['$k'].name.replace(/’/g,\"'\").replace(/\//g,'-'))")
  node gen.js $k >/dev/null && python3 post.py out/raw_$k.pptx "final/$name.pptx" >/dev/null && rm -f "zips/$k.zip" && (cd final && zip -q -0 "../zips/$k.zip" "$name.pptx") && echo "$k|$name|$(du -m "final/$name.pptx" | cut -f1)MB"
done
