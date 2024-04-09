FROM node:21-alpine as builder

WORKDIR /app
COPY . .

RUN npm install --no-cached
RUN npm run build


FROM node:21-alpine
COPY --from=builder /app/build /usr/share/nginx/html
ENV NODE_ENV production
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]


