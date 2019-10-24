FROM gladiatr72/just-tini:latest as tini

#FROM node:10 as builder-js

#RUN mkdir /build
#RUN mkdir /app
#WORKDIR /build

#COPY package.json /build
#COPY package-lock.json /build
#COPY .babelrc /build

#RUN npm install
#RUN npm rebuild node-sass
#RUN npm install -g webpack@3.10.0

#WORKDIR /app
#COPY . /app/
#RUN cp -pR /build/node_modules/ /code
#RUN NODE_ENV=production npm run compile


FROM revolutionsystems/python:3.6.9-wee-optimized-lto

LABEL Description="Image for simpl-blackjack-ui" Vendor="Wharton" Version="0.1.0"

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
RUN mkdir /code/staticfiles
RUN mkdir /code/staticfiles/webpack_bundles

WORKDIR /code

COPY --from=tini /tini /tini
#COPY --from=builder-js /app/bundles /code/staticfiles/webpack_bundles/

RUN pip install --upgrade pip

ADD ./requirements.txt /code/
RUN pip install -r /code/requirements.txt

# Setup NodeJS
RUN set -ex && apt-get update && apt-get -y install curl software-properties-common
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get -y install nodejs

ADD ./package.json /code/
RUN npm install

ADD . /code/

RUN NODE_ENV=production npm run compile

ENV PYTHONPATH /code:$PYTHONPATH
ENV MODEL_SERVICE_WS ws://localhost:8080/ws

EXPOSE 8000
CMD /code/bootstrap.sh
