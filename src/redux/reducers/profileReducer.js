import { RESET_REDUX, SAVE_TOKEN, SAVE_USER_DETAILS } from "../actionTypes";

const initialState = {};

const profileReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    default: {
      return state;
    }
  }
};
export default profileReducer;
