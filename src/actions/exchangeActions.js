import axios from "axios";
import * as CONSTANTS from './actionTypes'
import {SET_ORIGIN_CURRENCY_TYPE, SET_TARGET_CURRENCY_TYPE} from "./actionTypes";
import {SWAP_CURRENCY_TYPE} from "./actionTypes";
import {calculateTargetFromOrigin} from '../utils'
import {SET_AMOUNT} from "./actionTypes";
import {getRates} from "./utils";


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

export function doSwap(){
  return async function doSwapThunk(dispatch, getState){
    const { exchange, exchangeRates } = getState()
    const futureAmountOrigin = calculateTargetFromOrigin(exchange.amount, exchangeRates, exchange.targetCurrency)
    dispatch({type: CONSTANTS.SWAP_CURRENCY_TYPE})
    const response = await  getRates(getState().exchange.originCurrency)
    dispatch({ type: CONSTANTS.FETCH_RATES, payload: response.data.rates  })
    dispatch({type: SET_AMOUNT, payload: futureAmountOrigin})

  }
}