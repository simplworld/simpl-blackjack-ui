import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/button/button';

import styles from './rules.scss';


class Rules extends React.Component {
  handleClose = () => {
    const { showHelp, history } = this.props;
    if (showHelp) {
      showHelp(false);
    } else {
      history.goBack();
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.window}>
          <h1>
            Rules of the game
          </h1>
          <p>
            In the game of Blackjack, each player competes against the dealer.
            This demo is designed as a single-player game with no betting and no splitting.
          </p>
          <h3>
            Objective:
          </h3>
          <ul>
            <li>
              Players attempt to beat the dealer by getting a hand value as
              close to 21 as possible <b>without going over</b>.
            </li>
          </ul>
          <h3>
            Points:
          </h3>
          <ul>
            <li>
              Face cards = 10 points
            </li>
            <li>
              Any other card = its face value
            </li>
            <li>
              Aces = automatically valued at 11, unless that brings the hand over 21.  Then they are valued at 1.
            </li>
          </ul>
          <h3>
            Game Play
          </h3>
          <ul>
            <li>
              Player receives two cards, face-up
            </li>
            <li>
              Dealer receives two cards, one face-up, the other face-down
            </li>
            <li>
              Players decide whether to “stand” (no more cards) or “hit” (ask for another card)
            </li>
            <li>
              If Dealer’s hand is 16 or less, and Player’s hand is less than 21,
              the Dealer <b>must</b> take a card
            </li>
          </ul>
          <h3>
            Winner
          </h3>
          <ul>
            <li>
              The winner has a hand count closest to, or exactly 21, but not more than 21
            </li>
            <li>
              If Dealer and Player have the same score, the game is tied.
            </li>
          </ul>
          <div className={styles.actions}>
            <Button
              label="Close"
              onClick={() => this.handleClose()}
            />
          </div>
        </div>
      </div>
    );
  }
}

Rules.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  showHelp: PropTypes.func
};

Rules.defaultProps = {
  history: null,
  showHelp: null
};

export default Rules;
