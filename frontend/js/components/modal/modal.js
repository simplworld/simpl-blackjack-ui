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
        {text}
        <Button
          label="Deal"
          circle
          onClick={this.handleDeal}
        />
      </React.Fragment>
    );

    return (
      <CSSTransition
        in={showModal}
        timeout={800}
        // unmountOnExit
        // onEnter={}
        // onExited={}
      >
        {state => (
          <div
            styles={state}
            className={
              classnames(
                styles.container,
                {
                  [styles.enter]: state === 'entering' || state === 'appear',
                  [styles.enterActive]: state === 'entered'  || state === 'appeared',
                  [styles.exit]: state === 'exiting',
                  [styles.exitActive]: state === 'exited',
                }
              )}
          >
            <div className={styles.window}>
              {content}
            </div>
          </div>
        )}
      </CSSTransition>
    );
  }
}

Modal.propTypes = {
};

Modal.defaultProps = {
};

export default Modal;
