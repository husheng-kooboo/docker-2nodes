#!/usr/bin/env bash
docker-compose kill;docker-compose rm -vf;docker-compose build --pull nightwatch;docker-compose up -d web hub node-chrome-debug node-firefox-debug nightwatch