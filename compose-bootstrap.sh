#!/bin/sh
npm install 
NODE_ENV=production npm run compile
python manage.py migrate --no-input
python manage.py collectstatic --no-input
python manage.py runserver 0.0.0.0:8000
