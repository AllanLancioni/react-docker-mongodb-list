FROM node:latest

WORKDIR /Desktop/dev

COPY package*.json ./

RUN npm i


COPY . .

CMD ["npm", "start"]