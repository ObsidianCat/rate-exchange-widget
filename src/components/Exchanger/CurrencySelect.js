import React from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import { setCurrencyTypeTarget, setCurrencyTypeOrigin } from "../../actions";
import { CURRENCY_ORIGIN } from "./constants";

const Option = Select.Option;

class CurrencySelect extends React.Component {
  handleCurrencyChange = value => {
    if (this.props.curType === CURRENCY_ORIGIN) {
      this.props.setCurrencyTypeOrigin(value, this.props.curType);
    } else {
      this.props.setCurrencyTypeTarget(value, this.props.curType);
    }
  };

  render() {
    const options = [];
    for (let prop in this.props.exchangeRates) {
      options.push(
        <Option value={prop} key={prop}>
          {prop}
        </Option>
      );
    }

    const selected =
      this.props.curType === CURRENCY_ORIGIN
        ? this.props.exchange.originCurrency
        : this.props.exchange.targetCurrency;

    return (
      <Select
        value={selected}
        style={{ width: 120 }}
        onChange={this.handleCurrencyChange}
      >
        {options}
      </Select>
    );
  }
}

const mapStateToProps = ({ exchange }) => ({
  exchange
});

export default connect(
  mapStateToProps,
  { setCurrencyTypeOrigin, setCurrencyTypeTarget }
)(CurrencySelect);
