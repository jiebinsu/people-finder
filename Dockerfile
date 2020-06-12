FROM node:alpine

RUN mkdir -p /usr/people-finder && chown -R node:node /usr/people-finder

WORKDIR /usr/people-finder

COPY package.json package-lock.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

EXPOSE 3000