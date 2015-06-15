#!/bin/zsh

cd client && nohup grunt serve &
sleep 15

nohup neo4j start &

sleep 10

cd .. && nohup mongod --dbpath data/db/ --logpath data/logs/mongodb.log --logappend &


cd server
sleep 5

nohup npm test &
