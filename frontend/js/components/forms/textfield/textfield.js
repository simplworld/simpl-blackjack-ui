import React from 'react';
import PropTypes from 'prop-types';

import Field from '../formik-field';


const TextField = (props) => {
  const {
    children, label, name, required
  } = props;
  return (
    <fieldset className="fieldset">
      {label ? (
        <label
          id={name}
          name={name}
          required={required}>
            {label}
        </label>
      ) : null}
      <Field
        type="text"
        {...props}
      />
      {children}
    </fieldset>
  );
};

TextField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

TextField.defaultProps = {
  children: undefined,
  label: '',
  required: false,
};

export default TextField;
