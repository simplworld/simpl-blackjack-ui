import React from 'react';
import PropTypes from 'prop-types';

import Hand from '../../components/hand/hand';
import UI from '../../components/ui/ui';
import Modal from '../../components/modal/modal';
import Divider from '../../components/divider/divider';
import Rules from '../rules/rules';

import styles from './game.scss';


class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    };
  }

  toggleHelp = () => {
    this.setState({
      showHelp: !this.state.showHelp
    });
  }

  showHelp = (bool) => {
    this.setState({
      showHelp: bool
    });
  }

  render() {
    const {
      submitDecision, currentPeriod, data, runuser, logoutUser, startNewGame
    } = this.props;

    // add a blank card on the dealer stack as long it is not his turn
    let dealer_cards = data.dealer_cards
    console.log(data)
    if (data.dealer_cards.length === 1) {
      const dummyCard = [{rank: 'blank',  suit: ''}]
      dealer_cards = data.dealer_cards.concat(dummyCard);
    }

    let showModal = false;

    if (data.player_busted || data.dealer_busted || data.push) {
      showModal = true;
    }

    const help = <Rules showHelp={() => this.toggleHelp()} />;

    let modal = (
      <Modal
        showModal={showModal}
        playerBusted={data.player_busted}
        dealerBusted={data.dealer_busted}
        push={data.push}
        currentPeriod={currentPeriod}
        submitDecision={submitDecision}
        startNewGame={startNewGame}
      />
    );

    let dings = '';
    if (data.dealer_cards.length === 0) {
      dings =(
        <Modal
          showModal={true}
          playerBusted={data.player_busted}
          dealerBusted={data.dealer_busted}
          push={data.push}
          start
          currentPeriod={currentPeriod}
          submitDecision={submitDecision}
          startNewGame={startNewGame}
        />
      );
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
        <UI
          showHelp={() => this.toggleHelp()}
          currentPeriod={currentPeriod}
          submitDecision={submitDecision}
          startNewGame={startNewGame}
          logoutUser={logoutUser}
        />
        {showModal && modal}
        {dings}
        {this.state.showHelp && help}
      </div>
    );
  }
}

GameView.propTypes = {
};

export default GameView;
