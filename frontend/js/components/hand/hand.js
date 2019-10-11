import React from 'react';
import PropTypes from 'prop-types';
import {
  Transition,
  TransitionGroup,
} from 'react-transition-group';
import classnames from 'classnames';
import { AnimateOnChange } from 'react-animation';


import Card from '../card/card';

import styles from './hand.scss';


const Hand = (props) => {
  const {
    cards, score, isPlayer
  } = props;

  let username = 'Dealer';
  if (isPlayer) {
    username = 'You'; // username = runuser.email
  }

  return (
    <div className={classnames(
      styles.container, {
        [styles.playerHand]: isPlayer,
      }
    )}
    >
      <div className={styles.username}>
        {username}
      </div>
      <div className={styles.score}>
        <div className={styles.scoreBaddge}>
          <AnimateOnChange
            animationIn="bounceIn"
            animationOut="bounceOut"
          >
            {score}
          </AnimateOnChange>
        </div>
      </div>
      <div className={styles.cards}>
        <TransitionGroup component={null}>
          {cards.map((card, i) => (
            <Transition
              key={i}
              timeout={800}
              appear
            >
              {state => (
                <Card
                  key={card.rank + card.suit}
                  rank={card.rank}
                  suit={card.suit}
                  faceDown={card.rank === 'blank'}
                  transitionState={state}
                />
              )}
            </Transition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

Hand.propTypes = {
  isPlayer: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.shape).isRequired,
  score: PropTypes.number.isRequired,
};

Hand.defaultProps = {
  isPlayer: false
};

export default Hand;
