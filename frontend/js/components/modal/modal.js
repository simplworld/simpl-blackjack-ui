import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/button';

import styles from './modal.scss';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleDeal = () => {
    const { currentPeriod, submitDecision } = this.props;
    submitDecision('new', currentPeriod);
  }

  render() {
    const {
      playerBusted, dealerBusted, dealerScore, playerScore, push, start
    } = this.props;

    let text = '';
    if (dealerScore < playerScore) {
      text = 'You\'ve won!';
    }

    if (dealerScore > playerScore) {
      text = 'You\'ve lost!';
    }

    if (dealerBusted) {
      text = 'You\'ve won!';
    }
    if (playerBusted) {
      text = 'You\'ve lost!';
    }
    if (push) {
      text = 'It\'s a draw!';
    }
    if (start) {
      text = 'Start a new game!';
    }

    const content = (
      <React.Fragment>
        <h1>{text}</h1>
        <Button
          label="Start New Game!"
          rounded
          onClick={this.handleDeal}
        />
      </React.Fragment>
    );

    return (
      <div className={styles.container}>
        <div className={styles.window}>
          {content}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  submitDecision: PropTypes.func.isRequired,
  currentPeriod: PropTypes.shape().isRequired,
  dealerBusted: PropTypes.bool,
  playerBusted: PropTypes.bool,
  playerScore: PropTypes.number,
  dealerScore: PropTypes.number,
  push: PropTypes.bool,
  start: PropTypes.bool
};

Modal.defaultProps = {
  dealerBusted: false,
  playerBusted: false,
  push: false,
  start: false
};

export default Modal;
