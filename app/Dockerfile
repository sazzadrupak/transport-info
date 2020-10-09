FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build