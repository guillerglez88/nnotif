FROM node:lts-alpine AS base

FROM base AS build
WORKDIR /usr/src/app
COPY ["package*.json", ".eslintrc.json", ".eslintignore", ".prettierrc.json", "./"]
RUN npm ci
COPY . .
RUN npm run build
RUN npm run lint

