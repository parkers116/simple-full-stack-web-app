FROM node:20-alpine3.18
WORKDIR /api
COPY . .
RUN npm install
RUN npm run build
CMD [ "node", "./dist/index.js" ]