import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import PlayerResultRowContainer from '../containers/PlayerResultRowContainer'

class LeaderHome extends React.Component {

  render() {
    const name = this.props.runuser.first_name + ' ' + this.props.runuser.last_name;
    const playerRows = this.props.players.map(
      (p) => <PlayerResultRowContainer key={p.id} runuser={p}/>
    );
    return (
      <div>
        <div>
          <h1>Hello {name}</h1>
        </div>
        <div>
          <table>
            <thead>
            <tr>
              <th width="30%"> Player</th>
              <th width="30%"> Periods Played</th>
              <th width="30%"> Total</th>
            </tr>
            </thead>
            <tbody>
            {playerRows}
            </tbody>
          </table>
        </div>
        <br/>
        <a href="/logout/" className="btn btn-success btn-lg">Logout</a>
      </div>
    );
  }
}

LeaderHome.propTypes = {
  runuser: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const runuser = state.simpl.current_runuser;

  const unsortedPlayers = state.simpl.runuser.filter(
    (ru) => runuser.id !== ru.id
  );
  const players = _.sortBy(unsortedPlayers, (p) => p.email);

  return {
    runuser,
    players
  };
}

const module = connect(
  mapStateToProps,
  null
)(LeaderHome);

export default module;
