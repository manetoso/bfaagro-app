import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { useWarehouseStore, FIELDS_TYPES } from '@/stores/useWarehouseStore'
import { formatNumberToString } from '@/utils/utils'

import { fetchData } from '@/services/warehouseServices'
import { fetchProductTypes, fetchWarehouses } from '@/services/globalServices'

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
    setWarehouse(warehouses.find((x) => x.name === field))
    setProductType(productTypes.find((x) => x.value.productType === field))
    return data.filter((x) => x.productType.some((y) => y.name === field))
  }

  const FETCH_DATA_BY_FIELD = {
    /**
     *
     * @param { { id: string; name: string; quantity: number; unity: string; warehouse: { id: string; name: string; }; productType: { id: number; name: string; }[]; idProductType: number; idWarehouse: string }[] } data
     * @returns
     */
    [FIELDS_TYPES.RAW_MATERIAL]: async (data) => {
      console.warn('rawMaterial')
      return prepareDataByfield(data, 'MATERIA PRIMA')
    },
    /**
     *
     * @param { { id: string; name: string; quantity: number; unity: string; warehouse: { id: string; name: string; }; productType: { id: number; name: string; }[]; idProductType: number; idWarehouse: string }[] } data
     * @returns
     */
    [FIELDS_TYPES.PRODUCTS]: async (data) => {
      console.warn('products')
      return prepareDataByfield(data, 'PRODUCTO TERMINADO')
    },
    /**
     *
     * @param { { id: string; name: string; quantity: number; unity: string; warehouse: { id: string; name: string; }; productType: { id: number; name: string; }[]; idProductType: number; idWarehouse: string }[] } data
     * @returns
     */
    [FIELDS_TYPES.PACKAGING]: async (data) => {
      console.warn('packaging')
      return prepareDataByfield(data, 'EMBALAJES')
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
        cell: (info) => formatNumberToString(info.getValue()),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('unity', {
        header: 'Unidad de Medida',
        cell: (info) => info.getValue(),
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