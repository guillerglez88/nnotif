FROM node:lts-alpine AS base

FROM base AS build
WORKDIR /usr/src/app
COPY ["package*.json", ".eslintrc.json", ".eslintignore", ".prettierrc.json", "./"]
RUN npm ci
COPY . .
RUN npm run build
RUN npm run lint
RUN npm run test

FROM base AS prod
ENV NODE_ENV=production
WORKDIR /usr/share/app
COPY ["package*.json", "./"]
RUN npm ci --only=production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start"]