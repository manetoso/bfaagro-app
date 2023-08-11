import { create } from 'zustand'

import { createData, updateData, deleteData } from '@/services/chargesServices'
import { fetchData as fetchSupplierData } from '@/services/suppliersServices'
import { fetchData as fetchAccountsReceivable } from '@/services/accountsReceivableServices'

export const FIELDS_TYPES = {
  CHARGES: 'chargesData'
}

export const useChargesStore = create((set, get) => ({
  chargesData: [],
  accountsReceivableData: [],
  suppliersData: [],
  productsData: [],
  companyData: {},
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
    if (index === -1) {
      const newElement = await createData(element, field)
      set((state) => ({
        ...state,
        [field]: [newElement, ...data],
        editModal: false
      }))
    }
    if (index !== -1) {
      const newElement = await updateData(element, field)
      data[index] = newElement
      set((state) => ({
        ...state,
        [field]: [...data],
        editModal: false
      }))
    }
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
    const accountsReceivable = await fetchAccountsReceivable()
    const filteredAccountsReceivable = accountsReceivable.filter(
      (ar) => ar.status.toLowerCase() === 'pendiente'
    )

    const suppliers = await fetchSupplierData()
    set((state) => ({
      ...state,
      accountsReceivableData: filteredAccountsReceivable,
      suppliersData: suppliers
    }))
  }
}))
