FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/time-management
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm i

EXPOSE 3002

CMD [ "node", "app.js" ]