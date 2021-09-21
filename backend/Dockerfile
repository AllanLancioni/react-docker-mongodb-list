FROM node:latest

COPY package*.json ./

RUN npm i
RUN tsc

COPY . .

CMD ["npm", "start"]