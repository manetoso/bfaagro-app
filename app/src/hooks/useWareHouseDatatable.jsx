import { useEffect, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { useWarehouseStore, FIELDS_TYPES } from '@/stores/useWarehouseStore'
import { formatNumberToString } from '@/utils/utils'

const DEFAULT_FIELD = FIELDS_TYPES.RAW_MATERIAL

async function fetchData(url) {
  const resp = await fetch(url)
  const json = await resp.json()
  const data = json.map((rawMaterial) => ({
    id: rawMaterial.ID_PRODUCTO,
    name: rawMaterial.NOMBRE,
    quantity: rawMaterial.CANTIDAD,
    unity: rawMaterial.UNIDAD_MEDIDA,
    idProductType: rawMaterial.ID_TIPO_PRODUCTO,
    idWarehouse: rawMaterial.ID_ALMACEN
  }))
  return data
}

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useWareHouseDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
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
    removeElement
  } = useWarehouseStore()

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.RAW_MATERIAL]: async () => {
      console.warn('rawMaterial')
      return await fetchData('http://localhost:5173/rawMaterial.json')
    },
    [FIELDS_TYPES.PRODUCTS]: async () => {
      console.warn('products')
      return await fetchData('http://localhost:5173/rawMaterial.json')
    },
    [FIELDS_TYPES.PACKAGING]: async () => {
      console.warn('packaging')
      return await fetchData('http://localhost:5173/rawMaterial.json')
    }
  }

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
        cell: (info) => (
          <span>
            {info.getValue() === 'Litros' ? (
              <span className='rounded-full bg-emerald-100 px-4 py-1 font-semibold text-emerald-500'>
                {info.getValue()}
              </span>
            ) : (
              <span className='rounded-full bg-rose-100 px-4 py-1 font-semibold text-rose-500'>
                {info.getValue()}
              </span>
            )}
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('idProductType', {
        header: 'Tipo Producto',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('idWarehouse', {
        header: 'Tipo Producto',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      })
    ],
    []
  )

  const getData = useMemo(async () => {
    const apiData = await FETCH_DATA_BY_FIELD[localField]()
    setDataFilds(apiData, localField)
    return apiData
  }, [])

  useEffect(() => {
    const apiData = getData
    setDataFilds(apiData, localField)
  }, [])

  return {
    rawMaterialData,
    productsData,
    packagingData,
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
