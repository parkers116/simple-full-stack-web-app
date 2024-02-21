FROM node:20-alpine3.18 as builder
WORKDIR /ui
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.25.4-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /ui/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]