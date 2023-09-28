import { create } from 'zustand'

import { fetchLogbook, fetchLogbookByMovement } from '@/services/logbookService'
import { LOGBOOK_TYPES } from '@/utils/consts'
import {
  aggregateProductSalesLastPeriod,
  getAllProductsSaleInTheYear,
  getAllProductsSaleInTheYearGroupByMonth
} from '@/utils/logbookUtils'

export const FIELDS_TYPES = {
  LOGBOOK: 'logbookData'
}

export const useLogbookStore = create((set, get) => ({
  logbookData: [],
  yearMovements: [],
  yearMovementsByMonth: [],
  last30DayProductsSale: [],
  last30DayProductsPurchased: [],
  detailsModal: false,
  selected: {},

  loadAllLogbookData: async () => {
    const data = await fetchLogbook()
    set((state) => ({
      ...state,
      logbookData: data
    }))
  },
  toggleDetailsModalModal: (newSelected) => {
    set((state) => ({
      ...state,
      selected: newSelected,
      detailsModal: !state.detailsModal
    }))
  },
  getAllMovementsOfTheDay: (movementData) => {
    const today = new Date()
    const todaySales = movementData.filter((sale) => {
      const saleDate = new Date(sale.createdAt)
      return (
        saleDate.getDate() === today.getDate() &&
        saleDate.getMonth() === today.getMonth() &&
        saleDate.getFullYear() === today.getFullYear()
      )
    })
    return todaySales
  },
  getAllMovementsOfThePast15Days: (movementData) => {
    const today = new Date()
    const todaySales = movementData.filter((sale) => {
      const saleDate = new Date(sale.createdAt)
      return (
        saleDate.getDate() >= today.getDate() - 15 &&
        saleDate.getMonth() === today.getMonth() &&
        saleDate.getFullYear() === today.getFullYear()
      )
    })
    return todaySales
  },
  getAllMovementsOfTheMonth: (movementData) => {
    const today = new Date()
    const todaySales = movementData.filter((sale) => {
      const saleDate = new Date(sale.createdAt)
      return (
        saleDate.getMonth() === today.getMonth() &&
        saleDate.getFullYear() === today.getFullYear()
      )
    })
    return todaySales
  },
  fetchExtraData: async () => {
    const purchases = await fetchLogbookByMovement(LOGBOOK_TYPES.PURCHASE)
    const sales = await fetchLogbookByMovement(LOGBOOK_TYPES.SALE)
    const yearSalesByMonth = await getAllProductsSaleInTheYearGroupByMonth(
      sales
    )
    const yearPurchasesByMonth = await getAllProductsSaleInTheYearGroupByMonth(
      purchases
    )
    const yearMovementsByMonth = yearSalesByMonth.map((sale, index) => ({
      ...sale,
      compras: yearPurchasesByMonth[index]?.ventas || 0
    }))
    const yearSales = await getAllProductsSaleInTheYear(sales)
    const yearPurchase = await getAllProductsSaleInTheYear(purchases)
    const yearMovements = [
      { name: 'ventas', value: yearSales[0].ventas },
      { name: 'compras', value: yearPurchase[0].ventas }
    ]
    const last30DayProductsSale = await aggregateProductSalesLastPeriod(
      sales,
      30
    )
    const last30DayProductsPurchased = await aggregateProductSalesLastPeriod(
      purchases,
      30
    )
    set((state) => ({
      ...state,
      purchasesData: purchases,
      salesData: sales,
      yearMovementsByMonth,
      yearMovements,
      last30DayProductsSale,
      last30DayProductsPurchased
    }))
  }
}))
