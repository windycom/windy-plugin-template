#!/bin/bash

source .secret-api-key.sh

NAME=example
SHA=$(git rev-parse --short HEAD)
OWNER=windycom

DIR=dist/example05

cd ./$DIR
echo "Creating plugin archive..."
echo "{\"repositoryName\": \"https://github.com/windycom/windy-plugin-template\", \"commitSha\": \"${SHA}\", \"repositoryOwner\": \"${OWNER}\"}" > ./plugin-info.json
jq -s '.[0] * .[1]' ./plugin.json ./plugin-info.json > ./plugin2.json
rm ./plugin.json && mv ./plugin2.json ./plugin.json
tar cf ./plugin.tar --exclude='./plugin.tar' .
echo "Publishing plugin..."
# curl -s --fail-with-body -XPOST 'https://api.windy.com/api/windy-plugins/v1.0/upload' -H "x-windy-api-key: ${WINDY_API_KEY}" -F "plugin_archive=@./plugin.tar"
rm ./plugin.tar