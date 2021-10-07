FROM node:16 AS base
WORKDIR /usr/src/app
COPY . .

FROM base AS test
COPY . .
ENV CI=true
RUN npm ci
RUN npm test

FROM test AS build
ENV REACT_APP_BACKEND_URL=http://todo-backend:3000
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html