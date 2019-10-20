FROM python:3.6

LABEL Description="Image for simpl-blackjack-ui" Vendor="Wharton" Version="0.1.0"

ENV PYTHONUNBUFFERED 1

ENV DOCKERIZE_VERSION v0.2.0

RUN apt-get update && apt-get install -y wget \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

RUN pip install --upgrade pip

RUN mkdir /code
WORKDIR /code

ADD ./requirements.txt /code/
RUN pip install -r /code/requirements.txt

ADD . /code/

ENV PYTHONPATH /code:$PYTHONPATH


#RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
#RUN apt-get install -y nodejs \
#    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*
#
#RUN npm install --progress=false \
#    && npm dedupe --progress=false \
#    && npm run compile --production \
#    && rm -rf node_modules
#
ENV MODEL_SERVICE_WS ws://localhost:8080/ws

EXPOSE 8000
CMD /code/bootstrap.sh
