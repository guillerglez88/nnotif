#!/bin/sh

helm dependency update .

helm upgrade \
--install \
--atomic \
--debug \
--set nnotif-dynarest.env.db="<test-cnx-str>" \
prod .