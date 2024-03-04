FROM node:21-alpine

ENV DB_URI=mongodb://mymongo:27017/test
ENV PORT=8081

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["node", "./dist/index.js"]