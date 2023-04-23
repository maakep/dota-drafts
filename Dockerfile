FROM node:19-alpine3.16 AS builder
WORKDIR /app
COPY / ./
RUN npm run full-build

FROM builder 
CMD ["npm", "start"]