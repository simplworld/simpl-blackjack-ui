import { connect } from 'react-redux';

import { registerUser } from '../../actions/auth';
import { formikApiAction } from '../../actions/api';
import Register from './register';

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loginError: state.auth.loginError,
  loggedIn: state.auth.loggedIn,
  registrationComplete: state.auth.registrationComplete,
  user: state.auth.user,
});

const mapDispatchToProps = {
  onSubmit: formikApiAction(registerUser),
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
