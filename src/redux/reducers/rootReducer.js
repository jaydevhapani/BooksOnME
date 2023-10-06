import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthReducer from "./authReducer";
import { RESET_REDUX } from "../actionTypes";
import CommonReducer from "./commonReducer";
import searchBooksReducer from "./searchBooksReducer";
import profileReducer from "./profileReducer";

const mainReducer = combineReducers({
  authReducer: AuthReducer,
  commonReducer: CommonReducer,
  searchBookReducer: searchBooksReducer,
  profileReducer: profileReducer,
});

const RootReducer = (state, action) => {
  if (action.type === RESET_REDUX) {
    state = undefined;
  }
  return mainReducer(state, action);
};

export default RootReducer;
