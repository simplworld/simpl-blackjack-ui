import React from 'react';
import PropTypes from 'prop-types';

function PlayerResultRow(props) {
  return (
    <tr>
      <td>{props.runuser.email}</td>
      <td>{props.periodsPlayed}</td>
      <td>{props.total}</td>
    </tr>
  );
}

PlayerResultRow.propTypes = {
  runuser: PropTypes.object.isRequired,
  periodsPlayed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default PlayerResultRow;
