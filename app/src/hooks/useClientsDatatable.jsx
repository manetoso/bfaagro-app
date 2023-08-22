import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { useClientsStore, FIELDS_TYPES } from '@/stores/useClientsStore'
import { fetchData } from '@/services/clientsServices'
import { formatPhoneNumber } from '@/utils/utils'

const DEFAULT_FIELD = FIELDS_TYPES.CLIENTS

/**
 *
 * @param {{field: Like<FIELDS_TYPES>}} props
 * @returns
 */
export const useClientsDatatable = ({ field }) => {
  const localField = FIELDS_TYPES[field] || DEFAULT_FIELD
  const {
    clientsData,
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
  } = useClientsStore()
  const [isLoading, setIsLoading] = useState(true)

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.CLIENTS]: () => {
      console.warn('FETCHING CLIENTS DATA')
      return fetchData()
    }
  }

  // COLUMNS FOR THE DATA TABLE
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.accessor('company', {
        header: 'Empresa',
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
      columnHelper.accessor('name', {
        header: 'Cliente',
        cell: (info) => (
          <span>
            {info.getValue()} {info.row.original.lastName}
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('rfc', {
        header: 'RFC',
        cell: (info) => (
          <span>
            {info.getValue()}
          </span>
        ),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('address', {
        header: 'Dirección',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('clientType.clientType', {
        header: 'Tipo de cliente',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper.accessor('phoneNumber', {
        header: 'Contacto',
        cell: (info) => (
          <span>
            <a className='underline' href={`tel:${info.getValue()}`}>
              {formatPhoneNumber(info.getValue())}
            </a>
            <p>{info.row.original.email}</p>
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
    clientsData,
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
