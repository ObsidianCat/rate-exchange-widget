import {
  SET_ORIGIN_CURRENCY_TYPE,
  SET_TARGET_CURRENCY_TYPE,
  SET_AMOUNT,
  SWAP_CURRENCY_TYPE
} from "../actions/actionTypes";

export const defaultState = {
  originCurrency: "EUR",
  targetCurrency: "USD",
  amount: 50
};

export default function exchange(state = defaultState, action) {
  switch (action.type) {
    case SWAP_CURRENCY_TYPE:
      return Object.assign({}, state, {
        originCurrency: state.targetCurrency,
        targetCurrency: state.originCurrency
      });
    case SET_ORIGIN_CURRENCY_TYPE:
      return Object.assign({}, state, { originCurrency: action.payload });
    case SET_TARGET_CURRENCY_TYPE:
      return Object.assign({}, state, { targetCurrency: action.payload });
    case SET_AMOUNT:
      return Object.assign({}, state, { amount: action.payload });
    default:
      return state;
  }
}
