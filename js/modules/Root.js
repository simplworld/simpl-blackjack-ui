import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import {SimplActions} from 'simpl-react/lib/actions';
import {simpl} from 'simpl-react/lib/decorators/simpl';

import Progress from '../components/Progress';

import LeaderHome from './LeaderHome';
import PlayerHome from './PlayerHome';

const Home = (LEADER) ? LeaderHome : PlayerHome;

class Root extends React.Component {
  componentWillMount() {
    const userId = parseInt(AUTHID, 10);
  }

  render() {
    return (
      <Router history={browserHistory}>
        {/* player or leader home page route */}
        <Route path="/" component={Home}/>
      </Router>
    );
  }
}

Root.propTypes = {
  loadPhases: PropTypes.func,
};

const RootContainer = connect(
  null,
  null
)(Root);

const runs = RUNS.map((id) => `model:model.run.${id}`);
const runusers = RUNUSERS.map((id) => `model:model.runuser.${id}`);
const worlds = WORLDS.map((id) => `model:model.world.${id}`);
const topics = (LEADER) ? runs : runusers.concat(worlds);
console.log("topics: ", topics);

export default simpl({
  authid: AUTHID,
  password: 'nopassword',
  url: `${MODEL_SERVICE}`,
  progressComponent: Progress,
  root_topic: ROOT_TOPIC,
  topics: () => topics,
  loadAllScenarios: LEADER
})(RootContainer);
