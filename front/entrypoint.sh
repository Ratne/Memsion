#!/usr/bin/env bash
echo $VUE_APP_URL >> .env
echo $VUE_APP_LOGOBRAND >> .env
echo $VUE_APP_APIKEY >> .env
npm run build
nginx -g 'daemon off;'