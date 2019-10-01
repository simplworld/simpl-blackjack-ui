import { simplReducers } from 'simpl-react/lib/reducers/combined';
import { configurablePendingTasksReducer } from 'react-redux-spinner';

import ui from './ui';


const pendingTasksReducer = configurablePendingTasksReducer({ actionKeyPath: ['meta'] });

const reducers = simplReducers({
  pendingTasks: pendingTasksReducer,
  ui,
});

export default reducers;
