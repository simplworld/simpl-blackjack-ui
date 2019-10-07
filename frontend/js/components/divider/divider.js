import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  CSSTransition,
} from 'react-transition-group';

import styles from './divider.scss';


class Divider extends React.Component {

  render() {
    const { showModal } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.cardStack} />
        <div className={styles.chips} />
      </div>
    );
  }
}

Divider.propTypes = {
};

Divider.defaultProps = {
};

export default Divider;
