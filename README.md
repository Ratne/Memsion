# Memsion
## _Member platform made for infusionsoft_

Memsion is an open source member platform based on infusionsoft user tag where the user can access to a custom membership platform and watch their video resources

Nodejs & Vuejs-powered 

## Features

- Webhook from infusionsoft to create an user
- Admin backend to create courses and lessons

## Env Variables for backend
- PORT: nodejs local port
- URL_PIATTAFORMA: the url of the platform
- BASE_URL: the base url of nodejs
- FRONT_URL=frontend url
- CLIENTID infusionsoft client id
- CLIENTSECRET: infusionsoft client secret
- CALLBACKURL: baseurl+/auth/infusionsoft/callback
- DB_CONNECT: mongodb database
- TOKEN_SECRET= jwt token secret
- EMAIL_HOST= host for email smtp
- EMAIL_USERNAME= smtp email host
- EMAIL_PORT= port smtp host
- EMAIL_PASSWORD= password smtp host
- FROM_EMAIL= from smtp host
- PATH_LOGO= full path logo

## Env Variables for frontend
- VUE_APP_URL= nodejs backend url and port + '/api'
- VUE_APP_APIKEY= tiny.cloud free api key
- VUE_APP_LOGOBRAND= full path to logo
