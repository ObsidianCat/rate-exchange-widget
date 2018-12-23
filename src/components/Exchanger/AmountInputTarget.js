import React from "react";
import { InputNumber } from "antd";
import { connect } from "react-redux";
import { updateOriginAmount } from "../../actions";
import {
  calculateTargetFromOrigin,
  calculateOriginFromTarget
} from "../../utils";

class AmountInputTarget extends React.Component {
  calculateOrigin = target => {
    const origin = calculateOriginFromTarget(
      target,
      this.props.exchangeRates,
      this.props.exchange.targetCurrency
    );
    this.props.updateOriginAmount(origin);
  };

  render() {
    const { exchange, exchangeRates } = this.props;
    const result = calculateTargetFromOrigin(
      exchange.amount,
      exchangeRates,
      exchange.targetCurrency
    );
    return (
      <InputNumber
        min={0}
        value={isNaN(result) ? 0 : result}
        onChange={this.calculateOrigin}
      />
    );
  }
}

const mapStateToProps = ({ exchange, exchangeRates }) => ({
  exchange,
  exchangeRates
});

export default connect(
  mapStateToProps,
  { updateOriginAmount }
)(AmountInputTarget);
