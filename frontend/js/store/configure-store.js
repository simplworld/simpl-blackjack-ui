import {finalCreateStoreFactory} from 'simpl-react/lib/stores';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';


export default function configureStore(initialState, middleware) {
  const finalCreateStore = finalCreateStoreFactory(process.env.NODE_ENV);
    const store = finalCreateStore(
      rootReducer,
      initialState,
      applyMiddleware(...middleware),
    );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
