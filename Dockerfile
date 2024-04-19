FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 1337
ENV PORT=1337
CMD ["node", "index.js"]