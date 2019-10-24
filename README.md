# simpl-blackjack-ui - example blackjack game.

This repo has a docker-compose setup which includes Python and NodeJS.  To get
started run:

```shell
$ docker-compose up
```
## Development

After making any changes to the Javascript you will need to, from your host OS,
run:

```shell
$ make compile
```

If you don't have `make` installed on your system you can run the command more
manually with:

```shell
$ docker-compose exec ui NODE_ENV=production npm run compile
```


## Debugging

If you need some serious debugging help, in `/core/templates/frontend/home.html` set:

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

