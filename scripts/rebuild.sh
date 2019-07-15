#!/usr/bin/env bash
docker ps -q | docker stop
docker ps -aq |docker rm 
docker images -f "dangling=true" -q | docker rmi
docker-compose build --pull nightwatch
docker-compose up -d hub node-chrome-debug node-firefox-debug nightwatch