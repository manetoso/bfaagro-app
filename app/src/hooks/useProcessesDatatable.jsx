import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/processes/datatable/DropdownMenu'
import { useProcessesStore, FIELDS_TYPES } from '@/stores/useProcessesStore'
import { fetchData } from '@/services/processesServices'

const DEFAULT_FIELD = FIELDS_TYPES.PROCESSES

const STATUS_LABEL = {
  PENDIENTE: 'bg-amber-200 text-amber-500',
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
    incompleteModal,
    alert,
    selected,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    toggleIncompleteModal,
    setDataFilds,
    addOrEditElement,
    removeElement,
    markAsIncompleteStatus,
    fetchExtraData
  } = useProcessesStore()
  const [isLoading, setIsLoading] = useState(true)

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
              onIncomplete={() => toggleIncompleteModal(info.cell.row.original)}
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
      })
    ],
    []
  )

  // FETCHING DATA FROM THE API
  const getData = useMemo(async () => {
    await fetchExtraData()
    const apiData = await FETCH_DATA_BY_FIELD[localField]()
    setDataFilds(apiData, localField)
    setIsLoading(false)
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
    incompleteModal,
    alert,
    selected,
    toggleAddModal,
    toggleEditModal,
    toggleIncompleteModal,
    toggleAlert,
    addOrEditElement,
    removeElement,
    markAsIncompleteStatus,
    columns,
    isLoading
  }
}
