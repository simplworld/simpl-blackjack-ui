import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from './input/input';
import get from 'lodash/get';


class FormikInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  componentDidMount() {
    if (this.props.focusOnRender) {
      this.inputElement.current.focus();
    }
  }
  render() {
    const {
      field, form, type, placeholder, id, disabled, style, readonly, maxLength
    } = this.props;
    const touched = get(form.touched, field.name);
    const error = get(form.errors, field.name);

    return [
      <Input
        className={
          classNames({
            'is-invalid': (touched && error),
            'is-valid': (field.value && touched && !error),
            'form-control': (type !== 'checkbox' && type !== 'radio'),
          })
        }
        id={id}
        key={id}
        innerRef={this.inputElement}
        maxLength={maxLength}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        style={style}
        {...field}
        readOnly={readonly}
        onBlur={this.props.handleBlur || form.handleBlur}
      />,
      type !== 'hidden' && touched && error && <div key="error" className="input-error">{error}</div>
    ];
  }
}

FormikInput.propTypes = {
  field: PropTypes.shape({
    checked: PropTypes.bool,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
      PropTypes.bool.isRequired,
    ]),
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  focusOnRender: PropTypes.bool,
  required: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
  ])),
  handleBlur: PropTypes.func,
};

FormikInput.defaultProps = {
  style: {},
  disabled: false,
  focusOnRender: false,
  maxLength: undefined,
  handleBlur: undefined,
  id: undefined,
  placeholder: undefined,
  readonly: false,
  required: false,
};

export default FormikInput;
