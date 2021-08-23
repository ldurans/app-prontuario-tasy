FROM node:12-alpine

ENV _APP=/opt/services/front/src
RUN apk --update add openssh-client git

RUN npm install -g @vue/cli @quasar/cli
RUN mkdir -p $_APP

COPY package.json $_APP
WORKDIR $_APP

RUN npm install node-sass --save

RUN npm install

CMD /bin/sh

