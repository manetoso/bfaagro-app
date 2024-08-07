import { useCallback, useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DropdownMenu } from '@/components/datatable'
import { useSettingsStore, FIELDS_TYPES } from '@/stores/useSettingsStore'
import {
  fetchCompanyData,
  fetchUsersData,
  fetchRolesData,
  fetchLotsData
} from '@/services/settingsServices'

/**
 *
 * @returns
 */
export const useSettings = () => {
  const {
    settingsData,
    usersData,
    rolesData,
    lotsData,
    editModal,
    alert,
    selected,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    setDataFilds,
    addOrEditSettingsElement,
    addOrEditElement,
    removeElement
  } = useSettingsStore()
  const [isLoading, setIsLoading] = useState(true)

  const FETCH_DATA_BY_FIELD = {
    [FIELDS_TYPES.SETTINGS]: () => {
      console.warn('FETCHING SETTINGS DATA')
      return fetchCompanyData()
    },
    [FIELDS_TYPES.USERS]: () => {
      console.warn('FETCHING USERS DATA')
      return fetchUsersData()
    },
    [FIELDS_TYPES.ROLES]: () => {
      console.warn('FETCHING ROLES DATA')
      return fetchRolesData()
    },
    [FIELDS_TYPES.LOTS]: () => {
      console.warn('FETCHING LOTS DATA')
      return fetchLotsData()
    }
  }

  // COLUMNS FOR THE DATA TABLE
  const columnHelper1 = createColumnHelper()
  const userColumns = useMemo(
    () => [
      columnHelper1.accessor('user', {
        header: 'Usuario',
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
      columnHelper1.accessor('roles', {
        header: 'Roles',
        cell: (info) =>
          info.getValue().map(({ id, role }) => (
            <span
              key={id}
              className='mr-2 rounded-full bg-gray-500 px-2 py-1 text-xs font-bold text-white'
            >
              {role}
            </span>
          )),
        footer: (props) => props.column.id
      })
    ],
    []
  )
  // COLUMNS FOR THE DATA TABLE
  const columnHelper2 = createColumnHelper()
  const rolColumns = useMemo(
    () => [
      columnHelper2.accessor('value', {
        header: 'Rol',
        cell: (info) => (
          <span className='flex items-center justify-between gap-2 font-bold'>
            {info.getValue()}{' '}
            <DropdownMenu
              openAlert={() => toggleAlert(info.cell.row.original)}
              openModal={() => {
                toggleEditModal(info.cell.row.original)
              }}
              leftSide
            />
          </span>
        ),
        footer: (props) => props.column.id
      })
    ],
    []
  )
  // COLUMNS FOR THE DATA TABLE
  const columnHelper3 = createColumnHelper()
  const lotColumns = useMemo(
    () => [
      columnHelper3.accessor('serialNumber', {
        header: 'Serie',
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
      columnHelper3.accessor('consecutive', {
        header: 'Consecutivo',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper3.accessor('product.name', {
        header: 'Producto',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      columnHelper3.accessor('lastMade', {
        header: 'Ultimo realizado',
        cell: (info) => info.getValue() || 'N/A',
        footer: (props) => props.column.id
      })
    ],
    []
  )

  // FETCHING DATA FROM THE API
  const getData = useCallback(async () => {
    const settingsData = await FETCH_DATA_BY_FIELD[FIELDS_TYPES.SETTINGS]()
    const usersData = await FETCH_DATA_BY_FIELD[FIELDS_TYPES.USERS]()
    const rolesData = await FETCH_DATA_BY_FIELD[FIELDS_TYPES.ROLES]()
    const lotsData = await FETCH_DATA_BY_FIELD[FIELDS_TYPES.LOTS]()
    setDataFilds(settingsData, FIELDS_TYPES.SETTINGS)
    setDataFilds(usersData, FIELDS_TYPES.USERS)
    setDataFilds(rolesData, FIELDS_TYPES.ROLES)
    setDataFilds(lotsData, FIELDS_TYPES.LOTS)
    setIsLoading(false)
  }, [])

  // SETTING THE DATA TO THE STORE
  useEffect(() => {
    getData()
  }, [])

  return {
    settingsData,
    usersData,
    rolesData,
    lotsData,
    editModal,
    alert,
    selected,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    setDataFilds,
    addOrEditSettingsElement,
    addOrEditElement,
    removeElement,
    userColumns,
    rolColumns,
    lotColumns,
    isLoading
  }
}
