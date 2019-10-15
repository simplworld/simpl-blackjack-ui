# simpl-blackjack-ui - example blackjack game.

## Python Setup (assumes Python == 3.6, simpl-games-api and blackjack-model servers running)

```shell
$ create a virtual enviroment and activate it
$ git clone git@github.com:simplworld/simpl-blackjack-ui.git
$ cd simpl-blackjack-ui
$ pip install -r requirements.txt
$ python manage.py migrate
```
## Run front end

```shell
$ ./manage.py runserver 0.0.0.0:8000
```

If you need some serious debugging help, in {{cookiecutter.app_slug}}/templates/{{cookiecutter.app_slug}}/home.html set:

```js
var AUTOBAHN_DEBUG = true;
```

Which will turn on verbose debugging of the Autobahn/Websockets to help debug interactions between the browser and model service backend.
If you do this, do NOT commit this change.

Install node_modules and run webpack to compile JS and SCSS

```shell
$ npm install
$ npm run dev
```

```

## Debugging WAMP subscriptions and registrations

Point your browser to http://localhost:8080/monitor and open your javascript console

Copyright © 2018 The Wharton School,  The University of Pennsylvania 

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

