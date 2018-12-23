import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./exchangeActions";
import * as types from "./actionTypes";
import { EXCHANGE_API_BASE } from "./utils";
import { defaultState as exchangeState } from "../reducers/exchange";

//Example of how I would approach testing of synchronous and  asynchronous action creators
describe("exchangeActions synchronous actions", () => {
  it("should create an action to update origin amount", () => {
    const expectedAction = {
      type: types.SET_AMOUNT,
      payload: 25
    };
    expect(actions.updateOriginAmount(25)).toEqual(expectedAction);
  });
});

describe("exchangeActions asynchronous actions", () => {
  const ratesResponseMock = {
    date: "2018-12-21",
    rates: {
      RUB: 68.521377256,
      EUR: 0.8761170492,
      CAD: 1.3543893464
    },
    base: "USD"
  };

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store;

  beforeEach(() => {
    moxios.install();
    store = mockStore({
      exchangeRates: { EUR: 1, USD: 1.1414 },
      exchange: exchangeState
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should update origin currency and fetch rates for the new currency", () => {
    const newCurrency = "USD";
    moxios.stubRequest(`${EXCHANGE_API_BASE}?base=${newCurrency}`, {
      status: 200,
      response: ratesResponseMock
    });

    const expectedActions = {
      [types.SET_ORIGIN_CURRENCY_TYPE]: {
        type: types.SET_ORIGIN_CURRENCY_TYPE,
        payload: newCurrency
      },
      [types.FETCH_RATES]: {
        type: types.FETCH_RATES,
        payload: ratesResponseMock.rates
      }
    };
    return store
      .dispatch(actions.setCurrencyTypeOrigin(newCurrency))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedActions[types.FETCH_RATES]);
        expect(actions[1]).toEqual(
          expectedActions[types.SET_ORIGIN_CURRENCY_TYPE]
        );
      });
  });
});
