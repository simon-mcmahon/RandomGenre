#!/bin/bash
for ((i=1;i<=1650;i+=1))
do
    echo $i
    say "test genre number $i "  -o "$i.aiff"; lame -m m "$i.aiff" "$i.mp3";
done

rm *.aiff
