FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ["npm", "run", "build"]