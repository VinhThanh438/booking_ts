FROM node:18.18.0-alpine

WORKDIR /app

COPY package*.json .

RUN yarn install 

COPY dist /src

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]

EXPOSE 3000

CMD [ "start" ]