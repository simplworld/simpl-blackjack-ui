import { connect } from 'react-redux';

import BoardView from './board';


const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user,
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardView);
