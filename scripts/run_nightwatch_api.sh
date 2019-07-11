#!/usr/bin/env bash

if [ -n "$TAGS" ] ; then
    BROWSER="$BROWSERENV" npm run e2e-test -- --tags "$TAGS" ; npm run e2e-report
else
    BROWSER="$BROWSERENV" npm run e2e-test ; npm run e2e-report
fi