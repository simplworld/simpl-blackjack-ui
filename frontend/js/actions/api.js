import isFunction from 'lodash/isFunction';
import Cookies from 'js-cookie';
import { RSAA } from 'redux-api-middleware';
import {
  pendingTask, // The action key for modifying loading state
  begin, // The action value if a "long" running task begun
  end, // The action value if a "long" running task ended
} from 'react-redux-spinner';

export const API_URL = '';

export function createApiAction(namespace, data) {
  const requestActionType = {
    type: `${namespace}_REQUEST`,
    meta: { [pendingTask]: begin },
  };
  const successActionType = {
    type: `${namespace}_SUCCESS`,
    meta: { [pendingTask]: end },
  };
  const failureActionType = {
    type: `${namespace}_FAILURE`,
    meta: { [pendingTask]: end },
  };

  const actionCreator = (...args) => {
    let payload;
    if (isFunction(data)) {
      payload = data(...args);
    } else {
      payload = data;
    }

    const { headers, ...rest } = payload;
    const apiHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      ...headers,
    };

    if (!apiHeaders['Content-Type']) {
      delete apiHeaders['Content-Type'];
    }

    return {
      [RSAA]: {
        method: 'GET',
        headers: apiHeaders,
        credentials: 'same-origin',
        types: [requestActionType, successActionType, failureActionType],
        ...rest,
      }
    };
  };
  actionCreator.REQUEST = requestActionType.type;
  actionCreator.SUCCESS = successActionType.type;
  actionCreator.FAILURE = failureActionType.type;
  return actionCreator;
}

export function formatFormikErrors(errors) {
  const formattedErrors = Object.assign(
    {},
    errors,
  );

  formattedErrors.nonFieldErrors = formattedErrors.non_field_errors;
  return formattedErrors;
}

export function formikApiAction(actionCreator) {
  return (...args) => (dispatch) => {
    const { setSubmitting, setErrors } = args[1];

    const x = () =>
      new Promise((resolve, reject) => {
        dispatch(actionCreator(...args)).then((response) => {
          if (response.error) {
            const formattedErrors = formatFormikErrors(response.payload.response);
            setErrors(formattedErrors);
            setSubmitting(false);
            reject(response);
          } else {
            // resolve CALL_API as normal
            resolve(response);
          }
        });
      });
    return dispatch(x);
  };
}
