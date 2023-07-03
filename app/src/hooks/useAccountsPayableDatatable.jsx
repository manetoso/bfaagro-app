import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import {
  useAccountsPayableStore,
  FIELDS_TYPES
} from '@/stores/useAccountsPayableStore'
import { fetchData } from '@/services/accountsPayableServices'
import { formatNumberToMoneyString } from '@/utils/utils'

const DEFAULT_FIELD = FIELDS_TYPES.ACCOUNTS_PAYABLE

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useAccountsPayableDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
  const {
    accountsPayableData,
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
  } = useAccountsPayableStore()
  const [isLoading, setIsLoading] = useState(true)

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.ACCOUNTS_PAYABLE]: () => {
      console.warn('FETCHING ACCOUNTS PAYABLE DATA')
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
      columnHelper.accessor('paymentDateFormatted', {
        header: 'Fecha de pago',
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
      columnHelper.accessor('supplier.supplierCompany', {
        header: 'Proveedor',
        cell: (info) => (
          <span>
            {info.getValue()}{' '}
            <strong>{`(${info.row.original.supplier.agent})`}</strong>
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('quantity', {
        header: 'Cantidad',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('quantityPaid', {
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
    accountsPayableData,
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
