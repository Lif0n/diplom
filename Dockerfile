FROM node:21-alpine as builder

WORKDIR /react-app
COPY . .

RUN npm install --no-cached
RUN npm run build


ENV NODE_ENV production
EXPOSE 8080
CMD [ "npm", "prod"]


