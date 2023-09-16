import { useCallback, useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { useLogbookStore } from '@/stores/useLogbookStore'
// import { LOGBOOK_TYPES } from '@/utils/consts'

import { DropdownMenu } from '@/components/logbook/datatable/DropdownMenu'

export const useLogbookDatatable = () => {
  const {
    logbookData,
    detailsModal,
    selected,
    loadAllLogbookData,
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
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      })
      // columnHelper.accessor('createdAtFormatted', {
      //   header: 'Fecha',
      //   cell: (info) => info.getValue(),
      //   footer: (props) => props.column.id
      // })
    ],
    []
  )

  // const totalSalesInLastWeek = useMemo(() => {
  //   const totalSales = logbookData.reduce((acc, curr) => {
  //     if (curr.movement === LOGBOOK_TYPES.SALE) {
  //       acc += curr.amount
  //     }
  //     return acc
  //   }, 0)
  //   return totalSales
  // }, [logbookData])

  // FETCHING DATA FROM THE API
  const getData = useCallback(async () => {
    await loadAllLogbookData()
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
