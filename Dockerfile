FROM node:lts

RUN mkdir /app && mkdir /app/logs -p && chown node: /app -R

COPY . /app
WORKDIR /app

RUN npm install --no-optional
RUN npm run build

USER node

EXPOSE $PORT

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
