import { create } from 'zustand'

import {
  fetchLogbook,
  fetchLogbookByMovement,
  fetchTop5PurchasingProducts,
  fetchTop5SellingProducts
} from '@/services/logbookService'
import { LOGBOOK_TYPES } from '@/utils/consts'
import {
  aggregateProductSalesLastPeriod,
  calculateYearMovements,
  calculateYearMovementsByMonth
} from '@/utils/logbookUtils'

export const FIELDS_TYPES = {
  LOGBOOK: 'logbookData'
}

export const useLogbookStore = create((set, get) => ({
  logbookData: [],
  yearMovements: [],
  yearMovementsMXN: [],
  yearMovementsUSD: [],
  yearMovementsByMonth: [],
  yearMovementsMxnByMonth: [],
  yearMovementsUsdByMonth: [],
  last30DayProductsSale: [],
  last30DayProductsPurchased: [],
  topSellingProducts: [],
  topPurchasingProducts: [],
  detailsModal: false,
  selected: {},
  isLogbookEmpty: true,

  loadAllLogbookData: async () => {
    const data = await fetchLogbook()
    set((state) => ({
      ...state,
      logbookData: data,
      isLogbookEmpty: data.length === 0
    }))
  },
  toggleDetailsModalModal: (newSelected) => {
    set((state) => ({
      ...state,
      selected: newSelected,
      detailsModal: !state.detailsModal
    }))
  },
  fetchExtraData: async () => {
    const { isLogbookEmpty } = get()
    if (isLogbookEmpty) return
    const purchases = await fetchLogbookByMovement(LOGBOOK_TYPES.PURCHASE)
    const sales = await fetchLogbookByMovement(LOGBOOK_TYPES.SALE)
    const {
      yearMovementsByMonth,
      yearMovementsMxnByMonth,
      yearMovementsUsdByMonth
    } = calculateYearMovementsByMonth(sales, purchases)
    const { yearMovements, yearMovementsMXN, yearMovementsUSD } =
      calculateYearMovements(sales, purchases)
    const last30DayProductsSale = await aggregateProductSalesLastPeriod(
      sales,
      30
    )
    const last30DayProductsPurchased = await aggregateProductSalesLastPeriod(
      purchases,
      30
    )
    const topSellingProducts = await fetchTop5SellingProducts()
    const topPurchasingProducts = await fetchTop5PurchasingProducts()
    set((state) => ({
      ...state,
      purchasesData: purchases,
      salesData: sales,
      yearMovements,
      yearMovementsMXN,
      yearMovementsUSD,
      yearMovementsByMonth,
      yearMovementsMxnByMonth,
      yearMovementsUsdByMonth,
      last30DayProductsSale,
      last30DayProductsPurchased,
      topSellingProducts,
      topPurchasingProducts
    }))
  }
}))
