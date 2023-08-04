import { create } from 'zustand'

import { updateData, deleteData } from '@/services/accountsReceivableServices'
import { fetchData as fetchSupplierData } from '@/services/suppliersServices'

export const FIELDS_TYPES = {
  ACCOUNTS_RECEIVABLES: 'accounts'
}

export const useAccountsReceivableStore = create((set, get) => ({
  accounts: [],
  suppliersData: [],
  editModal: false,
  alert: false,
  selected: {},

  toggleAddModal: () => {
    set((state) => ({
      ...state,
      selected: {},
      editModal: !state.editModal
    }))
  },
  toggleAlert: (newSelected) => {
    set((state) => ({ ...state, alert: !state.alert, selected: newSelected }))
  },
  toggleEditModal: (newSelected) => {
    set((state) => ({
      ...state,
      selected: newSelected,
      editModal: !state.editModal
    }))
  },
  setDataFilds: (newData, field) => {
    set((state) => ({ ...state, [field]: newData }))
  },
  addOrEditElement: async (element, field) => {
    const { [field]: data, selected } = get()
    element.id = selected.id
    const index = data.findIndex((e) => e.id === element.id)
    const newElement = await updateData(element, field)
    data[index] = newElement
    set((state) => ({
      ...state,
      [field]: [...data],
      editModal: false
    }))
  },
  removeElement: async (field) => {
    const { [field]: data, selected } = get()
    const deletedFlag = await deleteData(selected.id)
    if (!deletedFlag) {
      return
    }
    const index = data.findIndex((e) => e.id === selected.id)
    if (index !== -1) {
      data.splice(index, 1)
      set((state) => ({
        ...state,
        [field]: [...data],
        alert: false
      }))
    }
  },
  fetchExtraData: async () => {
    const suppliers = await fetchSupplierData()
    set((state) => ({
      ...state,
      suppliersData: suppliers
    }))
  }
}))
