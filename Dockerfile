FROM node:latest as build-step
WORKDIR /app-f
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD npm run start-docker

