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
      dealing: false,
    };
  }

  componentDidMount() {
    const { data, currentScenario, currentPeriod, numPeriods } = this.props;
    console.log("componentDidMount");
    console.dir(currentPeriod);
    console.dir(currentScenario);
    if (data.player_cards.length === 0 && currentPeriod != null && numPeriods === 1) {
      this.deal(currentScenario);
    }
  }

  componentDidUpdate(prevProps) {
    // dirty approach do deal new cards after initializing a new game
    const { data, currentScenario, currentPeriod, numPeriods } = this.props;
    console.log("componentDidUpdate");
    console.dir(currentPeriod);
    console.dir(currentScenario);
    if (prevProps.currentPeriod !== currentPeriod) {
      if (numPeriods === 1 && data.player_cards.length === 0) {
        this.deal(currentScenario);
      }
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

  deal = (currentScenario) => {
    const { submitDecision } = this.props;
    const dealing = this.state[dealing];
    console.dir(dealing)
    if (dealing) {
      console.log("Already dealing...")
      return;
    }
    this.setState({ dealing: true });
    submitDecision('deal', currentScenario);
    console.log("Dealing...")
  }

  render() {
    const {
      submitDecision, currentPeriod, data, runuser, logoutUser, currentScenario, dealNewGame,
    } = this.props;
    const { showHelp } = this.state;

    // add a blank card on the dealer stack as long it is not his turn
    let dealerCards = data.dealer_cards;
    if (data.dealer_cards.length === 1) {
      const dummyCard = [{ rank: 'blank', suit: '' }];
      dealerCards = data.dealer_cards.concat(dummyCard);
    }

    let showModal = false;
    if (data.player_busted || data.dealer_busted || data.push || data.dealer_done) {
      showModal = true;
    }

    const help = <Rules showHelp={() => this.toggleHelp()} />;

    const modal = (
      <Modal
        showModal={showModal}
        playerBusted={data.player_busted}
        dealerBusted={data.dealer_busted}
        playerScore={data.player_score}
        dealerScore={data.dealer_score}
        push={data.push}
        currentScenario={currentScenario}
        dealNewGame={dealNewGame}
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
          currentScenario={currentScenario}
          submitDecision={submitDecision}
          dealNewGame={dealNewGame}
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
  dealNewGame: PropTypes.func.isRequired,
  currentPeriod: PropTypes.shape(),
  currentScenario: PropTypes.number.isRequired,
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
  currentPeriod: {},
  runuser: {}
};

export default GameView;
