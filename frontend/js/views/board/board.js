import React from 'react';
import PropTypes from 'prop-types';
import {simpl} from 'simpl-react/lib/decorators/simpl';

import GameView from '../game/game';
import ConnectionStatus from '../../components/connection-status/connection-status';

import styles from './board.scss';

class BoardView extends React.Component {

  render() {
    const { user } = this.props;
    console.log('user', user);

    if (user) {
      const runs = user.runs.map((id) => `model:model.run.${id}`);
      const runusers = user.runusers.map((id) => `model:model.runuser.${id}`);
      const worlds = user.worlds.map((id) => `model:model.world.${id}`);
      const topics = (user.leader) ? runs : runusers.concat(worlds);

      const SimplComponent = simpl({
        authid: user.auth_id,
        password: 'nopassword',
        url: `${user.modelservice_ws}`,
        progressComponent: ConnectionStatus,
        root_topic: user.root_topic,
        topics: () => topics,
        loadAllScenarios: user.leader
      })(GameView);

      return (
        <SimplComponent />
      );

    } else {
      return (
        <div>Bla!</div>
      );
    }
  }
}

BoardView.propTypes = {
};

export default BoardView;
