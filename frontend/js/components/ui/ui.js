import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import Button from '../../components/button/button';

import styles from './ui.scss';

class UI extends React.Component {

  handleNew = () => {
    const { currentPeriod, submitDecision } = this.props;
    submitDecision('new', currentPeriod);
  }

  handleDeal = () => {
    const { currentPeriod, submitDecision } = this.props;
    submitDecision('deal', currentPeriod);
  }

  handleHit = () => {
    const { currentPeriod, submitDecision } = this.props;
    submitDecision('hit', currentPeriod);
  }

  handleStand = () => {
    const { currentPeriod, submitDecision } = this.props;
    submitDecision('stand', currentPeriod);
  }

  handleLogout = () => {
    const { logoutUser } = this.props;
    logoutUser();
    window.location.href = '/';
  }

  handleShowHelp = () => {
    const { showHelp } = this.props;
    showHelp(true);
  }

  render() {
    const { submitDecision } = this.props;
    return (
      <div className={styles.container}>
        {/*
        <Button
          label="New"
          circle
          onClick={this.handleNew}
        />

        <Button
          label="Deal"
          circle
          onClick={this.handleDeal}
        />
        */}
        <Button
          label="Hit"
          circle
          onClick={this.handleHit}
        />
        <Button
          label="Stand"
          circle
          onClick={this.handleStand}
        />
        <div className={styles.meta}>
          <Button
            label="Logout"
            circle
            small
            onClick={this.handleLogout}
          />
          <Button
            label="Help"
            circle
            small
            onClick={this.handleShowHelp}
          />
          {/*}
          <Link to={{ pathname: '/help', state: { modal: true } }} >
            test
          </Link>
          */}
        </div>
      </div>
    );
  }
}

UI.propTypes = {
};

export default UI;
