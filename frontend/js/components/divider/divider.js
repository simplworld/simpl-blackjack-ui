import React from 'react';
import PropTypes from 'prop-types';

import styles from './divider.scss';


const Divider = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardStack} />
      <div className={styles.chips} />
    </div>
  );
};

Divider.propTypes = {
};

Divider.defaultProps = {
};

export default Divider;
