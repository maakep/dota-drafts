FROM node:19-alpine3.16 AS builder
WORKDIR /app
COPY / ./
CMD [ "npm", "run", "full-build" ]

FROM builder 
CMD ["npm", "start"]

