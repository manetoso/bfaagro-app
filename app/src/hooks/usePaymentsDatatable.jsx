import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { usePaymentsStore, FIELDS_TYPES } from '@/stores/usePaymentsStore'
import { fetchData } from '@/services/paymentsServices'
import { formatNumberToMoneyString } from '@/utils/utils'

const DEFAULT_FIELD = FIELDS_TYPES.PAYMENTS

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const usePaymentsDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
  const {
    paymentsData,
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
  } = usePaymentsStore()
  const [isLoading, setIsLoading] = useState(true)

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.PAYMENTS]: () => {
      console.warn('FETCHING ACCOUNTS PAYABLE DATA')
      return fetchData()
    }
  }

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('paymentFolio', {
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
      columnHelper.accessor('accountPayableFolio', {
        header: 'Folio CxP',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('paymentDateFormatted', {
        header: 'Fecha de pago',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('quantityPaid', {
        header: 'Cantidad pagada',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
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
    paymentsData,
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
