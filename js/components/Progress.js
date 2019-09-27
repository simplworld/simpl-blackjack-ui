import React from 'react';
import PropTypes from 'prop-types';

import {Alert} from 'react-bootstrap'

import {CONNECTION_STATUS} from 'simpl-react/lib/constants'


function Connecting(props) {
  let content;
  if (props.connectionStatus === CONNECTION_STATUS.CONNECTING) {
    content = (
      <p><i className="fa fa-cog fa-spin" aria-hidden="true"></i> Connecting…</p>
    );
  } else if (props.connectionStatus === CONNECTION_STATUS.CONNECTED) {
    content = (
      <p><i className="fa fa-refresh fa-spin" aria-hidden="true"></i> Loading data…</p>
    );
  } else if (props.connectionStatus === CONNECTION_STATUS.OFFLINE) {
    content = (
      <p><i className="fa fa-cog fa-spin" aria-hidden="true"></i> Connection lost.
        If the problem persists, please contact the administrator..</p>
    );
  }
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <Alert bsStyle="info">
          {content}
        </Alert>
      </div>
    </div>
  );
}

Connecting.propTypes = {
  connectionStatus: PropTypes.string.isRequired,
};

export default Connecting;

