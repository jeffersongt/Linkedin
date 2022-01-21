FROM node:17

WORKDIR /usr/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./

RUN npm install --no-optional
RUN npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

COPY . ./

EXPOSE $CLIENT_PORT
CMD ["npm", "start"]