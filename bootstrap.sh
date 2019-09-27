#!/bin/sh

python manage.py migrate --no-input

python check_modelservice.py

python manage.py runserver 0.0.0.0:$PORT
