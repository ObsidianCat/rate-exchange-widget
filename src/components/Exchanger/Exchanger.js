import React from "react";
import { connect } from "react-redux";
import { fetchExchangeRates, swapCurrencyType, doSwap } from "../../actions";
import CurrencySelect from "./CurrencySelect";
import AmountInputOrigin from "./AmountInputOrigin";
import AmountInputTarget from "./AmountInputTarget";
import { CURRENCY_ORIGIN, CURRENCY_TARGET } from "./constants";
import { Button } from "antd";
import "./Exchanger.css";
import { Card } from "antd";

export class ExchangerComponent extends React.Component {
  componentDidMount() {
    this.props.fetchExchangeRates();
    this.fetcherRef = setInterval(this.props.fetchExchangeRates, 100000);
  }

  componentWillUnmount() {
    clearInterval(this.fetcherRef);
  }

  render() {
    return (
      <Card className="exchanger">
        <div className="origin">
          <CurrencySelect
            exchangeRates={this.props.exchangeRates}
            selected={this.props.exchange.originCurrency}
            curType={CURRENCY_ORIGIN}
          />
          <AmountInputOrigin />
        </div>

        <div>
          <Button
            type="primary"
            icon="swap"
            size={"small"}
            onClick={this.props.doSwap}
            className="swap-btn"
          >
            Swap
          </Button>
        </div>
        <div className="target">
          <CurrencySelect
            exchangeRates={this.props.exchangeRates}
            selected={this.props.exchange.targetCurrency}
            curType={CURRENCY_TARGET}
          />
          <AmountInputTarget
            originAmount={this.props.exchange.amount}
            exchangeRate={
              this.props.exchangeRates[this.props.exchange.targetCurrency]
            }
          />
        </div>
      </Card>
    );
  }
}

const mapStateToProps = ({ exchangeRates, exchange }) => ({
  exchangeRates,
  exchange
});

export default connect(
  mapStateToProps,
  { fetchExchangeRates, swapCurrencyType, doSwap }
)(ExchangerComponent);
