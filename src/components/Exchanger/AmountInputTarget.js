import React from "react";

function AmountInputTarget({ originAmount, exchangeRate }) {
  const result = originAmount * exchangeRate;
  return (<p className='exchange-result'>{result? result: ''}</p>);
}

export default AmountInputTarget;
