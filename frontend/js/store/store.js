import { createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

import configureStore from './configure-store';


const logger = createLogger();

const middleware = [
  thunk,
  apiMiddleware,
  logger,
];

const store = configureStore({}, middleware);

export default store;
