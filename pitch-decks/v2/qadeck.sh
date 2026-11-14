#!/bin/bash
# qadeck.sh <key> -> qa_deck/<key>.jpg
cd /home/user/dk; k=$1
name=$(node -e "const S=require('./sites.js');console.log(S['$k'].name.replace(/’/g,\"'\").replace(/\//g,'-'))")
d=qa_deck/$k; rm -rf $d; mkdir -p $d; cp "final/$name.pptx" $d/p.pptx
(cd $d && timeout 110 soffice --headless --convert-to pdf p.pptx >/dev/null 2>&1 && pdftoppm -r 22 -png p.pdf s && montage s-*.png -tile 6x -geometry +3+3 -background '#777' ../$k.jpg)
ls -la qa_deck/$k.jpg
