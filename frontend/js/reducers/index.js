import { simplReducers } from 'simpl-react/lib/reducers/combined';
import { configurablePendingTasksReducer } from 'react-redux-spinner';

import auth from './auth';
import ui from './ui';


const pendingTasksReducer = configurablePendingTasksReducer({ actionKeyPath: ['meta'] });

const reducers = simplReducers({
  pendingTasks: pendingTasksReducer,
  auth,
  ui,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER_SUCCESS') {
    // setting state to undefined like dan proposed here  https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
    // will cause an issue with the pendingTasks state.
    // this should be not undefined. so for now I'm manually resetting the states
    state.auth = undefined;
    return reducers(state, action);
  }

  return reducers(state, action);
};

export default rootReducer;
