import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';

import { getUser } from './actions/auth';
import Routes from './routes/root';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount = () => {
    const { getUser, loggedIn } = this.props;
    // load user here.
    if (loggedIn) {
      getUser();
    }
    window.addEventListener('load', this.finishedLoading);
  }

  componentDidUpdate(prevProps) {
    const { loggedIn, getUser } = this.props;
    // You're logged in now, let's get your user
    if (!prevProps.loggedIn && loggedIn) {
      getUser();
    }
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

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = {
  getUser: getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
