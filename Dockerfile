FROM node:21-alpine as builder

WORKDIR /app
COPY . .

RUN npm install --no-cached
ENV NODE_ENV production
RUN npm run build


FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
ENV NODE_ENV production
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]


