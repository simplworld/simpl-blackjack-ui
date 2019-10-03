import React from 'react';
import PropTypes from 'prop-types';
import {simpl} from 'simpl-react/lib/decorators/simpl';

import Hand from '../../components/hand/hand';
import ConnectionStatus from '../../components/connection-status/connection-status';
import store from '../../store/store';

import styles from './game.scss';

// const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
// const suits = ['H', 'S', 'C', 'D'];

const dealerCards = [
  {
    rank: '9',
    suit: 'H'
  },
  {
    rank: '10',
    suit: 'S'
  },
  {
    rank: 'A',
    suit: 'S'
  },
  {
    rank: null,
    suit: 'D'
  },
];

const playerCards = [
  {
    rank: '4',
    suit: 'S'
  },
  {
    rank: 'A',
    suit: 'D'
  },
  {
    rank: 'J',
    suit: 'D'
  },
  {
    rank: '2',
    suit: 'C'
  },
];

class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      widht: 0,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Hand cards={dealerCards} />
        <Hand cards={playerCards} isPlayer />
      </React.Fragment>
    );
  }
}

GameView.propTypes = {
};

const user =store.getState().auth.user
console.log(user)

// if (user) {
//   const runs = user.runs.map((id) => `model:model.run.${id}`);
//   const runusers = user.runusers.map((id) => `model:model.runuser.${id}`);
//   const worlds = user.worlds.map((id) => `model:model.world.${id}`);
//   const topics = (user.leader) ? runs : runusers.concat(worlds);
//   console.log("topics: ", topics);


//   export default simpl({
//     authid: user.auth_id,
//     password: 'nopassword',
//     url: `${user.modelservice_ws}`,
//     progressComponent: ConnectionStatus,
//     root_topic: user.root_topic,
//     topics: () => topics,
//     loadAllScenarios: user.leader
//   })(GameView);
// }

export default GameView

