import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/button/button';

import styles from './ui.scss';

class UI extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        <Button
          label="Hit"
          className={styles.submitButton}
        />
        <Button
          label="Stand"
          className={styles.submitButton}
        />
      </div>
    );
  }
}

UI.propTypes = {
};

export default UI;
