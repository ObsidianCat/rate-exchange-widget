import React, { Component } from 'react';
import logo from '../../logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import Exchanger from "../Exchanger/Exchanger";
import store from "../../store";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Exchanger/>
        </Provider>
      </div>
    );
  }
}

export default App;
