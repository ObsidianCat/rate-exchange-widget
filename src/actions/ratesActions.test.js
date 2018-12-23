import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./ratesActions";
import * as types from "./actionTypes";
import { EXCHANGE_API_BASE } from "./utils";
import { defaultState as exchangeState } from "../reducers/exchange";

const ratesResponseMock = {
  date: "2018-12-21",
  rates: {
    RUB: 78.2103,
    ILS: 4.3045,
    USD: 1.1414
  },
  base: "EUR"
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("rateActions", () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore({ exchangeRates: {}, exchange: exchangeState });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("fetches and dispatch conversion rates", () => {
    moxios.stubRequest(`${EXCHANGE_API_BASE}?base=EUR`, {
      status: 200,
      response: ratesResponseMock
    });

    const expectedAction = {
      type: types.FETCH_RATES,
      payload: ratesResponseMock.rates
    };

    return store.dispatch(actions.fetchExchangeRates()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedAction);
    });
  });
});
