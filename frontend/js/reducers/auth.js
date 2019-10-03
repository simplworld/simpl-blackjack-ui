import {
  loginUser,
  logoutUser,
  getUser,
} from '../actions/auth';


const initialState = {
  loading: false,
  loggedIn: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case loginUser.REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case loginUser.SUCCESS: {
      return {
        ...state,
        loading: false,
        key: action.payload.key,
        loggedIn: true,
      };
    }
    case loginUser.FAILURE: {
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload,
      };
    }
    case logoutUser.REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case logoutUser.SUCCESS: {
      return {
        ...state,
        loading: false,
        key: '',
        loggedIn: false,
      };
    }
    case logoutUser.FAILURE: {
      return {
        ...state,
        loading: false,
        key: '',
        loggedIn: false,
      };
    }
    case getUser.REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case getUser.SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
        loggedIn: true,
      };
    }
    case getUser.FAILURE: {
      return {
        ...state,
        loading: false,
        loggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default auth;
