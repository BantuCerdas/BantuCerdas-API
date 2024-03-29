FROM node:18
WORKDIR /src/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./
RUN npm install

COPY . .

COPY server.js ./

EXPOSE 8080

CMD node server.js