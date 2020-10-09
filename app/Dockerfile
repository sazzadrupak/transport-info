FROM node:alpine

RUN npm install -g serve

ENV NODE_ENV=production

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

CMD serve -p $PORT