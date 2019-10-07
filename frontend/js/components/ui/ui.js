import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/button/button';

import styles from './ui.scss';

class UI extends React.Component {

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

  render() {
    const { submitDecision } = this.props;
    return (
      <div className={styles.container}>
        <Button
          label="Deal"
          circle
          onClick={this.handleDeal}
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
      </div>
    );
  }
}

UI.propTypes = {
};

export default UI;
