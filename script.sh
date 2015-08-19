#!/bin/zsh

cd client && nohup grunt serve & echo $!
sleep 15

nohup neo4j start & echo $!

sleep 10

cd .. && nohup mongod --dbpath data/db/ --logpath data/logs/mongodb.log --logappend & echo $!



cd server
sleep 5

nohup npm test & echo $!
