import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import Button from '../../components/button/button';

import styles from './help.scss';


class Help extends React.Component {

  handleClose = () => {
    this.props.history.goBack();
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
            This demo is designed as a single-player game with no betting, no splitting,
          </p>
          <h3>
            Objective:
          </h3>
          <ul>
            <li>
              Players attempt to beat the dealer by getting a hand value as
              close to 21 as possible without going over.
            </li>
          </ul>
          <h3>
            Points:
          </h3>
          <ul>
            <li>
              Face cards =10 points
            </li>
            <li>
              Any other card = its face value
            </li>
            <li>
              Aces = automatically valued at 11, unless that brings the hand over 21
            </li>
          </ul>
          <h3>
            Game Play
          </h3>
          <ul>
            <li>
              Player receives two cards face-up
            </li>
            <li>
              Dealer receives two cards, one face-up, the other face-down
            </li>
            <li>
              Players decide whether to “stand” (no more cards) or “hit” (ask for another card)
            </li>
            <li>
              If Dealer’s hand is 16 or less, and Player’s hand is less than 21, Dealer must take card
            </li>
          </ul>
          <h3>
            Winner
          </h3>
          <ul>
            <li>
              The winner has a hand count closest to or exactly 21, but not more than 21
            </li>
            <li>
              If Dealer and Player have the same score, the game is tied—Player can “Start New Game”
            </li>
          </ul>
          <div className={styles.actions}>
            <Button
              label="Start"
              //onClick={() => this.props.history.push('/login')}
              onClick={() => this.props.history.goBack()}
            />
          </div>
        </div>
      </div>
    );
  }
}

Help.propTypes = {
};


export default Help;
