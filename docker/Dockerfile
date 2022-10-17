FROM node:lts

WORKDIR /home/node/mobile
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 19000
CMD ["npm", "start"]