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

  componentDidUpdate(prevProps) {
    // dirty approach do deal new cards after initializing a new game
    const { data, currentPeriod, submitDecision } = this.props;
    if (data.player_cards.length === 0) {
      submitDecision('deal', currentPeriod);
    }
  }

  toggleHelp = () => {
    const { showHelp } = this.state;
    this.setState({
      showHelp: !showHelp
    });
  }

  showHelp = (bool) => {
    this.setState({
      showHelp: bool
    });
  }

  render() {
    const {
      submitDecision, currentPeriod, data, runuser, logoutUser
    } = this.props;
    const { showHelp } = this.state;

    // add a blank card on the dealer stack as long it is not his turn
    let dealerCards = data.dealer_cards;
    if (data.dealer_cards.length === 1) {
      const dummyCard = [{ rank: 'blank', suit: '' }];
      dealerCards = data.dealer_cards.concat(dummyCard);
    }

    let showModal = false;
    if (data.player_busted || data.dealer_busted || data.push) {
      showModal = true;
    }

    const help = <Rules showHelp={() => this.toggleHelp()} />;

    const modal = (
      <Modal
        showModal={showModal}
        playerBusted={data.player_busted}
        dealerBusted={data.dealer_busted}
        push={data.push}
        currentPeriod={currentPeriod}
        submitDecision={submitDecision}
      />
    );

    return (
      <div className={styles.container}>
        <Hand
          cards={dealerCards}
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
          logoutUser={logoutUser}
        />
        {showModal && modal}
        {showHelp && help}
      </div>
    );
  }
}

GameView.propTypes = {
  submitDecision: PropTypes.func.isRequired,
  currentPeriod: PropTypes.shape().isRequired,
  data: PropTypes.shape(),
  logoutUser: PropTypes.func.isRequired,
  runuser: PropTypes.shape(),
};

GameView.defaultProps = {
  data: {
    deck: [],
    player_cards: [],
    dealer_cards: [],
    player_score: 0,
    dealer_score: 0,
    player_busted: false,
    dealer_busted: false,
    push: false,
    player_done: false
  },
  runuser: {}
};

export default GameView;
