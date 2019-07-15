#!/usr/bin/env bash
docker ps -q | docker stop
docker rm $(docker ps -aq);
docker rmi $(docker images -f "dangling=true" -q);
docker-compose build --pull nightwatch;
docker-compose up -d hub node-chrome-debug node-firefox-debug nightwatch;