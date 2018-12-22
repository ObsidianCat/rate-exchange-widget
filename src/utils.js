export function calculateTargetFromOrigin(
  originAmount,
  exchangeRates,
  targetCurrency
) {
  return Number(originAmount * exchangeRates[targetCurrency]).toFixed(2);
}

export function calculateOriginFromTarget(
  targetAmount,
  exchangeRates,
  targetCurrency
) {
  return Number(targetAmount / exchangeRates[targetCurrency]).toFixed(2);
}
