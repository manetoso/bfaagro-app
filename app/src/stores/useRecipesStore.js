import { create } from 'zustand'

export const FIELDS_TYPES = {
  RECIPES: 'recipesData',
}

export const useRecipesStore = create((set, get) => ({
  recipesData: [],
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
  addOrEditElement: (element, field) => {
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
