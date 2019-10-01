import React from 'react';
import PropTypes from 'prop-types';
import {
  Transition,
  TransitionGroup,
} from 'react-transition-group';

import Card from '../card/card';

import styles from './hand.scss';


class Hand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDealing: false,
    };
  }

  render() {
    const { cards } = this.props;

    return (
      <div className={styles.hand}>
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
                  key={i}
                  rank={card.rank}
                  suit={card.suit}
                  faceDown={card.rank === null}
                  transitionState={state}
                />
              )}
              </Transition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

Hand.propTypes = {
};

export default Hand;
