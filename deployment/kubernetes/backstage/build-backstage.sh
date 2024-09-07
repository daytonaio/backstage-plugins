#!/bin/bash

## The script is currently not usable. The below commands need to be corrected and finalised.

# Copy latest app-config.yaml to backstage101 folder and dockerfile to packages/backend folder
# This step was already completed.

# Install backend app dependencies using yarn
yarn install --frozen-lockfile
yarn tsc

# Build backstage backend app with the latest app-config.yaml file
cd packages/backend
yarn build backend --config ../../app-config.yaml
