FROM python:3.6

LABEL Description="Image for simpl-blackjack-ui" Vendor="Wharton" Version="0.1.0"

ENV PYTHONUNBUFFERED 1

ENV DOCKERIZE_VERSION v0.2.0

RUN mkdir -p /root/.ssh \
    && chmod 700 /root/.ssh \
    && echo "Host *\n\tStrictHostKeyChecking no\n\n" > /root/.ssh/config

ADD keys/wharton_ll /root/.ssh/
RUN chmod 600 /root/.ssh/wharton_ll

RUN apt-get update && apt-get install -y wget \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

RUN pip install --upgrade pip

RUN mkdir /code
WORKDIR /code
ADD . /code/

ENV PYTHONPATH /code:$PYTHONPATH

RUN eval "$(ssh-agent -s)" \
    && ssh-add /root/.ssh/wharton_ll \
    && pip install -r /code/requirements.txt \
    && pip install -r /code/requirements_dev.txt

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

RUN eval "$(ssh-agent -s)" \
    && ssh-add /root/.ssh/wharton_ll \
    && npm install --progress=false \
    && npm dedupe --progress=false \
    && npm run compile --production \
    && rm -rf node_modules

ENV MODEL_SERVICE_WS ws://model:8080/ws

EXPOSE 8000
CMD python check_modelservice.py && gunicorn simpl_blackjack_ui.wsgi -b 0.0.0.0:8000
