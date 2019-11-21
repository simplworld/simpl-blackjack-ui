import { connect } from 'react-redux';

import { submitDecision, dealNewGame, startDealing, stopDealing } from '../../actions/game';
import { logoutUser } from '../../actions/auth';

// figure out missing underscore import


import GameView from './game';

function mapStateToProps(state) {
  const runuser = state.simpl.current_runuser;
  const scenarios = state.simpl.scenario.filter(
    (s) => runuser.id === s.runuser
  );
  const sorted_scenarios = _.sortBy(scenarios, (s) => s.created);
  const scenario = sorted_scenarios[sorted_scenarios.length - 1];
  const currentScenario = scenario.id;
  const unsortedPeriods = state.simpl.period.filter(
    (p) => scenario.id === p.scenario
  );

  console.log("scenarios");
  console.dir(scenarios);
  console.log("unsortedPeriods");
  console.dir(unsortedPeriods);

  let data = {
    deck: [],
    player_cards: [],
    dealer_cards: [],
    player_score: 0,
    dealer_score: 0,
    player_busted: false,
    dealer_busted: false,
    push: false,
    player_done: false
  };
  let currentPeriod = null;

  const numPeriods = unsortedPeriods.length;

  if (numPeriods === 0) {
    currentPeriod = null;
  } else {
    const periods = _.sortBy(unsortedPeriods, (p) => p.order);
    const periodOrder = _.last(periods).order;

    if (periodOrder > 1) {
      const lastPeriod = periods[periodOrder - 2];
      if (lastPeriod) {
        const lastResult = state.simpl.result.find(
          (s) => lastPeriod.id === s.period
        );
        if (lastResult) {
          if (lastResult && lastResult.data) {
            data = lastResult.data.data;
          }
        }
      }
    }

    currentPeriod = periods[periodOrder - 1];
  }

  return {
    runuser,
    data,
    currentPeriod,
    scenario,
    currentScenario,
    numPeriods,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    logoutUser: () => dispatch(logoutUser()),
    submitDecision(action, currentPeriod) {
      if (!currentPeriod) {
        return;
      }
      dispatch(submitDecision(currentPeriod, action));
    },
    dealNewGame(currentScenario) {
      dispatch(dealNewGame(currentScenario));
    }
  };
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);

export default GameContainer;
