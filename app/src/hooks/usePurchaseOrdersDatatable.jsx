import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { usePurchaseOrdersStore, FIELDS_TYPES } from '@/stores/usePurchaseOrdersStore'
import { fetchData } from '@/services/purchaseOrdersServices'
import { formatNumberToMoneyString } from '@/utils/utils'

const DEFAULT_FIELD = FIELDS_TYPES.PURCHASE_ORDERS

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const usePurchaseOrdersDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
  const {
    purchaseOrdersData,
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
  } = usePurchaseOrdersStore()
  const [isLoading, setIsLoading] = useState(true)

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.PURCHASE_ORDERS]: () => {
      console.warn('FETCHING PURCHASE ORDERS DATA')
      return fetchData()
    }
  }

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('supplier.agent', {
        header: 'Agente',
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
      columnHelper.accessor('dateFormatted', {
        header: 'Fecha',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('iva', {
        header: 'IVA',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('total', {
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
    purchaseOrdersData,
    editModal,
    alert,
    selected,
    toggleAddModal,
    toggleEditModal,
    toggleAlert,
    addOrEditElement,
    removeElement,
    columns,
    isLoading
  }
}
