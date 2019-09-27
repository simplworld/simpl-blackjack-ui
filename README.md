# simpl-calc-ui - example single-player simulation frontend service.

## Python Setup (assumes Python >= 3.6, simpl-games-api and simpl-calc-model servers running)

```shell
$ git clone git@github.com:simplworld/simpl-calc-ui.git
$ cd simpl-calc-ui
$ mkvirtualenv simpl-calc-ui
$ add2virtualenv .

$ pip install -r requirements.txt
$ ./manage.py migrate
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

Update node_modules and run Gulp to compile JS

```shell
$ cd to simpl-calc-ui directory
$ npm install
$ npm start
```

## Run javascript unit tests (run outside Vagrant)

We use jest and enzyme for unit testing (see http://redux.js.org/docs/recipes/WritingTests.html)

```shell
$ npm test
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

