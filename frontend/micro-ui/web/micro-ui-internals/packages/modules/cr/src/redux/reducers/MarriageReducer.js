import { Marriage } from "../actions";

const { ACTION_TYPES: MARRIAGE_ACTION_TYPES } = Marriage;

const initialState = {
  sample: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MARRIAGE_ACTION_TYPES.SAMPLE_ACTION:
      return Object.assign({}, state, {
        sample: action.payload
      });
    default:
      return state;

  }
};
export default reducer;
