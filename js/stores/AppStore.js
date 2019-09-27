/* eslint global-require: "off" */
import {finalCreateStoreFactory} from 'simpl-react/lib/stores';

import rootReducer from '../reducers/combined/appReducers';


export default function configureStore(initialState, node_env) {
  const finalCreateStore = finalCreateStoreFactory(node_env || process.env.NODE_ENV);
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/combined/appReducers', () => {
      const nextReducer = require('../reducers/combined/appReducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
