import { useCallback, useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { usePriceListStore } from '@/stores/usePriceListStore'
import { formatNumberToMoneyString } from '@/utils/utils'

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const usePriceListDatatable = ({ field }) => {
  const {
    priceListData,
    editModal,
    alert,
    showAddButton,
    selected,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    addOrEditElement: addOrEditElementFromStore,
    removeElement,
    fetchExtraData
  } = usePriceListStore()
  const [isLoading, setIsLoading] = useState(true)

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('productName', {
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
      columnHelper.accessor('unitPrice', {
        header: 'Precio unitario',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('rise', {
        header: 'Aumento',
        cell: (info) => (
          <div className='flex flex-col'>
            <span>
              {info.getValue().risePercentage}%
            </span>
            <span>
              {formatNumberToMoneyString(info.getValue().riseQuantity)}
            </span>
          </div>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('finalPrice', {
        header: 'Precio final',
        cell: (info) => formatNumberToMoneyString(info.getValue()),
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
    setIsLoading(false)
  }, [])

  // SETTING THE DATA TO THE STORE
  useEffect(() => {
    getData()
  }, [])

  return {
    priceListData,
    editModal,
    alert,
    showAddButton,
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
