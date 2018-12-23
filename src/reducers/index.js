import { combineReducers } from "redux";
import exchangeRates from "./exchangeRates";
import exchange from "./exchange";

export default combineReducers({
  exchangeRates,
  exchange
});
