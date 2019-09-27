import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import DecisionFormContainer from '../containers/DecisionFormContainer'

class PlayerHome extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Player: {this.props.runuser.email}</h1>
        <p>Current total: {this.props.total}</p>
        <DecisionFormContainer currentPeriod={this.props.currentPeriod}/>
        <br/>
        <a href="/logout/" className="btn btn-success btn-lg">Logout</a>
      </div>
    );
  }
}

PlayerHome.propTypes = {
  runuser: PropTypes.object.isRequired,
  total: PropTypes.number,
  currentPeriod: PropTypes.object.isRequired,
};

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

const module = connect(
  mapStateToProps,
  null
)(PlayerHome);

export default module;
