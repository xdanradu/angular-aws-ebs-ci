FROM node:12.7-alpine AS build
WORKDIR /app
# copy package.json into current folder
COPY package.json ./
RUN npm install
# copy source code from current dir to the image WORKDIR
COPY . .
RUN npm run build
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/angular-demo /usr/share/nginx/html
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
EXPOSE 80
CMD ["/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf"]