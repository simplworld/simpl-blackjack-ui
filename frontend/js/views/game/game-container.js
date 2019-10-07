import { connect } from 'react-redux';

  import { submitDecision } from '../../actions/game';

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

  let data = {};
  if (periodOrder > 1) { // pull total from last result
    const lastPeriod = periods[periodOrder - 2];
    const lastResult = state.simpl.result.find(
      (s) => lastPeriod.id === s.period
    );
    data = lastResult.data.data;
  }

  const currentPeriod = periods[periodOrder - 1];

  return {
    runuser,
    data,
    currentPeriod
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log(ownProps);
  return {
    submitDecision(action, currentPeriod) {
      dispatch(submitDecision(currentPeriod, action))
    }
  };
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView);

export default GameContainer;

