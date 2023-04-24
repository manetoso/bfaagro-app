import { useEffect, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
// import { DropdownMenu } from '@/components/processes/datatable'
import { useProcessesStore, FIELDS_TYPES } from '@/stores/useProcessesStore'
import { fetchData } from '@/services/processesServices'

const DEFAULT_FIELD = FIELDS_TYPES.RECIPES

const STATUS_LABEL = {
  Pendiente: 'bg-amber-100 text-amber-500',
  Terminado: 'bg-emerald-100 text-emerald-500',
  Cancelado: 'bg-rose-100 text-rose-500',
  Revisión: 'bg-sky-100 text-sky-500'
}

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useProcessesDatatable = ({ field }) => {
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
    removeElement,
    fetchExtraData
  } = useProcessesStore()

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.RECIPES]: () => {
      console.warn('recipesData')
      return fetchData()
    }
  }

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('recipeData.product.name', {
        header: 'Producto',
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
      columnHelper.accessor('recipeData.recipeName', {
        header: 'Formula',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('warehouseName', {
        header: 'Almacén',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('status', {
        header: 'Estado',
        cell: (info) => (
          <span>
            <span className={`rounded-full px-4 py-1 font-semibold ${STATUS_LABEL[info.getValue()]}`}>
              {info.getValue()}
            </span>
          </span>
        ),
        footer: (props) => props.column.id
      })
    ],
    []
  )

  // FETCHING DATA FROM THE API
  const getData = useMemo(async () => {
    await fetchExtraData()
    const apiData = await FETCH_DATA_BY_FIELD[localField]()
    setDataFilds(apiData, localField)
    return apiData
  }, [])

  // SETTING THE DATA TO THE STORE
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
