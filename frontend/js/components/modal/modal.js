import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  CSSTransition,
} from 'react-transition-group';

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
    submitDecision('deal', currentPeriod);
  }

  render() {
    const {
      showModal, playerBusted, dealerBusted, push, start
    } = this.props;

    let text = '';
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
          label="Start"
          circle
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
};

Modal.defaultProps = {
};

export default Modal;
