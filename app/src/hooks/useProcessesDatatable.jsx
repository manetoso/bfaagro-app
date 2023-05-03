import { useEffect, useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
// import { DropdownMenu } from '@/components/processes/datatable'
import { useProcessesStore, FIELDS_TYPES } from '@/stores/useProcessesStore'
import { fetchData } from '@/services/processesServices'

const DEFAULT_FIELD = FIELDS_TYPES.PROCESSES

const STATUS_LABEL = {
  PENDIENTE: 'bg-stone-200 text-stone-500',
  'EN PROCESO': 'bg-amber-100 text-amber-500',
  'PENDIENTE DE VALIDAR': 'bg-sky-100 text-sky-500',
  FINALIZADO: 'bg-emerald-100 text-emerald-500'
}

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useProcessesDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
  const {
    processesData,
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
    [FIELDS_TYPES.PROCESSES]: () => {
      console.warn('processesData')
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
      columnHelper.accessor('warehouse.name', {
        header: 'Almacén',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('status.value', {
        header: 'Estado',
        cell: (info) => (
          <span>
            <span
              className={`rounded-full px-4 py-1 font-semibold ${
                STATUS_LABEL[info.getValue()]
              }`}
            >
              {info.getValue()}
            </span>
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('createdAtFormatted', {
        header: 'Fecha de creación',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
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
    processesData,
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
