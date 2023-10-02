export function getAllProductsSaleInTheYearGroupByMonth(
  movementData,
  currency = undefined
) {
  const monthSalesMap = {}
  const currentYear = new Date().getFullYear()
  let filteredData = []
  if (currency === undefined) {
    filteredData = movementData
  } else {
    filteredData = movementData.filter((sale) => sale.currency === currency)
  }
  // Iterate through the movement data and group by month
  filteredData.forEach((sale) => {
    const createdAt = new Date(sale.createdAt)
    const month = createdAt.toLocaleString('es-MX', { month: 'long' })
    const year = createdAt.toLocaleString('es-MX', { year: 'numeric' })
    if (year !== currentYear.toString()) {
      return
    }
    const total = currency === undefined ? sale.product.length : sale.total

    if (!monthSalesMap[month]) {
      monthSalesMap[month] = 0
    }

    monthSalesMap[month] += total
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

export function getAllProductsSaleInTheYear(
  movementData,
  currency = undefined
) {
  const yearSalesMap = {}
  const currentYear = new Date().getFullYear()
  let filteredData = []
  if (currency === undefined) {
    filteredData = movementData
  } else {
    filteredData = movementData.filter((sale) => sale.currency === currency)
  }

  // Iterate through the movement data and group by month
  filteredData.forEach((sale) => {
    const createdAt = new Date(sale.createdAt)
    const year = createdAt.toLocaleString('es-MX', { year: 'numeric' })
    if (year !== currentYear.toString()) {
      return
    }
    const total = currency === undefined ? sale.product.length : sale.total

    if (!yearSalesMap[year]) {
      yearSalesMap[year] = 0
    }

    yearSalesMap[year] += total
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

export function calculateYearMovements(sales, purchases) {
  const yearSales = getAllProductsSaleInTheYear(sales)
  const yearPurchase = getAllProductsSaleInTheYear(purchases)
  const yearSalesMXN = getAllProductsSaleInTheYear(sales, 'MXN')
  const yearPurchaseMXN = getAllProductsSaleInTheYear(purchases, 'MXN')
  const yearSalesUSD = getAllProductsSaleInTheYear(sales, 'USD')
  const yearPurchaseUSD = getAllProductsSaleInTheYear(purchases, 'USD')
  const yearMovements = [
    { name: 'ventas', value: yearSales[0]?.ventas },
    { name: 'compras', value: yearPurchase[0]?.ventas }
  ]
  const yearMovementsMXN = [
    { name: 'ventas', value: yearSalesMXN[0]?.ventas },
    { name: 'compras', value: yearPurchaseMXN[0]?.ventas }
  ]
  const yearMovementsUSD = [
    { name: 'ventas', value: yearSalesUSD[0]?.ventas },
    { name: 'compras', value: yearPurchaseUSD[0]?.ventas }
  ]

  return { yearMovements, yearMovementsMXN, yearMovementsUSD }
}

export function calculateYearMovementsByMonth(sales, purchases) {
  const yearSalesByMonth = getAllProductsSaleInTheYearGroupByMonth(sales)
  const yearPurchasesByMonth =
    getAllProductsSaleInTheYearGroupByMonth(purchases)
  const yearSalesMXNByMonth = getAllProductsSaleInTheYearGroupByMonth(
    sales,
    'MXN'
  )
  const yearSalesUSDByMonth = getAllProductsSaleInTheYearGroupByMonth(
    sales,
    'USD'
  )
  const yearPurchasesMXNByMonth = getAllProductsSaleInTheYearGroupByMonth(
    purchases,
    'MXN'
  )
  const yearPurchasesUSDByMonth = getAllProductsSaleInTheYearGroupByMonth(
    purchases,
    'USD'
  )
  // prettier-ignore
  const yearMovementsMxnByMonth =
    yearSalesMXNByMonth.length > 0 && yearSalesMXNByMonth.length > yearPurchasesMXNByMonth.length
      ? yearSalesMXNByMonth.map((sale, index) => ({
        name: sale?.name || yearPurchasesMXNByMonth[index]?.name,
        ventas: sale?.ventas || 0,
        compras: yearPurchasesMXNByMonth[index]?.ventas || 0
      }))
      : yearPurchasesMXNByMonth.map((purchase, index) => ({
        name: purchase?.name || yearSalesMXNByMonth[index]?.name,
        ventas: yearSalesMXNByMonth[index]?.ventas || 0,
        compras: purchase?.ventas || 0
      }))
  // prettier-ignore
  const yearMovementsUsdByMonth =
    yearSalesUSDByMonth.length > 0 && yearSalesUSDByMonth.length > yearPurchasesUSDByMonth.length
      ? yearSalesUSDByMonth.map((sale, index) => ({
        name: sale?.name || yearPurchasesUSDByMonth[index]?.name,
        ventas: sale?.ventas || 0,
        compras: yearPurchasesUSDByMonth[index]?.ventas || 0
      }))
      : yearPurchasesUSDByMonth.map((purchase, index) => ({
        name: purchase?.name || yearSalesUSDByMonth[index]?.name,
        ventas: yearSalesUSDByMonth[index]?.ventas || 0,
        compras: purchase?.ventas || 0
      }))
  // prettier-ignore
  const yearMovementsByMonth =
    yearSalesByMonth.length > 0 && yearSalesByMonth.length > yearPurchasesByMonth.length
      ? yearSalesByMonth.map((sale, index) => ({
        name: sale?.name || yearPurchasesByMonth[index]?.name,
        ventas: sale?.ventas || 0,
        compras: yearPurchasesByMonth[index]?.ventas || 0
      }))
      : yearPurchasesByMonth.map((purchase, index) => ({
        name: purchase?.name || yearSalesByMonth[index]?.name,
        ventas: yearSalesByMonth[index]?.ventas || 0,
        compras: purchase?.ventas || 0
      }))
  return {
    yearMovementsByMonth,
    yearMovementsMxnByMonth,
    yearMovementsUsdByMonth
  }
}
