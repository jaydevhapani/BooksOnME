import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootReducer from "./reducers/rootReducer";

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  // storage: storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export { store, persistor };
