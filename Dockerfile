# Generated Dockerfile
FROM node:16-alpine

LABEL maintainer="akash"

WORKDIR /src

COPY ./src/ /src/

RUN npm install

COPY . /src/

EXPOSE 8080

CMD ["npm run"]