var shell = require('shelljs/global');
config.execPath = String(which('node'))

//const Photon = require("electron-photon");
const script_path = "/home/ahmed/git/kodachi/kbase/newmac";


function change_all_mac(){ 

}

function list_all_mac2(){
  const list_all_cmd  =`
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
      echo "${list_str}
        `;

        //console.log(shell.exec(list_all_cmd))
    return (shell.exec(list_all_cmd));
}




function list_all_mac(){
  var path = '/sys/class/net';
  var counter=0;
  var list_mac_array=[]
  cd(path);
  ls().forEach(function(file) {
    var themac =cat(path+'/'+file+'/address').stdout
    console.log(themac)

    //previous cat return new line after string
    //currently use this because not all bash commands supported in shelljs
    themac=themac.substring(0, themac.length - 1);
    if(themac  != "00:00:00:00:00:00"  && themac != ""){
      //var mac_entry= JSON.stringify(DEVICE:file,MAC:themac);
      list_mac_array.push({DEVICE:file,MAC:themac});
    }

  });
  return list_mac_array;
}



function list_all_interfaces(){
  var list_all_cmd  =" nmcli connection show | perl -MJSON -lane 'if (!@keys) { @keys = @F } else { my %h = map {($keys[$_], $F[$_])} 0..$#keys; push @data, \\%h } END { print encode_json \\@data }'";
        var outter= exec(list_all_cmd);
       // console.log(outter)
    return outter;
}


function changemac_random(x){
    
  var old_mac= $(x).closest("td").data('mac');
  var old_device_name =$(x).closest("td").data('devicename');
  
  console.log(old_device_name);
  console.log(exec('sudo macchanger -r '+old_device_name));
  bootup();

}
function changemac_specific(){

}