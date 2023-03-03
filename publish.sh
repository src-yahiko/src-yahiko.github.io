#!/bin/bash

# cd to root directory
cd "$(dirname "$0")"

# go to dev branch
git checkout main 

# create temporary stage branch from dev and build
git checkout -b stage
npm run build

# delete dev files
# rm -rf package-lock.json package.json public src

# move build files to root directory
find build -maxdepth 1 -mindepth 1 -exec cp -r * {} . \;
rm -rf build

# merge with main
git merge --strategy=ours main -m "stage to main"

# commit changes
git add .
git commit -m "stage to main"

# checkout to main, merge and push changes to remote
git checkout main
git merge stage 
git push

# delete stage branch and go back to dev
git branch -D stage
# git checkout dev


