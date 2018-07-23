#!/usr/bin/env bash
#
# script used to wait for vital services
# of the engine (like MongoDB)
#
args=$@
hosts=()
callback=''
iscallback=0

for arg in $args; do
    if [ $iscallback == "1" ]; then
        callback+=" $arg"
    fi
    if [ $arg == "--" ]; then
        iscallback=1
    fi
    if [ $iscallback == 0 ]; then
        hosts+=($arg)
    fi
done

for host in ${hosts[*]}; do
    hostname=$(echo $host | cut -d: -f1)
    port=$(echo $host | cut -d: -f2)
    echo "checking $host is alive"
    while ! netcat -z $hostname $port; do
        echo "waiting $host"
        sleep 3
    done
done

bash -c "$callback"
