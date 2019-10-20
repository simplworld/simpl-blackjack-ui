import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from './actions/auth';
import Routes from './routes/root';


class App extends React.Component {
  componentDidMount = () => {
    const { loadUser, loggedIn } = this.props;
    if (loggedIn) {
      loadUser();
    }
    window.addEventListener('load', this.finishedLoading);
  }

  componentDidUpdate(prevProps) {
    const { loggedIn, loadUser } = this.props;
    if (!prevProps.loggedIn && loggedIn) {
      loadUser();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Route component={Routes} />
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = {
  loadUser: getUser,

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
