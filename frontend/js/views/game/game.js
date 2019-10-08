import React from 'react';
import PropTypes from 'prop-types';

import Hand from '../../components/hand/hand';
import UI from '../../components/ui/ui';
import Modal from '../../components/modal/modal';
import Divider from '../../components/divider/divider';

import styles from './game.scss';


class GameView extends React.Component {

  render() {
    const {
      submitDecision, currentPeriod, data, runuser, logoutUser
    } = this.props;

    // add a blank card on the dealer stack as long it is not his turn
    let dealer_cards = data.dealer_cards
    if (!data.player_done) {
      const dummyCard = [{rank: 'blank',  suit: ''}]
      dealer_cards = data.dealer_cards.concat(dummyCard)
    }

    let showModal = false;
    if (data.player_busted || data.dealer_busted || data.push) {
      showModal = true;
    }
    return (
      <div className={styles.container}>
        <Hand
          cards={dealer_cards}
          score={data.dealer_score}
        />
        <Divider />
        <Hand
          cards={data.player_cards}
          score={data.player_score}
          isPlayer
          runuser={runuser}
        />
        <Modal
          showModal={showModal}
          playerBusted={data.player_busted}
          dealerBusted={data.dealer_busted}
          push={data.push}
        />
        <UI
          currentPeriod={currentPeriod}
          submitDecision={submitDecision}
          logoutUser={logoutUser}
        />
      </div>
    );
  }
}

GameView.propTypes = {
};

export default GameView;

