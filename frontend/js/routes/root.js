import React from 'react';
import { Route, Switch } from 'react-router';
import 'react-redux-spinner/dist/react-redux-spinner.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ProtectedRoute from './protected-route';
import BoardContainer from '../views/board/board-container';
import LoginContainer from '../views/login/login-container';
import StartView from '../views/start/start';
import HelpView from '../views/help/help';


class Routes extends React.Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP'
      && (!location.state || !location.state.modal)
    ) {
      this.previousLocation = location;
    }
  }

  render() {
    return (
      <Route render={(props) => {
        const isModal = !!(
          props.location.state
          && props.location.state.modal
          && this.previousLocation !== props.location
        );
        return (
          <React.Fragment>
            <TransitionGroup component={null}>
              <CSSTransition
                key={props.location.key}
                classNames="overlay"
                timeout={300}
              >
                <Switch location={props.location}>
                  {isModal ? <Route path="/help" component={HelpView} /> : null}
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            <Switch location={isModal ? this.previousLocation : props.location}>
              <Route path="/login" component={LoginContainer} />
              <ProtectedRoute path="/game" component={BoardContainer} />
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
