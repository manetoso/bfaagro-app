import { useEffect, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { useRecipesStore, FIELDS_TYPES } from '@/stores/useRecipesStore'
import { fetchData } from '@/services/recipesServices'
import { formatNumberToString } from '@/utils/utils'

const DEFAULT_FIELD = FIELDS_TYPES.RECIPES

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useRecipesDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
  const {
    recipesData,
    editModal,
    alert,
    selected,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    setDataFilds,
    addOrEditElement,
    removeElement
  } = useRecipesStore()

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.RECIPES]: () => {
      console.warn('recipesData')
      return fetchData('http://localhost:5173/recipes.json')
    }
  }

  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('recipeName', {
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
      columnHelper.accessor('productName', {
        header: 'Producto',
        cell: (info) => (
          <span>
            {info.cell.row.original.unity === 'Litros' ? (
              <span className='rounded-full bg-emerald-100 px-4 py-1 font-semibold text-emerald-500'>
                {`${info.getValue()} ( ${info.cell.row.original.unity} )`}
              </span>
            ) : (
              <span className='rounded-full bg-rose-100 px-4 py-1 font-semibold text-rose-500'>
                {`${info.getValue()} ( ${info.cell.row.original.unity} )`}
              </span>
            )}
          </span>
        ),
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
    recipesData,
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
