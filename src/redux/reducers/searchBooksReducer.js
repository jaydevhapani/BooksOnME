import {
  SET_BANNERS,
  SET_BOOKS,
  SET_GENRES,
  SET_LATEST_BOOKS,
  SET_MY_BOOKS,
  SET_SELLERS,
} from "../actionTypes";

const initialState = {
  books: [],
};

const searchBookReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case SET_BOOKS: {
      return {
        ...state,
        books: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default searchBookReducer;
