import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './card.scss';


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderFront = () => {
    const { suit, rank } = this.props;

    return (
      <div className={styles.front}>
        <div className={styles.frontTop}>
          <div className={styles.container}>
            <span className={styles.rank}>{rank}</span>
            <span className={styles.suit}>{suit}</span>
          </div>
        </div>
        <div className={styles.frontCenter}>
          {suit}
        </div>
        <div className={styles.frontBottom}>
          <div className={styles.container}>
            <span className={styles.rank}>{rank}</span>
            <span className={styles.suit}>{suit}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { faceDown, suit, transitionState } = this.props;

    const cardClasses = classNames(
      styles.card,
      {
        [styles.faceDown]: faceDown === true,
        [styles.cardDiamonds]: suit === 'D',
        [styles.cardHearts]: suit === 'H',
        [styles.cardSpades]: suit === 'S',
        [styles.cardClubs]: suit === 'C',
        [styles.cardEntering]: transitionState === 'entering',
        [styles.cardEntered]: transitionState === 'entered',
        [styles.cardEnteringFaceDown]: transitionState === 'entering' && !faceDown,
        [styles.cardEnteredFaceDown]: transitionState === 'entered' && !faceDown,
      }
    );

    return (
      <div className={cardClasses}>
        {!faceDown && this.renderFront()}
        <div className={styles.back} />
      </div>
    );
  }
}

Card.propTypes = {
  faceDown: PropTypes.bool,
  suit: PropTypes.string.isRequired,
  rank: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

Card.defaultProps = {
  faceDown: true,
  rank: null
};

export default Card;
