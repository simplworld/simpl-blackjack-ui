import { createAction } from 'redux-actions';

import AutobahnReact from 'simpl-react/lib/autobahn';

export const submitDecision = createAction('SUBMIT_DECISION', (scenarioId, action, ...args) =>
  AutobahnReact.call(`model:model.scenario.${scenarioId}.submit_decision`, [action])
);


export const dealNewGame = createAction('DEAL_NEW_GAME', (scenarioId, ...args) =>
  AutobahnReact.call(`model:model.scenario.${scenarioId}.deal_new_game`)
);

export const startDealing = createAction('DEAL_START');
export const stopDealing = createAction('DEAL_START');