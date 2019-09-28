import React from 'react';
import PropTypes from 'prop-types';
import {
  CSSTransition,
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
              <CSSTransition
                key={i}
                classNames="card"
                timeout={1300}
              >
                <Card
                  key={i}
                  rank={card.rank}
                  suit={card.suit}
                  faceDown={card.rank === null}
                />
              </CSSTransition>
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
