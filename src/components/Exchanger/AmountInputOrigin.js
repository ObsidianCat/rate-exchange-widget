import { InputNumber } from 'antd';
import React from "react";
import { connect } from "react-redux";
import {updateOriginAmount} from "../../actions";

class AmountInputOrigin extends React.Component{

  render(){
    return (
      <InputNumber min={0} value={this.props.exchange.amount} onChange={this.props.updateOriginAmount} />
    )
  }
}

const mapStateToProps = ({exchange }) => ({
  exchange
});

export default connect(
  mapStateToProps,
  { updateOriginAmount }
)(AmountInputOrigin);