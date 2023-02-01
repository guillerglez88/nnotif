#!/bin/sh

helm repo add bitnami https://charts.bitnami.com/bitnami

helm dependency update .

helm upgrade \
--install \
--atomic \
--debug \
--set global.postgresql.auth.postgresPassword="postgres" \
--set auth.enablePostgresUser=true \
--set global.postgresql.auth.password="postgres" \
--set global.postgresql.auth.database="nnotif" \
--set nnotif-dynarest.env.db="postgres://postgres:postgres@prod-postgresql:5432/nnotif" \
prod .