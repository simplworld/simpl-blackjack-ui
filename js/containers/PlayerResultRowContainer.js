import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import PlayerResultRow from '../components/PlayerResultRow';

function mapStateToProps(state, ownProps) {
  const runuser = ownProps.runuser;

  const scenario = state.simpl.scenario.find(
    (s) => runuser.id === s.runuser
  );

  let periodsPlayed = 0;
  let total = 0;
  if (scenario) { // avoid runtime errors while state is loading
    const unsortedPeriods = state.simpl.period.filter(
      (p) => scenario.id === p.scenario
    );
    const periods = _.sortBy(unsortedPeriods, (p) => p.order);
    const periodOrder = _.last(periods).order;

    if (periodOrder > 1) { // pull total from last result
      const lastPeriod = periods[periodOrder - 2];
      periodsPlayed = lastPeriod.order;

      const lastResult = state.simpl.result.find(
        (s) => lastPeriod.id === s.period
      );
      total = lastResult.data.total;
    }
  }

  return {
    runuser,
    periodsPlayed,
    total
  };
}

const PlayerResultRowContainer = connect(
  mapStateToProps,
  null
)(PlayerResultRow);

export default withRouter(PlayerResultRowContainer);
