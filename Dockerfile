FROM node:20 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY index.ts ./
RUN npm run build

FROM base AS development
EXPOSE 1337
ENV PORT=1337
CMD ["npm", "run", "develop"]

FROM base AS production
RUN npm install --omit=dev

EXPOSE 1337
ENV PORT=1337

CMD ["npm", "run", "start"]