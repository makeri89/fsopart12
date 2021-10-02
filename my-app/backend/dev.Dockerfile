FROM node:16 AS base

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

FROM base AS test
COPY . .
RUN npm test

FROM test AS final
COPY . .
CMD ["npm", "run", "dev"]