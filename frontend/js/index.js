import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
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

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept(['./app'], () => {
    // eslint-disable-next-line global-require
    const nextRootLayout = require('./app');
    render(nextRootLayout);
  });
}
