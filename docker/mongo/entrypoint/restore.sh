#!/bin/bash

mongoimport --db $MONGO_INITDB_DATABASE --jsonArray /docker-entrypoint-initdb.d/airbnb.json
