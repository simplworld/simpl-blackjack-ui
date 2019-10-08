import React from 'react';
import PropTypes from 'prop-types';
import {
  Transition,
  TransitionGroup,
} from 'react-transition-group';
import classnames from 'classnames';

import Card from '../card/card';

import styles from './hand.scss';


const Hand = (props) => {
  const { cards, score, isPlayer, runuser } = props;

  let username = 'Dealer';
  if (isPlayer) {
    username = runuser.email
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
          {score}
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
};

export default Hand;
