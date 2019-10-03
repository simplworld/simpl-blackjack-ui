import { connect } from 'react-redux';

import GameView from './game';

function mapStateToProps(state) {
  const runuser = state.simpl.current_runuser;

  const scenario = state.simpl.scenario.find(
    (s) => runuser.id === s.runuser
  );

  const unsortedPeriods = state.simpl.period.filter(
    (p) => scenario.id === p.scenario
  );
  const periods = _.sortBy(unsortedPeriods, (p) => p.order);
  const periodOrder = _.last(periods).order;

  let total = 0;
  if (periodOrder > 1) { // pull total from last result
    const lastPeriod = periods[periodOrder - 2];
    const lastResult = state.simpl.result.find(
      (s) => lastPeriod.id === s.period
    );
    total = lastResult.data.total;
  }

  const currentPeriod = periods[periodOrder - 1];

  return {
    runuser,
    total,
    currentPeriod
  };
}

const GameContainer = connect(
  mapStateToProps,
  null
)(GameView);

export default GameContainer;

