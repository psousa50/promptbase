#!/bin/bash

cd backend || exit

uvicorn main:app --reload
