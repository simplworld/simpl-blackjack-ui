import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes from './routes/root';


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
    const { history } = this.props;

    return (
      <ConnectedRouter history={history}>
        <Route component={Routes} />
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
