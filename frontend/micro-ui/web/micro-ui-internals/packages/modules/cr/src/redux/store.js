import { createStore, compose, applyMiddleware } from "redux";
import { logger } from 'redux-logger';

import getRootReducer from "./reducers";

const middleware = [];
  middleware.push(logger);

const getStore = (defaultStore) => {
  return createStore(
    getRootReducer(defaultStore),
    compose(applyMiddleware(...middleware))
  );
};
export default getStore;
