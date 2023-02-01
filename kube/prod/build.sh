#!/bin/sh

helm dependency update .

rm -rf ./dist

helm template \
--debug \
--output-dir ./dist \
--set nnotif-dynarest.env.db="<test-cnx-str>" \
prod .

helm template \
--debug prod \
. > ./dist/prod.yaml

echo 'wrote ./dist/prod.yaml'