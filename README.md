# Memsion
## Member platform made for Keap Max Classic / Infusionsoft

Memsion is an open source member platform based on Keap max classic user tag where the user can access to a custom membership platform and watch their video resources

Nodejs & Vue3-powered 

## Features

- Webhook from infusionsoft to create an user
- Admin backend to create courses and lessons
- Autologin from infusionsoft email
- Import user from csv

## Local development with Docker Compose

This project is using docker-compose to run the local development. Before running `docker compose up` command, you need
to create `.env` files in the root directory with the following variables:

### Env Variables for backend `.env.backend`

| Variable | Description | Example value |
| --- | --- | --- |
| PORT | nodejs local port | `2000` |
| URL_PIATTAFORMA | the url of the platform | `http://localhost:8080` |
| BASE_URL | the base url of nodejs backend | `http://localhost:2000` |
| FRONT_URL | frontend url | `http://localhost:8080/` |
| CLIENTID | infusionsoft client id | string |
| CLIENTSECRET | infusionsoft client secret | string |
| CALLBACKURL | baseurl+/auth/infusionsoft/callback | `http://localhost:2000/auth/infusionsoft/callback` |
| DB_CONNECT | mongodb database | `mongodb://dev:password@mongodb:27017/memsion?retryWrites=true&authSource=admin` |
| TOKEN_SECRET | jwt token secret | string |
| EMAIL_HOST | host for email smtp | `smtp.example.com` |
| EMAIL_USERNAME | smtp email host | `postmaster@example.com` |
| EMAIL_PORT | port smtp host | `587` |
| EMAIL_PASSWORD | password smtp host | string |
| FROM_EMAIL | from smtp host | `postmaster@example.com` |
| PATH_LOGO | full path logo | `logo.png` |

### Env Variables for frontend `.env.frontend`

| Variable | Description | Example value |
| --- | --- | --- |
| VUE_APP_URL | nodejs backend url and port + '/api' | `http://localhost:2000/api` |
| VUE_APP_APIKEY | tiny.cloud free api key | string |
| VUE_APP_LOGOBRAND | full path logo | `logo.png` |

### Env Variables for mongodb `.env.mongodb`

| Variable | Description | Example value |
| --- | --- | --- |
| MONGO_INITDB_ROOT_USERNAME | mongodb initdb root username | `demo` |
| MONGO_INITDB_ROOT_PASSWORD | mongodb initdb root password | `demo123` |
| MONGO_INITDB_DATABASE | mongodb database | `demo` |

### Platform main admin `mongo-init.js`

To automatically create the platform main admin user, you need to create a file `mongo-init.js` in the root directory starting from `mongo-init.js.example`

### Sponsor
Sentry.io

###WIP
- Admin access 
- Keap auth inside config