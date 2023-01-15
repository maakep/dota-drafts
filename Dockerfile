FROM node:19-alpine3.16

WORKDIR /app

COPY / ./

CMD [ "npm", "start" ]