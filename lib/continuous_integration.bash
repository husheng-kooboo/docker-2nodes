#!/usr/bin/env bash

lint_dockerfiles() {
  sudo bin/lint_dockerfiles docker/*/Dockerfile
}

lint_shell() {
  sudo bin/lint_shell -x \
    bin/* \
    lib/*.bash \
    scripts/*.sh
}

lint_markdown() {
  sudo bin/lint_markdown --frail .
}

lint_yaml() {
  sudo bin/lint_yaml .
}

"$@"
