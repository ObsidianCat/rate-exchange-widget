import moxios from 'moxios';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './exchangeActions'
import * as types from './actionTypes'
import {EXCHANGE_API_BASE} from './utils'

const ratesResponseMock = {
  "date": "2018-12-21",
  "rates": {
    "RUB": 78.2103,
    "ILS": 4.3045,
    "USD": 1.1414,
  },
  "base": "EUR"
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

//Example of how I would approach testing of asynchronous actions
describe('rateActions', () => {
  beforeEach(()=>{
    moxios.install();
  })

  afterEach(()=>{
    moxios.uninstall();
  })

  it('fetch conversion rates', () => {
    moxios.stubRequest(`${EXCHANGE_API_BASE}?base=EUR`, {
      status: 200,
      response: ratesResponseMock
    })

    const expectedAction = {
      type: types.FETCH_RATES,
      payload: ratesResponseMock.rates
    }

    expect(actions.updateOriginAmount(25)).toEqual(expectedAction)
  })
})
