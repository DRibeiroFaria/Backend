FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update

RUN apt-get install -yyq ca-certificates

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm","start"]
