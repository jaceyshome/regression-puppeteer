### BASE
FROM node:9.3.0-alpine AS base
LABEL maintainer "Jake Wang <jaceyshome@gmail.com>"
# Installs latest Chromium (68) package.
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      nss@edge \
      freetype@edge \
      harfbuzz@edge

# Set the working directory
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# Puppeteer v1.4.0 works with Chromium 68.
RUN yarn add puppeteer@1.4.0
# Set working directory
WORKDIR /home/node/app
# Copy project specification and dependencies lock files
COPY package.json yarn.lock ./



### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies (only production)
RUN yarn --production
# Copy production dependencies aside
RUN cp -R node_modules /tmp/node_modules
# Install ALL Node.js dependencies
RUN yarn



### RELEASE
FROM base AS release
# Copy production dependencies
COPY --from=dependencies /tmp/node_modules ./node_modules
# Copy app sources
COPY . .

# Allow the datastore directory to be mounted
RUN mkdir output
ONBUILD VOLUME ["/home/node/app/output"]
# Allow the logs directory to be mounted
ONBUILD VOLUME ["/home/node/app/logs"]
# Create public folder as server root path
RUN mkdir public
# Create tmp folder for keeping temporary data
RUN mkdir tmp
# Make the output folder is accessable for the public
RUN ln -s /home/node/app/output /home/node/app/public/output
# set docker image flag
ENV IS_DOCKER_IMAGE true
# In development environment
ENV NODE_ENV production
# Expose application port, production port
EXPOSE 7080
# Run
CMD ["npm", "run-script", "server"]


