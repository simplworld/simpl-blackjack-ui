import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { createLogger } from 'redux-logger';

import history from './common/history';
import App from './app';
import configureStore from './configure-store';

import '../scss/main.scss';

require('es6-promise').polyfill();
require('isomorphic-fetch');


const logger = createLogger();

const middleware = [
  thunk,
  apiMiddleware,
  logger,
];

const store = configureStore({}, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);


if (module.hot) {
  module.hot.accept(['./app'], () => {
    // eslint-disable-next-line global-require
    const nextRootLayout = require('./app');
    render(nextRootLayout);
  });
}
