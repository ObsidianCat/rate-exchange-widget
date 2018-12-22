import React from "react";

function AmountInputTarget({ originAmount, exchangeRate }) {
  const result = originAmount * exchangeRate;
  return (<p>{result? result: ''}</p>);
}

export default AmountInputTarget;
