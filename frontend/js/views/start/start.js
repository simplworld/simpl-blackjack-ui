import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import Button from '../../components/button/button';

import styles from './start.scss';


class Start extends React.Component {

  render() {
    const {
      errors, handleSubmit, loggedIn, isValid, isSubmitting, user, t
    } = this.props;

    if (loggedIn && user) {
      return <Redirect to="/game" />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.window}>
          <h1>Welcome to Simpl Blackjack</h1>
          <p>
            This Blackjack game has been built on Simpl. Simpl is an
            open-source simulation platform created by Wharton's Learning Lab.
          </p>
          <div className={styles.actions}>
            <Button
              label="Start"
              onClick={() => this.props.history.push('/login')}
            />
          </div>
          <p>
            Designed to help developers build customized, amazing simulations,
            singel and multiplayer games. Simpl transforms learning experiences
            with serious gameplay.
          </p>
        </div>
      </div>
    );
  }
}

Start.propTypes = {
};


export default Start;
