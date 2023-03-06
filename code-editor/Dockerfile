FROM node:alpine
WORKDIR /usr/home/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]