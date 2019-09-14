#!/bin/bash

clear;
    D='/sys/class/net'
    list_str=[
		theChangecounter=0;
		for nic in $( ls $D )
    do		
				themac=$(cat $D/$nic/address)
				if [ "$themac" != "00:00:00:00:00:00" ] && [ "$themac" != "" ]
				then
				    if (cat $D/$nic/address > /dev/null)
				    then
						theChangecounter=$((theChangecounter+1))	
						themac=$(cat $D/$nic/address)
            list_str="$list_str{'DEVICE':'$nic','MAC':'$themac'}, "            
					fi
        fi
      done
      
      list_str=${list_str%??}
      echo $list_str']'