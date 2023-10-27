import { useCallback, useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { useChargesStore, FIELDS_TYPES } from '@/stores/useChargesStore'
import { fetchData } from '@/services/chargesServices'
import { formatNumberToMoneyString } from '@/utils/utils'

const DEFAULT_FIELD = FIELDS_TYPES.CHARGES

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useChargesDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
  const {
    chargesData,
    editModal,
    alert,
    selected,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    setDataFilds,
    addOrEditElement: addOrEditElementFromStore,
    removeElement,
    fetchExtraData
  } = useChargesStore()
  const [isLoading, setIsLoading] = useState(true)

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.CHARGES]: () => {
      console.warn('FETCHING CHARGES DATA')
      return fetchData()
    }
  }

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('chargeFolio', {
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
      columnHelper.accessor('accountReceivableFolio', {
        header: 'Folio CxC',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('chargeDateFormatted', {
        header: 'Fecha de cobro',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('quantityCharged', {
        header: 'Cantidad cobrada',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('client.clientName', {
        header: 'Cliente',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      })
    ],
    []
  )

  const addOrEditElement = async (data, field) => {
    await addOrEditElementFromStore(data, field)
    setIsLoading(true)
    getData()
  }

  // FETCHING DATA FROM THE API
  const getData = useCallback(async () => {
    await fetchExtraData()
    const apiData = await FETCH_DATA_BY_FIELD[localField]()
    setDataFilds(apiData, localField)
    setIsLoading(false)
    return apiData
  }, [])

  // SETTING THE DATA TO THE STORE
  useEffect(() => {
    getData()
  }, [])

  return {
    chargesData,
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
