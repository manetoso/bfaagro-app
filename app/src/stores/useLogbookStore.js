import { create } from 'zustand'

import { fetchLogbook } from '@/services/globalServices'
import { fetchSupplierTypes } from '@/services/suppliersServices'

export const FIELDS_TYPES = {
  LOGBOOK: 'logbookData'
}

export const useLogbookStore = create((set, get) => ({
  logbookData: [],
  supliierTypeData: [],
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
  fetchExtraData: async () => {
    const types = await fetchSupplierTypes()
    set((state) => ({
      ...state,
      supliierTypeData: types
    }))
  }
}))
