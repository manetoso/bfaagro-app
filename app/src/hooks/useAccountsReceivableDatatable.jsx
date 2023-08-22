import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import {
  useAccountsReceivableStore,
  FIELDS_TYPES
} from '@/stores/useAccountsReceivableStore'
import { fetchData } from '@/services/accountsReceivableServices'
import { formatNumberToMoneyString } from '@/utils/utils'

const DEFAULT_FIELD = FIELDS_TYPES.ACCOUNTS_RECEIVABLES

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useAccountsReceivableDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
  const {
    accounts,
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
  } = useAccountsReceivableStore()
  const [isLoading, setIsLoading] = useState(true)

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.ACCOUNTS_RECEIVABLES]: () => {
      console.warn('FETCHING ACCOUNTS RECEIVABLE DATA')
      return fetchData()
    }
  }

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('folio', {
        header: 'Folio',
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
      columnHelper.accessor('orderFolio', {
        header: 'Folio de orden',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('emitionDateFormatted', {
        header: 'Fecha de emisión',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('expirationDateFormatted', {
        header: 'Fecha de vencimiento',
        cell: (info) => {
          const paymentDate = new Date(info.row.original.paymentDate)
          const todayDate = new Date()
          const isPayed = info.row.original.status.toLowerCase() === 'pagado'
          const hasExpired = paymentDate <= todayDate
          return (
            <span
              className={`font-bold ${
                isPayed
                  ? 'text-emerald-500'
                  : hasExpired
                  ? 'text-rose-500'
                  : 'text-amber-500'
              }`}
            >
              {info.getValue()}
            </span>
          )
        },
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('clients.originClient.clientName', {
        header: 'Vendedor',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('clients.destinationClient.clientName', {
        header: 'Cliente',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('totalSale', {
        header: 'Total de venta',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('totalPaid', {
        header: 'Cantidad pagada',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('balance', {
        header: 'Saldo',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('status', {
        header: 'Estado',
        cell: (info) => {
          const paymentDate = new Date(info.row.original.paymentDate)
          const todayDate = new Date()
          const hasExpired = paymentDate <= todayDate
          const isPayed = info.row.original.status.toLowerCase() === 'pagado'
          return (
            <span
              className={`font-bold ${
                isPayed
                  ? 'text-emerald-500'
                  : hasExpired
                  ? 'text-rose-500'
                  : 'text-amber-500'
              }`}
            >
              {info.getValue()}
            </span>
          )
        },
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
    accounts,
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
