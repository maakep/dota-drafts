# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

WORKDIR /app

COPY / ./

CMD [ "npm", "start" ]