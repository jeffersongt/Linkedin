FROM node:17

WORKDIR /usr/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./

RUN npm install --silent
RUN npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install state-pool

COPY . ./

EXPOSE $CLIENT_PORT
CMD ["npm", "start"]