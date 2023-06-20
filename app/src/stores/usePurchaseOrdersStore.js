import { create } from 'zustand'

import {
  createData,
  updateData,
  deleteData
} from '@/services/purchaseOrdersServices'
import { fetchCompanyData } from '@/services/settingsServices'
import { fetchData as fetchSupplierData } from '@/services/suppliersServices'
import { fetchData as fetchWarehouseData } from '@/services/warehouseServices'

import { PRODUCT_TYPES } from '@/utils/consts'

export const FIELDS_TYPES = {
  PURCHASE_ORDERS: 'purchaseOrdersData'
}

export const usePurchaseOrdersStore = create((set, get) => ({
  purchaseOrdersData: [],
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
    console.log({ index, element, field })
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
    const suppliers = await fetchSupplierData()
    const company = await fetchCompanyData()
    const products = await fetchWarehouseData()
    const filteredProducts = products.filter((product) =>
      product.productType.some(
        (type) =>
          type.name === PRODUCT_TYPES.RAW_MATERIAL_PRODUCT ||
          type.name === PRODUCT_TYPES.PACKAGING_PRODUCT
      )
    )
    set((state) => ({
      ...state,
      suppliersData: suppliers,
      productsData: filteredProducts,
      companyData: company
    }))
  }
}))
