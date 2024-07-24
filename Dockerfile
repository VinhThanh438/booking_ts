FROM node:latest-alpine as builder

COPY ./src ./src

RUN 

EXPOSE 3000

CMD [ "npm", "run", "docker:start" ]