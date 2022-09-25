# This Dockerfile is made to be built with the context one folder above this one 
# so as to contain the coliseo (engine, dependency) folder in its reach as well

FROM node:14.18.3-alpine as build

ARG WEBSERVER_DIR
ARG PORT

WORKDIR /usr/src/app

COPY ${WEBSERVER_DIR}/package*.json ./
COPY ${WEBSERVER_DIR}/tsconfig.json ./
COPY ${WEBSERVER_DIR}/*.webpack.config.js ./

ENV PORT=${PORT}

# Because colors break logs
ENV NPM_CONFIG_COLOR=false

# Used for development sharing of dependencies
RUN npm i -g yalc

# Production or not doesn't really matter as this image will not be used other than for building
RUN npm ci

# Copy env files
COPY ${WEBSERVER_DIR}/.env* ./

# Necessary files for building the app
COPY ${WEBSERVER_DIR}/src/ src/

# Building the image for development, and run the server
FROM build as image-dev

# Yalc can only "see" the dependencies after volumes have been mounted, 
# as the dependecy is actually coming from a shared volume between this service and the dependency's (for development only)
# As such, all the building must be done only when running the image (i.e. when running CMD - which is not ideal, as it can't be cached)
CMD \
yalc add @coliseo/engine && \ 
npm run server:build-dev && \
npm run server:start

FROM build as image-prod

RUN npm run server:build

# Start the server
CMD npm run server:start
