import axios from "axios";

export const EXCHANGE_API_BASE = "https://api.exchangeratesapi.io/latest"

export function getRates(currency){
  return axios.get(`${EXCHANGE_API_BASE}?base=${currency}`)
}