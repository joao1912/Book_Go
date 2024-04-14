FROM node:latest as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY dist/ /usr/share/nginx/html

EXPOSE 80