FROM node:18.18.0-alpine as base
WORKDIR /app
ENV PORT=3000
ENV LOG_LEVEL="debug"
COPY package*.json ./
RUN yarn install
COPY . .

FROM base as api
WORKDIR /app
EXPOSE 3000
CMD [ "npm", "run", "docker:start" ]

FROM base as worker
WORKDIR  /app
CMD ["npm", "run", "docker:start-worker"]



