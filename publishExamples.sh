#!/bin/bash

WINDY_API_KEY=HMrEL9kNBYZURoWxWXOkPR3RLr2rBDqS

NAME=example
SHA=$(git rev-parse --short HEAD)
OWNER=windycom

DIR=dist/example05

cd $DIR
cp plugin.json package.json
echo "Creating plugin archive..."
echo "{\"repository_name\": \"${NAME}\", \"commit_sha\": \"${SHA}\", \"repository_owner\": \"${OWNER}\"}" > plugin-info.json
tar cf ./plugin.tar .
echo "Publishing plugin... ${DIR}"
curl -s --fail-with-body -XPOST 'https://api.windy.com/api/windy-plugins/v1.0/upload' -H "x-windy-api-key: ${WINDY_API_KEY}" -F "plugin_archive=@./plugin.tar"
rm ./plugin.tar