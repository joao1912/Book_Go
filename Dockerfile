FROM alpine:latest as builder

RUN apk add --no-cache bash nano

FROM node:latest

RUN npm install -g npm && \
    npm install -g pm2 && \
    mkdir app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm install @prisma/client@latest

#RUN npx prisma generate

EXPOSE 80

CMD ["pm2-runtime", "start", "./pm2/pm2-development.json"]