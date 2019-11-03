import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/button';

import styles from './ui.scss';


class UI extends React.Component {
  handleNew = () => {
    const { currentScenario, dealNewGame } = this.props;
    dealNewGame(currentScenario);
  }

  handleHit = () => {
    const { currentScenario, submitDecision } = this.props;
    submitDecision('hit', currentScenario);
  }

  handleStand = () => {
    const { currentScenario, submitDecision } = this.props;
    submitDecision('stand', currentScenario);
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
    return (
      <div className={styles.container}>
        <Button
          label="Fold"
          circle
          small
          onClick={this.handleNew}
        />
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
        </div>
      </div>
    );
  }
}

UI.propTypes = {
  currentPeriod: PropTypes.shape(),
  currentScenario: PropTypes.number.isRequired,
  logoutUser: PropTypes.func.isRequired,
  submitDecision: PropTypes.func.isRequired,
  dealNewGame: PropTypes.func.isRequired,
  showHelp: PropTypes.func.isRequired,
};

UI.defaultProps = {
  currentPeriod: {}
};

export default UI;
