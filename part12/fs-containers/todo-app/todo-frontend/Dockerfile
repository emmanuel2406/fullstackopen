FROM node:24 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=/api

RUN npm ci

RUN npm run build

FROM node:24 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test && echo "tests passed" > /tests-passed

FROM nginx:1.29-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY --from=test-stage /tests-passed /usr/share/nginx/html/.tests-passed