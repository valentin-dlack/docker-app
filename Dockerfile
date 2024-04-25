FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx tsc

FROM node:20 AS development

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/ ./ 

EXPOSE 1337

ENV PORT=1337

CMD ["npm", "run", "start"]

FROM node:20 AS production

WORKDIR /app

COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/ ./ 

RUN rm -rf /app/node_modules/typescript
RUN rm -rf /app/package.json            
RUN rm -rf /app/package-lock.json       

EXPOSE 1337

ENV PORT=1337

CMD ["node", "./index.js"]