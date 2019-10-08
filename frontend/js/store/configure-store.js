import { finalCreateStoreFactory } from 'simpl-react/lib/stores';
import { applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import { getAuthState, setAuthKey } from '../common/localstorage';

let currentAuthToken;

export default function configureStore(initialState, middleware) {
  const finalCreateStore = finalCreateStoreFactory(process.env.NODE_ENV);
  const store = finalCreateStore(
    rootReducer,
    {
      auth: getAuthState(),
      ...initialState,
    },
    applyMiddleware(...middleware),
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  store.subscribe(() => {
    const newKey = store.getState().auth.key;
    if (newKey !== currentAuthToken) {
      currentAuthToken = newKey;
      setAuthKey(newKey);
    }
  });

  return store;
}
