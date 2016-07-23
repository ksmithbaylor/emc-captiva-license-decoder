#!/usr/bin/env zsh
git log --pretty=format:'%cD -%d %s' --abbrev-commit > changelog.txt
