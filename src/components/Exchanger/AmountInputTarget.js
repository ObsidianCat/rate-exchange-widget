import React from "react";
import {InputNumber} from "antd";
import connect from "react-redux/es/connect/connect";
import {updateOriginAmount} from "../../actions";

class AmountInputTarget extends React.Component{
  calculateOrigin = (target)=>{
    const origin = target / this.props.exchangeRates[this.props.exchange.targetCurrency];
    this.props.updateOriginAmount(origin)
  }

  render(){
    const originAmount= this.props.exchange.amount
    const exchangeRate= this.props.exchangeRates[this.props.exchange.targetCurrency]
    const result = originAmount / exchangeRate || 0;
    return <InputNumber min={1} value={result} onChange={this.calculateOrigin} />
  }
}

const mapStateToProps = ({exchange, exchangeRates }) => ({
  exchange,
  exchangeRates
});

export default connect(
  mapStateToProps,
  { updateOriginAmount }
)(AmountInputTarget);
