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

/**
 *
 * @param {string} phoneNumberString
 * @returns {string} formatted phone number
 */
export const formatPhoneNumber = (phoneNumberString) => {
  if (!phoneNumberString) {
    return ''
  }
  if (phoneNumberString.length <= 10)
    return phoneNumberString
      .replace(/[^\d]+/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  if (phoneNumberString.length === 11)
    return phoneNumberString
      .replace(/[^\d]+/g, '')
      .replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4')
  if (phoneNumberString.length === 12)
    return phoneNumberString
      .replace(/[^\d]+/g, '')
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4')
}

/**
 * @param {string} date
 * @returns {string} formatted date
 * @description format date to MM/DD/YYYY
 */
export const formatDate = (date) => {
  const newDate = new Date(date)
  return `${
    newDate.getMonth() + 1
  } / ${newDate.getDate()} / ${newDate.getFullYear()}`
}
