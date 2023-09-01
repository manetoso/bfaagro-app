import { create } from 'zustand'

import {
  fetchLogbook
} from '@/services/globalServices'

export const FIELDS_TYPES = {
  LOGBOOK: 'logbookData'
}

export const useLogbookStore = create((set, get) => ({
  /**
   * @type {{ id: string, identifier: string, movement: string, product: { id: string, productId: string, productName: string, quantity: number, }[], createdAt: string, createdAtFormatted: string, }[] | []} logbook data
   */
  logbookData: [],
  detailsModal: false,
  selected: {},

  loadAllLogbookData: async () => {
    const data = await fetchLogbook()
    // console.log({ data })
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
  }
  // fetchExtraData: async () => {
  //   const types = await fetchSupplierTypes()
  //   set((state) => ({
  //     ...state,
  //     supliierTypeData: types
  //   }))
  // }
}))
