import { convertToDBSchema } from '@/services/warehouseServices'
import { create } from 'zustand'

export const FIELDS_TYPES = {
  RAW_MATERIAL: 'rawMaterialData',
  PRODUCTS: 'productsData',
  PACKAGING: 'packagingData'
}

export const useWarehouseStore = create((set, get) => ({
  rawMaterialData: [],
  productsData: [],
  packagingData: [],
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
    const elementToDBSchema = await convertToDBSchema(element)
    console.log({ element, elementToDBSchema })
    const { [field]: data } = get()
    const index = data.findIndex((e) => e.id === element.id)
    if (index === -1) {
      set((state) => ({
        ...state,
        [field]: [element, ...data],
        editModal: false
      }))
    }
    if (index !== -1) {
      data[index] = element
      set((state) => ({
        ...state,
        [field]: [...data],
        editModal: false
      }))
    }
  },
  removeElement: (field) => {
    const { [field]: data, selected } = get()
    const index = data.findIndex((e) => e.id === selected.id)
    if (index !== -1) {
      data.splice(index, 1)
      set((state) => ({
        ...state,
        [field]: [...data],
        alert: false
      }))
    }
  }
}))
