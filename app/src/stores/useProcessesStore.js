import { create } from 'zustand'

import {
  fetchRawMaterial,
  createData,
  updateData,
  deleteData
} from '@/services/processesServices'
import { fetchData as fetchRecipes } from '@/services/recipesServices'
import { fetchWarehouses } from '@/services/globalServices'

export const FIELDS_TYPES = {
  RECIPES: 'recipesData'
}

export const useProcessesStore = create((set, get) => ({
  recipesData: [],
  materials: [],
  recipes: [],
  warehouses: [],
  error: {
    message: '',
    status: false,
    details: []
  },
  detailModal: false,
  editModal: false,
  alert: false,
  selected: {},

  toggleAddModal: () => {
    set((state) => ({
      ...state,
      selected: {},
      editModal: !state.editModal,
      error: {
        message: '',
        status: false
      }
    }))
  },
  toggleAlert: (newSelected) => {
    set((state) => ({ ...state, alert: !state.alert, selected: newSelected }))
  },
  toggleEditModal: (newSelected) => {
    set((state) => ({
      ...state,
      selected: newSelected,
      editModal: !state.editModal,
      error: {
        message: '',
        status: false
      }
    }))
  },
  toggleDetailModal: (newSelected) => {
    set((state) => ({
      ...state,
      selected: newSelected,
      detailModal: !state.detailModal
    }))
  },
  setDataFilds: (newData, field) => {
    set((state) => ({ ...state, [field]: newData }))
  },
  addOrEditElement: async (element, field) => {
    const { [field]: data, selected } = get()
    if (
      element.recipeId === '642f40279c913da51d9aef60' &&
      element.replaceDetails.length === 0
    ) {
      set((state) => ({
        ...state,
        error: {
          message: 'No hay suficiente producto en almacén',
          status: true,
          details: [
            {
              id: '642f21e19c913da51d9aedf3',
              name: 'CALI STROGEN (LTS)',
              quantity: 10
            },
            {
              id: '642ef1359c913da51d9aeb62',
              name: 'BFOSFO (LTS)',
              quantity: 10
            }
          ]
        }
      }))
      return
    }
    // element.id = selected.id
    const index = data.findIndex((e) => e.id === element.id)
    if (index === -1) {
      // const newElement = await createData(element)
      set((state) => ({
        ...state,
        // [field]: [newElement, ...data],
        [field]: [element, ...data],
        editModal: false
      }))
    }
    if (index !== -1) {
      // const newElement = await updateData(element)
      // data[index] = newElement
      data[index] = element
      set((state) => ({
        ...state,
        [field]: [...data],
        editModal: false
      }))
    }
  },
  removeElement: async (field) => {
    const { [field]: data, selected } = get()
    // const deletedFlag = await deleteData(selected.id)
    // if (!deletedFlag) {
    //   return
    // }
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
  removeError: () => {
    set((state) => ({ ...state, error: { message: '', status: false } }))
  },
  fetchExtraData: async () => {
    const recipes = await fetchRecipes()
    const warehouses = await fetchWarehouses()
    const materials = await fetchRawMaterial()
    console.log({ recipes, warehouses, materials })
    set((state) => ({
      ...state,
      materials,
      recipes,
      warehouses
    }))
  }
}))
