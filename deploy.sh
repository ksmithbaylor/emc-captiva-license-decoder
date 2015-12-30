#!/usr/bin/env zsh

git push && \
git checkout gh-pages && \
git merge master && \
npm run build && \
git commit -am 'Deploy latest version' && \
git push

git checkout master
