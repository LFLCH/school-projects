FROM node:19 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build



FROM nginx

RUN mkdir /app

COPY --from=build-stage /app/dist/administrationfront/ /app
COPY nginx.conf /etc/nginx/nginx.conf

USER nginx