import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '../../components/button/button';

import styles from './start.scss';


class Start extends React.Component {
  handleClose = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const {
      loggedIn, user, history
    } = this.props;
    if (loggedIn && user) {
      return <Redirect to="/game" />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.window}>
          <div className={styles.header}>
            <span>Welcome to:</span>
            <h1>Simpl Blackjack</h1>
          </div>
          <p>
            {'This Blackjack game has been built on Simpl. Simpl is an open-source simulation platform created by The Wharton Learning Lab and Wharton Interactive.'}
          </p>
          <Link
            to={{ pathname: '/help', state: { modal: true } }}
            className={styles.rulesLink}
          >
            The Rules
          </Link>
          <hr />
          <div className={styles.actions}>
            <Button
              label="Login"
              onClick={() => history.push('/game')}
            />
            <br />
            <Button
              label="Register"
              onClick={() => history.push('/register')}
            />
          </div>
          <div className={styles.footer}>
            <p>
              Designed to help developers build meaningful educational experiences using simulations and games.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Start.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  loggedIn: PropTypes.bool,
  user: PropTypes.shape(),
};

Start.defaultProps = {
  loggedIn: false,
  user: null
};

export default Start;
