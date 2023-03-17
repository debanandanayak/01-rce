FROM node:alpine

COPY package.json .
RUN apk add build-base
RUN apk add --update python3 py3-pip
RUN apk add openjdk11
RUN npm install

COPY . .
CMD [ "npm", "run", "start" ]


