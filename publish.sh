#!/bin/bash

git checkout -b stage
npm run build

cd "$(dirname "$0")"
find build -maxdepth 1 -mindepth 1 -exec mv {} . \;
rmdir build

rm package-lock.json
rm package.json

git merge --strategy=ours main    # keep the content of this branch, but record a merge
git checkout main
git merge stage 