#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# increment app version
npm version patch
git push origin head

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:consultlowtide/dsm-todos-ant.git master:gh-pages

cd -