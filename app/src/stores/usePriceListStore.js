import { create } from 'zustand'

import {
  createData,
  updateData,
  deleteData,
  fetchData
} from '@/services/priceListServices'
import { fetchPriceListTypes } from '@/services/globalServices'
import { fetchData as fetchWarehouseData } from '@/services/warehouseServices'

import { PRODUCT_TYPES } from '@/utils/consts'

export const FIELDS_TYPES = {
  PRICE_LIST: 'priceListData'
}

export const usePriceListStore = create((set, get) => ({
  priceListData: [],
  productsData: [],
  priceListTypesData: [],
  accountsReceivableData: [],
  suppliersData: [],
  companyData: {},
  editModal: false,
  alert: false,
  showAddButton: true,
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
    const priceListData = await fetchData()
    const priceListTypes = await fetchPriceListTypes()
    const products = await fetchWarehouseData()
    const filteredProducts = products.filter((product) =>
      product.productType.some(
        (type) => type.name === PRODUCT_TYPES.FINISHED_PRODUCT
      )
    )
    const productsNotInPriceListData = filteredProducts.filter((product) => {
      const index = priceListData.findIndex(
        (priceList) => priceList.productId === product.id
      )
      return index === -1
    })
    if (productsNotInPriceListData.length === 0) {
      set((state) => ({ ...state, showAddButton: false }))
    }
    set((state) => ({
      ...state,
      priceListData,
      productsData: productsNotInPriceListData,
      priceListTypesData: priceListTypes
    }))
  }
}))
