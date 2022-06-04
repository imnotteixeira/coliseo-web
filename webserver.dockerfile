FROM node:14.18.3-alpine as build

WORKDIR /usr/src/app
COPY package.json package-lock.json tsconfig.json webserver.webpack.config.js assets.webpack.config.js ./

ARG PORT

ENV PORT=${PORT}

# Because colors break logs
ENV NPM_CONFIG_COLOR=false

# Production or not doesn't really matter as this image will not be used other than for building
RUN npm ci

# Copy env files
COPY .env* ./

# Necessary files for building the app
COPY src/ src/

# Building the image for development, and run the server
FROM build as image-dev
RUN npm run server:build-dev

CMD ["npm", "run", "server:start"]

FROM build as image-prod
RUN npm run server:build

# Start the server
CMD ["npm", "run", "server:start"]