FROM node:12-alpine as builder

WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

COPY . ./

RUN npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]