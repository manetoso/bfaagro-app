export function formatNumberToMoneyString(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value)
}

export const formatNumberToString = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
    .format(number)
    .substring(1)
}

/**
 *
 * @param {React.ChangeEvent<HTMLInputElement>} event
 * @param {number} minValue
 * @param {number} maxValue
 */
export const handleInputMinMaxValue = (event, minValue, maxValue) => {
  if (event.target.value > maxValue) {
    event.target.value = maxValue
  }
  if (event.target.value < minValue) {
    event.target.value = minValue
  }
}
