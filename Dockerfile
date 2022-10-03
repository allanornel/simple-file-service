FROM node:16

WORKDIR /usr/app/

COPY . .

EXPOSE 3000:3000

RUN npm i && npm run build

CMD ["npm", "start"]