import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/saleOrders/datatable/DropdownMenu'
import { useSaleOrdersStore, FIELDS_TYPES } from '@/stores/useSaleOrdersStore'
import { fetchData } from '@/services/saleOrdersServices'
import { formatNumberToMoneyString } from '@/utils/utils'

const DEFAULT_FIELD = FIELDS_TYPES.SALE_ORDERS

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useSaleOrdersDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
  const {
    saleOrdersData,
    editModal,
    pdfView,
    alert,
    priceListWarning,
    selected,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    printPurchaseOrder,
    setDataFilds,
    addOrEditElement,
    removeElement,
    fetchExtraData
  } = useSaleOrdersStore()
  const [isLoading, setIsLoading] = useState(true)

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.SALE_ORDERS]: () => {
      console.warn('FETCHING SALE ORDERS DATA')
      return fetchData()
    }
  }

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('folio', {
        header: 'Folio de orden',
        cell: (info) => (
          <span className='flex items-center justify-between gap-2 font-bold'>
            {info.getValue()}{' '}
            <DropdownMenu
              openAlert={() => toggleAlert(info.cell.row.original)}
              openModal={() => {
                toggleEditModal(info.cell.row.original)
              }}
              printHanlder={() => {
                printPurchaseOrder(info.cell.row.original)
              }}
            />
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('originClient.clientName', {
        header: 'Vendedor',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('destinationClient.clientName', {
        header: 'Cliente',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('saleDetails.total', {
        header: 'Total',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
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
    getData
  }, [])

  return {
    saleOrdersData,
    editModal,
    pdfView,
    alert,
    priceListWarning,
    selected,
    toggleAddModal,
    toggleEditModal,
    printPurchaseOrder,
    toggleAlert,
    addOrEditElement,
    removeElement,
    columns,
    isLoading
  }
}
