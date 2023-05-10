import { create } from 'zustand'

import { fetchProductsForDetails, createData, updateData, deleteData } from '@/services/packagingServices'

export const FIELDS_TYPES = {
  RECIPES: 'packagingData'
}

export const usePackagingStore = create((set, get) => ({
  packagingData: [],
  finishedProducts: [],
  packagingProducts: [],
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
      const newElement = await createData(element)
      set((state) => ({
        ...state,
        [field]: [newElement, ...data],
        editModal: false
      }))
    }
    if (index !== -1) {
      const newElement = await updateData(element)
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
  fetchProductsForDetailsFromApi: async () => {
    const { products, packaging } = await fetchProductsForDetails()
    set((state) => ({ ...state, finishedProducts: products, packagingProducts: packaging }))
  }
}))
