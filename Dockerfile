FROM node:alpine as build

COPY package.json package.json
RUN npm install
COPY . .
RUN npm build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html

EXPOSE 3333
CMD ["nginx", "-g", "daemon off;"]
