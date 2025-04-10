FROM node:alpine as build

COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --chnod=765 --from=build /dist /usr/share/nginx/html
EXPOSE 3333
CMD [ "nginx", "-g", "deamon off" ]