FROM node:18-alpine

RUN apk update
RUN apk --update --no-cache add openssl1.1-compat

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY src /app/src
COPY prisma /app/prisma

RUN ls -a


RUN yarn install --frozen-lockfile
RUN yarn prisma generate
RUN yarn build

EXPOSE 80

CMD yarn start:dev
