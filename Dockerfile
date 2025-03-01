FROM node:18.18.0-alpine as base
WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build


FROM base as api
WORKDIR /app
EXPOSE 3000
CMD [ "npm", "run", "start" ]

FROM base as worker
WORKDIR  /app
CMD ["npm", "run", "start-worker"]



