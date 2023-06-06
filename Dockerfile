# cria imagem node-18 ecomm app

FROM node:18
WORKDIR /app-ecomm
COPY . .
RUN npm install
ENTRYPOINT npm start