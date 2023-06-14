import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { useWarehouseStore, FIELDS_TYPES } from '@/stores/useWarehouseStore'
import { formatNumberToString } from '@/utils/utils'

import { fetchData } from '@/services/warehouseServices'
import { fetchProductTypes, fetchWarehouses } from '@/services/globalServices'
import { PRODUCT_TYPES } from '@/utils/consts'

const DEFAULT_FIELD = FIELDS_TYPES.RAW_MATERIAL

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useWareHouseDatatable = ({ field }) => {
  const localField = field || DEFAULT_FIELD
  const {
    rawMaterialData,
    productsData,
    packagingData,
    finishedProductsData,
    editModal,
    alert,
    selected,
    toggleAddModal,
    toggleEditModal,
    toggleAlert,
    setDataFilds,
    addOrEditElement,
    removeElement,
    fetchWarehousesFromApi,
    fetchProductTypesFromApi
  } = useWarehouseStore()
  const [warehouse, setWarehouse] = useState({})
  const [productType, setProductType] = useState({})

  /**
   * @description PREPARING THE DATA TO BE RENDERED IN THE TABLE, FILTERING BY THE SELECTED FIELD
   * @param { { id: string; name: string; quantity: number; unity: string; warehouse: { id: string; name: string; }; productType: { id: number; name: string; }[]; idProductType: number; idWarehouse: string }[] } data
   * @returns
   */
  const prepareDataByfield = async (data, field) => {
    const warehouses = await fetchWarehouses()
    const productTypes = await fetchProductTypes()
    setWarehouse(warehouses.find((x) => x.warehouseType.name === field))
    setProductType(productTypes.find((x) => x.value.productType === field))
    return data.filter((x) => x.productType.some((y) => y.name === field))
  }

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.RAW_MATERIAL]: async (data) => {
      console.warn('rawMaterial')
      return prepareDataByfield(data, PRODUCT_TYPES.RAW_MATERIAL_PRODUCT)
    },
    [FIELDS_TYPES.PRODUCTS]: async (data) => {
      console.warn('products')
      return prepareDataByfield(data, PRODUCT_TYPES.SIMPLE_PRODUCT)
    },
    [FIELDS_TYPES.PACKAGING]: async (data) => {
      console.warn('packaging')
      return prepareDataByfield(data, PRODUCT_TYPES.PACKAGING_PRODUCT)
    },
    [FIELDS_TYPES.FINISHED_PRODUCTS]: async (data) => {
      console.warn('finished products')
      return prepareDataByfield(data, PRODUCT_TYPES.FINISHED_PRODUCT)
    }
  }

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Nombre',
        cell: (info) => (
          <span className='flex items-center justify-between gap-2 font-bold'>
            {info.getValue()}{' '}
            <DropdownMenu
              openAlert={() => toggleAlert(info.cell.row.original)}
              openModal={() => {
                toggleEditModal(info.cell.row.original)
              }}
            />
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('quantity', {
        header: 'Cantidad',
        cell: (info) => (
          <span
            className={`${
              info.getValue() <= info.row.original.minQuantity &&
              'font-bold text-rose-500'
            }`}
          >
            {formatNumberToString(info.getValue())}
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('unity', {
        header: 'Unidad de Medida',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('minQuantity', {
        header: 'Cantidad Mínima',
        cell: (info) => {
          if (info.row.original.quantity <= info.getValue()) {
            return (
              <span className='font-bold text-rose-500'>
                {formatNumberToString(info.getValue())} (Mínimo alcanzado)
              </span>
            )
          } else {
            return formatNumberToString(info.getValue())
          }
        },
        footer: (props) => props.column.id
      })
    ],
    []
  )

  // FETCHING DATA FROM THE API
  const memoizeData = useMemo(async () => {
    await fetchWarehousesFromApi()
    await fetchProductTypesFromApi()
    const apiData = await fetchData()
    const data = await FETCH_DATA_BY_FIELD[localField](apiData)
    setDataFilds(data, localField)
    return data
  }, [])

  // SETTING THE DATA TO THE STORE
  useEffect(() => {
    const apiData = memoizeData
    setDataFilds(apiData, localField)
  }, [])

  return {
    rawMaterialData,
    productsData,
    packagingData,
    finishedProductsData,
    warehouse,
    productType,
    editModal,
    alert,
    selected,
    toggleAddModal,
    toggleEditModal,
    toggleAlert,
    addOrEditElement,
    removeElement,
    columns
  }
}
