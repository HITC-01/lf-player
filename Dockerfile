# importing a node library for base image
#FROM node:7.6-alpine
FROM node:latest

RUN mkdir -p /src/player

WORKDIR /src/player

COPY . /src/player

RUN npm install --production

RUN yarn global add nodemon

EXPOSE 3004

CMD ["npm", "run", "start:docker"]
