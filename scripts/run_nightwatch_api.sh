#!/usr/bin/env bash

if [ -n "$TAGS" ] ; then
    BROWSER="$BROWSERENV" npm run e2e-test -- --tags "$TAGS"
else
    BROWSER="$BROWSERENV" npm run e2e-test
fi