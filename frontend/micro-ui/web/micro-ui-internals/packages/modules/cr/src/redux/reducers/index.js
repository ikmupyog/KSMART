import { combineReducers } from "redux";
import { STATE_REDUCER_KEY } from "../common";
import MarriageReducer from "./MarriageReducer";

const getRootReducer = () =>
  combineReducers({
    [STATE_REDUCER_KEY.MARRIAGE]: MarriageReducer,
  });

export default getRootReducer;
