import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';


const ProtectedRoute = (props) => {
  if (!props.allowed) {
    return <Redirect to="/login" />;
  }
  return (
    <Route {...props} />
  );
};

ProtectedRoute.propTypes = {
  allowed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  allowed: ownProps.allowed || state.auth.loggedIn,
});


const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
