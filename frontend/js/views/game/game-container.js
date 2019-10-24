import { connect } from 'react-redux';

import { submitDecision } from '../../actions/game';
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
  const unsortedPeriods = state.simpl.period.filter(
    (p) => scenario.id === p.scenario
  );

  console.log("scenarios");
  console.dir(scenarios);
  console.dir(unsortedPeriods);
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

  if (unsortedPeriods.length === 0) {
    currentPeriod = null;
  } else {
    const periods = _.sortBy(unsortedPeriods, (p) => p.order);
    const periodOrder = _.last(periods).order;

    if (periodOrder > 1) {
      const lastPeriod = periods[periodOrder - 2];
      const lastResult = state.simpl.result.find(
        (s) => lastPeriod.id === s.period
      );
      data = lastResult.data.data;
    }

    currentPeriod = periods[periodOrder - 1];
  }
  console.log("periods");
  console.dir(unsortedPeriods);
  console.dir(currentPeriod);

  console.log("mapState");
  console.dir(runuser);
  console.dir(currentPeriod);
  console.dir(data);

  return {
    runuser,
    data,
    currentPeriod,
    scenario,
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
    }
  };
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);

export default GameContainer;
