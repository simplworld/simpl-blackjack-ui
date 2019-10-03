import { connect } from 'react-redux';

import { loginUser } from '../../actions/auth';
import { formikApiAction } from '../../actions/api';
import Login from './login';

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loginError: state.auth.loginError,
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
});

const mapDispatchToProps = {
  onSubmit: formikApiAction(loginUser),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
