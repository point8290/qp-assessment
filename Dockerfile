FROM node:18-alpine3.17

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "dev"]
