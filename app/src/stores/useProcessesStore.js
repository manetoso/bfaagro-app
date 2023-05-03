import { create } from 'zustand'

import {
  fetchRawMaterial,
  createData,
  updateData,
  deleteData
} from '@/services/processesServices'
import { fetchData as fetchRecipes } from '@/services/recipesServices'
import {
  fetchWarehouses,
  fetchProcessStatusTypes
} from '@/services/globalServices'

export const FIELDS_TYPES = {
  PROCESSES: 'processesData'
}

export const useProcessesStore = create((set, get) => ({
  processesData: [],
  materials: [],
  recipes: [],
  warehouses: [],
  processesStatus: [],
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
    const { [field]: data, selected, materials } = get()
    element.id = selected.id
    const index = data.findIndex((e) => e.id === element.id)
    if (index === -1) {
      const {
        data: newElement,
        error: { errors, msg }
      } = await createData(element)
      if (errors.length > 0) {
        const details = errors.map((e) => {
          const product = materials.find((m) => m.name === e.product)
          return {
            id: product.id,
            name: product.name,
            quantity: e.existing
          }
        })
        set((state) => ({
          ...state,
          error: {
            message: 'No hay suficiente materia prima para realizar el proceso, por favor sustituya los productos o agregue más materia prima *',
            status: true,
            details
          }
        }))
        return
      }
      set((state) => ({
        ...state,
        [field]: [newElement, ...data],
        editModal: false
      }))
    }
    // if (index !== -1) {
    //   // const newElement = await updateData(element)
    //   // data[index] = newElement
    //   data[index] = element
    //   set((state) => ({
    //     ...state,
    //     [field]: [...data],
    //     editModal: false
    //   }))
    // }
  },
  changeProcessStatus: async (id, field) => {
    const { [field]: data } = get()
    const index = data.findIndex((e) => e.id === id)
    if (index !== -1) {
      const newElement = await updateData({ id })
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
  removeError: () => {
    set((state) => ({ ...state, error: { message: '', status: false } }))
  },
  fetchExtraData: async () => {
    const recipes = await fetchRecipes()
    const warehouses = await fetchWarehouses()
    const materials = await fetchRawMaterial()
    const processesStatus = await fetchProcessStatusTypes()
    set((state) => ({
      ...state,
      materials,
      recipes,
      warehouses,
      processesStatus
    }))
  }
}))
