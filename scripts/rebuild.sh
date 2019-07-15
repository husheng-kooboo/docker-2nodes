#!/usr/bin/env bash
docker stop $(docker ps -q);
docker rm $(docker ps -aq);
docker rmi $(docker images -f "dangling=true" -q);
docker-compose build --pull nightwatch;
docker-compose up -d hub node-chrome-debug node-firefox-debug nightwatch;