import React from 'react';
import { Route, Switch } from 'react-router';
import { Spinner } from 'react-redux-spinner';
import 'react-redux-spinner/dist/react-redux-spinner.css';


import BoardView from '../views/board/board';


class Routes extends React.Component {
  render() {
    return (
      <Route render={(props) => {
        return (
          <React.Fragment>
            <Route path="/" component={BoardView} />
          </React.Fragment>
        );
      }}
      />
    );
  }
}

export default Routes;
