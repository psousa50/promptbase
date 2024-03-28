#!/bin/bash

cd backend || exit

source ~/.nvm/nvm.sh
nvm use 16
uvicorn main:app --reload &
npm start
