FROM node:10

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Crate app directory
WORKDIR /usr/src/app

COPY . .

# Install app dependencies
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]