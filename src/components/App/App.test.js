import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

let wrapper;

beforeEach(()=>{
  wrapper =  shallow(<App />);
})

afterEach(()=>{
  wrapper.unmount()
})

it('renders as snapshot', () => {
  expect(wrapper).toMatchSnapshot();

});
