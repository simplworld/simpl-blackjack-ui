import React from 'react';
import PropTypes from 'prop-types';

import GameView from '../game/game';

import styles from './board.scss';

class BoardView extends React.Component {

  render() {
    const { user } = this.props;
    let content = null;
    console.log('user', user);
    if ( user ) {
      content = <GameView />
    }
    return (
      <div className={styles.container}>
        {content}
      </div>
    );
  }
}

BoardView.propTypes = {
};

export default BoardView;
