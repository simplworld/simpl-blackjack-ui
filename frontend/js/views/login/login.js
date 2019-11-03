import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import * as yup from 'yup';

import Button from '../../components/button/button';
import withFormik from '../../components/forms/withFormik';
import TextField from '../../components/forms/textfield/textfield';

import styles from './login.scss';


const Login = (props) => {
  const {
    handleSubmit, loggedIn, isValid, isSubmitting, user,
  } = props;

  if (loggedIn && user) {
    return <Redirect to="/game" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <form className={styles.form}>
          <div className={styles.fields}>
            <div className={styles.header}>
              <h1>Login</h1>
            </div>
            <TextField
              name="username"
              type="text"
              label="Email address"
              placeholder="Enter your email address"
              className="form-control"
              autofocus
              required
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              className="form-control"
              required
            />
          </div>
          <div className={styles.actions}>
            <Button
              label="Login"
              className={styles.submitButton}
              onClick={handleSubmit}
              disabled={!isValid}
              submitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const formikContainer = withFormik({
  mapPropsToValues: () => ({
    username: '',
    password: '',
  }),
  validateOnChange: true,
  validateOnBlur: true,
  enableReinitialize: true,
  validationSchema: yup.object().shape({
    username: yup.string()
      .email('Please enter a valid email')
      .required('Please enter an email!'),
    password: yup.string()
      .required('Please enter a password')
  }),
  handleSubmit: (values, bag) => bag.props.onSubmit(values, bag),
})(Login);

export default formikContainer;
