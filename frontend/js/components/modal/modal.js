import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  CSSTransition,
} from 'react-transition-group';

import styles from './modal.scss';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      showModal, playerBusted, dealerBusted, push
    } = this.props;
    let content = ''

    console.log('playerBusted', playerBusted)
    console.log('dealerBusted', dealerBusted)
    if (dealerBusted) {
      content = 'You\'ve won!'
    }
    if (playerBusted) {
      content = 'You\'ve lost!'
    }
    if (push) {
      content = 'It\'s a draw!'
    }
    return (
      <CSSTransition
        in={showModal}
        timeout={800}
        // unmountOnExit
        // onEnter={}
        // onExited={}
      >
        {state => (
          <div styles={state} className={
            classnames(
              styles.container,
              {
                [styles.enter]: state == 'entering' || state == 'appear',
                [styles.enterActive]: state == 'entered'  || state == 'appeared' ,
                [styles.exit]: state == 'exiting',
                [styles.exitActive]: state == 'exited',
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
