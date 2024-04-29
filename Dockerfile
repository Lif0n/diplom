FROM node:21-alpine as builder

WORKDIR /app
COPY . .

RUN npm install --no-cached
ENV NODE_ENV production
RUN npm run build


FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./jenkins/nginx/default.conf /etc/nginx/conf.d/default.conf
ENV NODE_ENV production
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]


