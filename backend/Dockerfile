FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Dev режим, ts-node-dev будет следить за изменениями
CMD ["npm", "run", "dev"]
