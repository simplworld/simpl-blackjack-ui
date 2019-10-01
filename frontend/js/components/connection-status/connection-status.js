import React from 'react';
import PropTypes from 'prop-types';

import {CONNECTION_STATUS} from 'simpl-react/lib/constants'


function ConnectionStatus(props) {
  let content;
  if (props.connectionStatus === CONNECTION_STATUS.CONNECTING) {
    content = (
      <p>Connecting…</p>
    );
  } else if (props.connectionStatus === CONNECTION_STATUS.CONNECTED) {
    content = (
      <p>Loading data…</p>
    );
  } else if (props.connectionStatus === CONNECTION_STATUS.OFFLINE) {
    content = (
      <p> Connection lost.
        If the problem persists, please contact the administrator..</p>
    );
  }
  return (
    <div>
      {content}
    </div>
  );
}

ConnectionStatus.propTypes = {
  connectionStatus: PropTypes.string.isRequired,
};

export default ConnectionStatus;

