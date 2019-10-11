import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LoadingBar from '../loading-bar/loading-bar';

import styles from './button.scss';


export default class Button extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    const { href, onClick } = this.props;
    if (onClick) {
      onClick();
    }

    if (href) {
      window.location.href = href;
    }
  }

  render() {
    const {
      label, submitting, inactive, rounded, circle, small,
      disabled, className, onClick
    } = this.props;

    let content = <div>{label}</div>;

    if (submitting) {
      content = <LoadingBar />;
    }

    return (
      <button
        className={classnames(
          styles.button, {
            [styles.inactive]: inactive,
            [styles.circle]: circle,
            [styles.small]: small,
            [styles.rounded]: rounded,
            [styles.disabled]: disabled,
            [styles.submitting]: submitting,
          },
          className,
        )}
        onClick={this.handleClick}
        disabled={disabled}
        type="submit"
      >
        {content}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  inactive: PropTypes.bool,
  label: PropTypes.string,
  hollow: PropTypes.bool,
  href: PropTypes.string,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: null,
  inactive: false,
  label: '',
  hollow: false,
  white: false,
  href: '',
  submitting: false,
  disabled: false
};
