export function calculateTargetFromOrigin(originAmount, exchangeRates, targetCurrency){
  return (originAmount * exchangeRates[targetCurrency]).toFixed(2)
}

export function calculateOriginFromTarget(targetAmount, exchangeRates, targetCurrency){
  return targetAmount / exchangeRates[targetCurrency];
}