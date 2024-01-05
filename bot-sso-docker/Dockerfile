FROM node:18.18.0 as base
ENV PORT=80
EXPOSE 80
WORKDIR /usr/src/app

FROM base as development
ENV NODE_ENV=development
COPY ["package*.json", "./"]
RUN npm install && mv node_modules ../
COPY . .
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "dev"]

FROM development as build
RUN npm run build

FROM base as production
ENV NODE_ENV=production
COPY --from=build /usr/src/app/lib ./lib
COPY --from=build /usr/src/node_modules ./node_modules
CMD ["node", "lib/index.js"]