FROM node:14.17.1

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 80
RUN chmod +x /app/entrypoint.sh
RUN apt update && apt install nginx -y && useradd -s /bin/false nginx
COPY nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["/app/entrypoint.sh"]

