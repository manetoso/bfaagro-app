import { useCallback, useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { useLogbookStore } from '@/stores/useLogbookStore'
import { LOGBOOK_TYPES } from '@/utils/consts'

import { DropdownMenu } from '@/components/logbook/datatable/DropdownMenu'

export const useLogbookDatatable = () => {
  const {
    logbookData,
    detailsModal,
    selected,
    loadAllLogbookData,
    fetchExtraData,
    toggleDetailsModalModal
  } = useLogbookStore()
  const [isLoading, setIsLoading] = useState(true)

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('createdAtFormatted', {
        header: 'Fecha',
        cell: (info) => {
          return (
            <span className='flex items-center justify-between gap-2 font-bold'>
              {info.getValue()}{' '}
              <DropdownMenu
                openModal={() => {
                  toggleDetailsModalModal(info.cell.row.original)
                }}
              />
            </span>
          )
        },
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('movement', {
        header: 'Movimiento',
        cell: (info) => (
          <span
            className={`font-bold ${
              info.getValue() === LOGBOOK_TYPES.PURCHASE
                ? 'text-sky-500'
                : 'text-emerald-500'
            }`}
          >
            {info.getValue()}
          </span>
        ),
        footer: (props) => props.column.id
      })
    ],
    []
  )

  // FETCHING DATA FROM THE API
  const getData = useCallback(async () => {
    await loadAllLogbookData()
    await fetchExtraData()
    setIsLoading(false)
  }, [])

  // SETTING THE DATA TO THE STORE
  useEffect(() => {
    getData()
  }, [])

  return {
    logbookData,
    detailsModal,
    selected,
    toggleDetailsModalModal,
    // totalSalesInLastWeek,
    columns,
    isLoading
  }
}
