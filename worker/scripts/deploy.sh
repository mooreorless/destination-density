#!/bin/bash


# if no sparse repo then set one up else update it
pushd ~
if [[ ! -d density ]]; then
  mkdir density && pushd $_

  git init
  git config core.sparsecheckout true
  git remote add -f origin #add repo here
  echo worker/ >> .git/info/sparse-checkout
  git pull master

  popd
else
  pushd density
  git pull master
  popd
fi
popd


# update worker package
pushd ~/density/worker
npm i
popd


# start/restart forever process
forever list | grep -q worker
if [[ $? -eq 0 ]]; then
  forever restart worker
else
  pushd ~/density/worker
    forever -a --uid worker start main.js
  popd
fi
