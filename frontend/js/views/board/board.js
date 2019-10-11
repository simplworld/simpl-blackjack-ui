import React from 'react';
import PropTypes from 'prop-types';
import { simpl } from 'simpl-react/lib/decorators/simpl';

import GameContainer from '../game/game-container';
import ConnectionStatus from '../../components/connection-status/connection-status';


const BoardView = (props) => {
  const { user } = props;

  if (user) {
    const runs = user.runs.map(id => `model:model.run.${id}`);
    const runusers = user.runusers.map(id => `model:model.runuser.${id}`);
    const worlds = user.worlds.map(id => `model:model.world.${id}`);
    const topics = (user.leader) ? runs : runusers.concat(worlds);

    const SimplComponent = simpl({
      authid: user.auth_id,
      password: 'nopassword',
      url: `${user.modelservice_ws}`,
      progressComponent: ConnectionStatus,
      root_topic: user.root_topic,
      topics: () => topics,
      loadAllScenarios: user.leader
    })(GameContainer);

    return (
      <SimplComponent />
    );
  }

  return (
    <div>Not initialized yet,</div>
  );
};

BoardView.propTypes = {
  user: PropTypes.shape()
};

BoardView.defaultProps = {
  user: null
};

export default BoardView;
