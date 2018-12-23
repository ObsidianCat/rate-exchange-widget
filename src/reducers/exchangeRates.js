import { FETCH_RATES } from "../actions/actionTypes";

export default function exchangeRates(state = {}, action) {
  if (action.type === FETCH_RATES) {
    return action.payload;
  } else {
    return state;
  }
}
