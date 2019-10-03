import React from 'react';
import PropTypes from 'prop-types';

import Hand from '../../components/hand/hand';
import UI from '../../components/ui/ui';

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
    console.log(this.props);
    return (
      <div className={styles.container}>
        <Hand cards={dealerCards} />
        <Hand cards={playerCards} isPlayer />
        <UI />
      </div>
    );
  }
}

GameView.propTypes = {
};

export default GameView

