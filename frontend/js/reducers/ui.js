import { SHOW_MAP, HIDE_MAP } from '../actions/ui';

const initialState = {
  showMap: false
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MAP:
      return {
        ...state,
        showMap: true,
      };
    case HIDE_MAP:
      return {
        ...state,
        showMap: false,
      };
    default:
      return state;
  }
};

export default map;
