import {createAction} from 'redux-actions';

import AutobahnReact from 'simpl-react/lib/autobahn';

export const submitDecision =
    createAction('SUBMIT_DECISION', (period, operand, ...args) =>
        AutobahnReact.publish(`model:model.period.${period.id}.submit_decision`, [operand])
    );

