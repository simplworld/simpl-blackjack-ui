/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  size: PropTypes.string,
  bsSize: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  type: 'text',
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.getRef = this.getRef.bind(this);
    this.focus = this.focus.bind(this);
  }

  getRef(ref) {
    if (this.props.innerRef) {
      this.props.innerRef(ref);
    }
    this.ref = ref;
  }

  focus() {
    if (this.ref) {
      this.ref.focus();
    }
  }

  render() {
    let {
      className,
      cssModule,
      type,
      bsSize,
      state,
      valid,
      invalid,
      tag,
      addon,
      static: staticInput,
      plaintext,
      innerRef,
      ...attributes
    } = this.props;

    const checkInput = ['radio', 'checkbox'].indexOf(type) > -1;
    const isNotaNumber = new RegExp('\\D', 'g');

    const fileInput = type === 'file';
    const textareaInput = type === 'textarea';
    const selectInput = type === 'select';
    let Tag = tag || ((selectInput || textareaInput) ? type : 'input');

    let formControlClass = 'form-control';

    if (plaintext || staticInput) {
      formControlClass = `${formControlClass}-plaintext`;
      Tag = tag || 'p';
    } else if (fileInput) {
      formControlClass = `${formControlClass}-file`;
    } else if (checkInput) {
      if (addon) {
        formControlClass = null;
      } else {
        formControlClass = 'form-check-input';
      }
    }

    if (state && typeof valid === 'undefined' && typeof invalid === 'undefined') {
      if (state === 'danger') {
        invalid = true;
      } else if (state === 'success') {
        valid = true;
      }
    }

    if (attributes.size && isNotaNumber.test(attributes.size)) {
      bsSize = attributes.size;
      delete attributes.size;
    }

    const classes = classNames(
      className,
      invalid && 'is-invalid',
      valid && 'is-valid',
      bsSize ? `form-control-${bsSize}` : false,
      formControlClass
    );

    if (Tag === 'input' || (tag && typeof tag === 'function')) {
      attributes.type = type;
    }

    if (attributes.children && !(plaintext || staticInput || type === 'select' || typeof Tag !== 'string' || Tag === 'select')) {
      delete attributes.children;
    }

    return (
      <Tag {...attributes} ref={innerRef} className={classes} />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
