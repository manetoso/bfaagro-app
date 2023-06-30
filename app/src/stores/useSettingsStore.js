import { create } from 'zustand'
import {
  createUpdateCompanyData,
  createData,
  updateData,
  deleteData
} from '@/services/settingsServices'

export const FIELDS_TYPES = {
  SETTINGS: 'settingsData',
  USERS: 'usersData',
  ROLES: 'rolesData'
}

export const useSettingsStore = create((set, get) => ({
  settingsData: [],
  usersData: [],
  rolesData: [],
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
  addOrEditSettingsElement: async (element) => {
    const newElement = await createUpdateCompanyData(element)
    set((state) => ({
      ...state,
      settingsData: newElement
    }))
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
    const deletedFlag = await deleteData(selected.id, field)
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
  }
  // fetchProductsForDetailsFromApi: async ({ field }) => {
  //   const { material, products } = await fetchProductsForDetails({ field })
  //   set((state) => ({
  //     ...state,
  //     detailProductsData: material,
  //     productsData: products,
  //     unityTypes: newUnityTypes
  //   }))
  // }
}))
