import React from 'react';
import { Route, Switch } from 'react-router';
import { Spinner } from 'react-redux-spinner';
import 'react-redux-spinner/dist/react-redux-spinner.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ProtectedRoute from './protected-route';
import BoardContainer from '../views/board/board-container';
import LoginContainer from '../views/login/login-container';
import StartView from '../views/start/start';

class Routes extends React.Component {
  render() {
    return (
      <Route render={(props) => {
        return (
          <React.Fragment>
            <Switch>
              <Route exact path="/login" component={LoginContainer} />
              <ProtectedRoute exact path="/game" component={BoardContainer} />
              <Route exact path="/" component={StartView} />
            </Switch>
          </React.Fragment>
        );
      }}
      />
    );
  }
}

export default Routes;
