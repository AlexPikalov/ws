#!/bin/bash

# This script installs all ui dependencies and build the application
cd ./ui;

npm install;

npm run dist;
