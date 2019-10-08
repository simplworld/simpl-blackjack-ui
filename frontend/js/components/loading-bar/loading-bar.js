import React from 'react';
import { css } from 'react-emotion';
import classnames from 'classnames';

// First way to import
import { BarLoader } from 'react-spinners';

import styles from './loading-bar.scss';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class LoadingBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className={
        classnames([styles.container, this.props.className])}>
        <BarLoader
          className={override}
          sizeUnit="11px"
          size={150}
          color="#FF3B46"
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default LoadingBar;
