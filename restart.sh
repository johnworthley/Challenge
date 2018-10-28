#!/bin/bash
sudo lsof -i :8888
sudo lsof -i :3000
docker run --rm --name eosio_blog_container -d -v ~/eosio-wallet:/root/eosio-wallet eosio/eos-dev /bin/bash -c 'keosd'
alias cleos='docker exec -i eosio_blog_container /opt/eosio/bin/cleos --wallet-url http://localhost:8888 -u https://api.eosnewyork.io:443'
./quick_start.sh
