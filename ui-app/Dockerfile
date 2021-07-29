FROM node:13-alpine as build
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
