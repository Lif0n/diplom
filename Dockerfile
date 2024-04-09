FROM node:21-alpine as builder
WORKDIR /react-app
COPY . .

# RUN npm install -P cross-env
# RUN npm install -P webpack
# RUN npm install -P webpack-cli

# RUN npm install
# RUN npm run build

RUN yarn install
RUN yarn build


ENV NODE_ENV production
EXPOSE 8080
CMD [ "yarn", "start"]


