import { RESET_REDUX, SAVE_TOKEN, SAVE_USER_DETAILS } from "../actionTypes";

const initialState = {
  token: null,
  userDetails: null,
};

const AuthReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case SAVE_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case SAVE_USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case RESET_REDUX: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
export default AuthReducer;
