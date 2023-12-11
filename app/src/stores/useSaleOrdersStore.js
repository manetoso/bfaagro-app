import { create } from 'zustand'

import {
  createData,
  updateData,
  deleteData
} from '@/services/saleOrdersServices'
import { fetchCompanyData } from '@/services/settingsServices'
import { fetchData as fetchClientsData } from '@/services/clientsServices'
import { fetchData as fetchWarehouseData } from '@/services/warehouseServices'
import { fetchData as fetchPriceListData } from '@/services/priceListServices'
import { fetchSaleStatusTypes } from '@/services/globalServices'

import { PRODUCT_TYPES } from '@/utils/consts'

export const FIELDS_TYPES = {
  SALE_ORDERS: 'saleOrdersData'
}

export const useSaleOrdersStore = create((set, get) => ({
  saleOrdersData: [],
  clientsData: [],
  productsData: [],
  priceListData: [],
  saleStatusTypes: [],
  companyData: {},
  editModal: false,
  pdfView: false,
  alert: false,
  priceListWarning: false,
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
  printPurchaseOrder: (newSelected) => {
    set((state) => ({
      ...state,
      selected: newSelected,
      pdfView: !state.pdfView
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
      const newElement = await updateData(element, selected.saleDetails.id)
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
    const clients = await fetchClientsData()
    const company = await fetchCompanyData()
    const products = await fetchWarehouseData()
    const saleStatusTypes = await fetchSaleStatusTypes()
    const priceList = await fetchPriceListData()
    const filteredProducts = products.filter((product) =>
      product.productType.some(
        (type) => type.name === PRODUCT_TYPES.FINISHED_PRODUCT
      )
    )
    await clients.forEach((client) => {
      client.name = `${client.name} ${client.lastName}`
    })
    // NOTES: CONDITION WHERE CHANGE BECAUSE THERE IS A DATA INCONSISTENCY
    if (priceList.length < filteredProducts.length) {
      return set((state) => ({
        ...state,
        clientsData: clients,
        companyData: company,
        priceListWarning: true,
        saleStatusTypes
      }))
    }
    set((state) => ({
      ...state,
      clientsData: clients,
      productsData: filteredProducts,
      companyData: company,
      priceListData: priceList,
      saleStatusTypes
    }))
  }
}))
