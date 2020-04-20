FROM node:12.16.2

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=production

RUN npm install && npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
