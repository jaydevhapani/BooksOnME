import {
  SET_BANNERS,
  SET_BOOKS,
  SET_GENRES,
  SET_LATEST_BOOKS,
  SET_MY_BOOKS,
  SET_NOTIFICATIONS,
  SET_SELLERS,
} from "../actionTypes";

const initialState = {
  banners: [],
  genres: [],
  latestBooks: [],
  sellers: [],
  books: [],
  mybooks: [],
  notifications: [],
};

const CommonReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case SET_BANNERS: {
      return {
        ...state,
        banners: action.payload,
      };
    }
    case SET_GENRES: {
      return {
        ...state,
        genres: action.payload,
      };
    }

    case SET_LATEST_BOOKS: {
      return {
        ...state,
        latestBooks: action.payload,
      };
    }

    case SET_BOOKS: {
      return {
        ...state,
        books: action.payload,
      };
    }
    case SET_MY_BOOKS: {
      return {
        ...state,
        mybooks: action.payload,
      };
    }
    case SET_SELLERS: {
      return {
        ...state,
        sellers: action.payload,
      };
    }

    case SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default CommonReducer;
