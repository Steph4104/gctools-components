FROM node:9.3
RUN mkdir /app && \
  apt-get update && \
  apt-get install -f apt-transport-https && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && \
  apt-get -f install yarn
COPY package.json /app/
WORKDIR /app
RUN yarn
ADD . /app
RUN yarn build


FROM alpine:3.7
LABEL maintainer="luc.belliveau@nrc-cnrc.gc.ca"
RUN mkdir /app && apk --no-cache add nodejs nodejs-npm && npm install -g serve
COPY --from=0 /app/build/ /app/
WORKDIR /app
EXPOSE 5000
CMD serve -s .
