
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run prebuild

RUN npm run build

EXPOSE 5003


CMD ["node", "dist/main"]
