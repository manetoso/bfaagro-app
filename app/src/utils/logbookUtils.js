export function getAllProductsSaleInTheYearGroupByMonth(movementData) {
  const monthSalesMap = {}
  const currentYear = new Date().getFullYear()

  // Iterate through the movement data and group by month
  movementData.forEach((sale) => {
    const createdAt = new Date(sale.createdAt)
    const month = createdAt.toLocaleString('es-MX', { month: 'long' })
    const year = createdAt.toLocaleString('es-MX', { year: 'numeric' })
    if (year !== currentYear.toString()) {
      return
    }
    const sales = sale.product.length
    // const sales = sale.product.reduce(
    //   (total, product) => total + product.quantity,
    //   0
    // )

    if (!monthSalesMap[month]) {
      monthSalesMap[month] = 0
    }

    monthSalesMap[month] += sales
  })

  // Convert the grouped data into the desired format
  const result = Object.entries(monthSalesMap).map(([month, sales]) => ({
    name: month,
    ventas: sales
  }))

  // Sort the result by month
  result.sort((a, b) => {
    const months = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ]

    return months.indexOf(a.name) - months.indexOf(b.name)
  })

  return result
}

export function getAllProductsSaleInTheYear(movementData) {
  const yearSalesMap = {}
  const currentYear = new Date().getFullYear()

  // Iterate through the movement data and group by month
  movementData.forEach((sale) => {
    const createdAt = new Date(sale.createdAt)
    const year = createdAt.toLocaleString('es-MX', { year: 'numeric' })
    if (year !== currentYear.toString()) {
      return
    }
    const sales = sale.product.length

    if (!yearSalesMap[year]) {
      yearSalesMap[year] = 0
    }

    yearSalesMap[year] += sales
  })

  // Convert the grouped data into the desired format
  const result = Object.entries(yearSalesMap).map(([year, sales]) => ({
    name: year,
    ventas: sales
  }))

  return result
}

export function aggregateProductSalesLastPeriod(data, period) {
  const currentDate = new Date(Date.now()) // Use the current UTC time
  const periodDaysAgo = new Date(currentDate)
  periodDaysAgo.setUTCDate(currentDate.getUTCDate() - period) // Set UTC date
  // console.log({ periodDaysAgo, currentDate })

  const productSalesMap = {}

  // Filter sales data for the last X days
  const lastPeriodDaysSales = data.filter((sale) => {
    const saleDate = new Date(sale.createdAt)
    return saleDate >= periodDaysAgo && saleDate <= currentDate
  })

  // Iterate through the filtered sales data and aggregate product sales
  lastPeriodDaysSales.forEach((sale) => {
    sale.product.forEach((productItem) => {
      const { productName, quantity } = productItem

      if (!productSalesMap[productName]) {
        productSalesMap[productName] = 0
      }

      productSalesMap[productName] += quantity
    })
  })

  // Convert the aggregated data into the desired format
  const result = Object.entries(productSalesMap).map(
    ([productName, sales]) => ({
      name: productName,
      value: sales
    })
  )

  return result
}
