import {
  fetchWarehouses,
  fetchProductTypes,
  createData,
  updateData,
  deleteData
} from '@/services/warehouseServices'
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
  warehouses: [],
  productTypes: [],
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
    const { warehouses, productTypes, selected } = get()
    const warehouse = warehouses.find((w) => w.id === element.idWarehouse)
    const productType = productTypes.find((p) => p.id === element.idProductType)

    delete element.idProductType
    delete element.idWarehouse
    element.id = selected.id
    element.warehouse = {
      id: warehouse.id,
      name: warehouse.name
    }
    element.productType = [
      {
        id: productType.value.id,
        name: productType.value.productType
      }
    ]
    if (element.idProductType2) {
      const productType2 = productTypes.find((p) => p.id === element.idProductType2)
      delete element.idProductType2
      element.productType.push({
        id: productType2.value.id,
        name: productType2.value.productType
      })
    }

    const { [field]: data } = get()
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
  fetchWarehousesFromApi: async () => {
    const newWarehouses = await fetchWarehouses()
    set((state) => ({ ...state, warehouses: newWarehouses }))
  },
  fetchProductTypesFromApi: async () => {
    const newProductTypes = await fetchProductTypes()
    set((state) => ({ ...state, productTypes: newProductTypes }))
  }
}))
