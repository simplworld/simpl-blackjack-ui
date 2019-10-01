import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom'

import { connect } from 'react-redux';
import {simpl} from 'simpl-react/lib/decorators/simpl';

import Routes from './routes/root';
import ConnectionStatus from './components/connection-status/connection-status';


// https://medium.com/lalilo/dynamic-transitions-with-react-router-and-react-transition-group-69ab795815c9

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount = () => {
    window.addEventListener('load', this.finishedLoading);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.finishedLoading);
  }

  finishedLoading = () => {
    this.setState({ loaded: true });
  }

  render() {
    return (
      <BrowserRouter>
        <Route component={Routes} />
      </BrowserRouter>
    );
  }
}

App.propTypes = {};

const AppContainer = connect(
  null,
  null
)(App);

const runs = RUNS.map((id) => `model:model.run.${id}`);
const runusers = RUNUSERS.map((id) => `model:model.runuser.${id}`);
const worlds = WORLDS.map((id) => `model:model.world.${id}`);
const topics = (LEADER) ? runs : runusers.concat(worlds);
console.log("topics: ", topics);

export default simpl({
  authid: AUTHID,
  password: 'nopassword',
  url: `${MODEL_SERVICE}`,
  progressComponent: ConnectionStatus,
  root_topic: ROOT_TOPIC,
  topics: () => topics,
  loadAllScenarios: LEADER
})(AppContainer);
