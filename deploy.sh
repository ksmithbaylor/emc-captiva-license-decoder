#!/usr/bin/env zsh

if [[ $# -lt 1 ]]; then
  echo "Usage: ./deploy.sh {major,minor,patch}"
  exit 1
fi

# Bump version
npm version "$1"

# Push to master
git push

# Commit changes to gh-pages branch, stop if anything fails
git checkout gh-pages && \
git merge master && \
npm run build && \
git commit -am 'Deploy latest version'

# Push whatever happened to gh-pages and switch back to master
git push
git checkout master
