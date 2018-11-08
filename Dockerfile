# importing a node library for base image
FROM node:7.6-alpine

RUN mkdir -p /src/player

WORKDIR /src/player

COPY . /src/player

RUN yarn install

RUN yarn global add nodemon

EXPOSE 8080

CMD ["npm", "run", "start:docker"]
