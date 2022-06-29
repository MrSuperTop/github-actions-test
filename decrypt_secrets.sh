#!/bin/sh

cd src/config

gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPTION_KEY" \
--output ./dev.json dev.json.gpg
