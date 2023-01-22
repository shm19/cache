FROM node:19-alpine
WORKDIR /usr/app
COPY tsconfig.json ./
COPY package.json ./
COPY src ./src
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npm","run","start:prod"]