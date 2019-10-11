import { createAction } from 'redux-actions';

import AutobahnReact from 'simpl-react/lib/autobahn';

export const submitDecision = createAction('SUBMIT_DECISION', (period, action, ...args) =>
  AutobahnReact.publish(`model:model.period.${period.id}.submit_decision`, [action])
);

export const startNewGame = createAction('START_NEW_GAME', (period, ...args) => {
  AutobahnReact.publish(`model:model.period.${period.id}.submit_decision`, 'new');
  AutobahnReact.publish(`model:model.period.${period.id}.submit_decision`, 'deal');
});
