FROM ghcr.io/pnpm/pnpm:11 AS build-stage
RUN pnpm runtime set node 24 -g

WORKDIR /usr/src/app

COPY . .

RUN pnpm ci

RUN pnpm run build

FROM nginx:1.29-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html