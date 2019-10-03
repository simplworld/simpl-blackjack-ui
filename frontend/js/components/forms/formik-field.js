// Thin wrapper around formik's Field that adds
// basic bootstrap formating
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import Input from './formik-input';

import { isRequired } from '../../common/validators';


const FormikField = (props) => {
  const {
    children, id, required, validators, ...rest
  } = props;

  const totalValidators = [...validators];
  if (required) {
    totalValidators.push(isRequired);
  }

  /* TODO: Re add validators
  let validate;
  if (totalValidators) {
    validate = value => totalValidators.map(vf => vf(value)).join(' ').trim() || undefined;
  }
  */

  return (
    <Field
      component={Input}
      id={id || rest.name}
      {...rest}
    >
      {children}
    </Field>
  );
};


FormikField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validators: PropTypes.arrayOf(PropTypes.func),
};

FormikField.defaultProps = {
  children: [],
  id: undefined,
  required: false,
  validators: [],
};

export default FormikField;
