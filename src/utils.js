export function calculateTargetFromOrigin(originAmount, exchangeRates, targetCurrency){
  return originAmount * exchangeRates[targetCurrency]
}

export function calculateOriginFromTarget(targetAmount, exchangeRates, targetCurrency){
  return targetAmount / exchangeRates[targetCurrency];
}