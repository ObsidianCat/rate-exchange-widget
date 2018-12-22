import axios from "axios";
import * as CONSTANTS from './actionTypes'
import {SET_ORIGIN_CURRENCY_TYPE, SET_TARGET_CURRENCY_TYPE} from "./actionTypes";
import {SWAP_CURRENCY_TYPE} from "./actionTypes";
const EXCHANGE_API_BASE = "https://api.exchangeratesapi.io/latest"

function getRates(currency){
  return axios.get(`${EXCHANGE_API_BASE}?base=${currency}`)
}
export function fetchExchangeRates() {
  return async function fetchExchangeRateThunk(dispatch, getState) {
    try {
      const { exchange } = getState()
      const response = await  getRates(exchange.originCurrency)
      dispatch({ type: CONSTANTS.FETCH_RATES, payload: response.data.rates  })
    } catch(error){
      console.error(error)
    }
  }
}

export function setCurrencyTypeOrigin(currencyType) {
  return async function setCurrencyTypeOriginThunk(dispatch) {
    try {
      const response = await  getRates(currencyType)
      dispatch({ type: CONSTANTS.FETCH_RATES, payload: response.data.rates  })
      dispatch({ type: SET_ORIGIN_CURRENCY_TYPE, payload: currencyType  })
    } catch(error){
      console.error(error)
    }
  }
}

export function setCurrencyTypeTarget(payload) {
  return { type: SET_TARGET_CURRENCY_TYPE, payload: payload }

}

export function updateOriginAmount(payload){
  return { type: CONSTANTS.SET_AMOUNT, payload }
}

export function swapCurrencyType(){
  return { type: SWAP_CURRENCY_TYPE }
}