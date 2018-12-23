import React from "react";
import { shallow } from "enzyme";
import { ExchangerComponent } from "./Exchanger";
import { defaultState as exchangeState } from "../../reducers/exchange";

let wrapper;

const mockProps = {
  exchange: exchangeState,
  exchangeRates: {},
  fetchExchangeRates: jest.fn(),
  swapCurrencyType: jest.fn(),
  doSwap: jest.fn()
};

describe("Exchanger Component", () => {
  //Example of minimal testing for one component
  //3 things should be tested - rendering without crashing, life cycle methods, response to changes (user interactions)

  beforeAll(() => {
    wrapper = shallow(<ExchangerComponent {...mockProps} />);
  });
  afterAll(() => {
    wrapper.unmount();
  });

  it("should render as snapshot", () => {
    console.log(wrapper.props);
    expect(wrapper).toMatchSnapshot();
  });

  it("should request exchange rates after mount", () => {
    wrapper.instance().componentDidMount();
    expect(mockProps.fetchExchangeRates).toBeCalled();
  });

  it("should do swap", () => {
    wrapper.find(".swap-btn").simulate("click");
    expect(mockProps.doSwap).toBeCalled();
  });
});
