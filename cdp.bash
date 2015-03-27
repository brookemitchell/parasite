#!/bin/bash
#Runs CDP funcition at 00:01 each night

usage=(0 0 0 0 0 0 0)

find=$1
echo finding $find

freqs () {
    awk '/press: 0/ {print $3}' | wc -l
}

freqs

exit
# set freqs (freqs)

# for i in $freqs;
#     echo $i;
# end
# echo $freqs $usage
