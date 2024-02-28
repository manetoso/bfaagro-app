import { FIELDS_TYPES } from '@/stores/useSettingsStore'
import { useSettings } from '@/hooks/useSettings'

import { Loader, PageTransition } from '@/components/layout'
import { CompanyData } from '@/components/settings/CompanyData'
import { CustomToast } from '@/components/toast'
import { SettingsDatatable } from '@/components/settings/datatable/SettingsDatatable'
import { useState } from 'react'

export function Users() {
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
    addOrEditSettingsElement,
    addOrEditElement,
    removeElement,
    userColumns,
    rolColumns,
    lotColumns,
    isLoading
  } = useSettings({ field: FIELDS_TYPES.SETTINGS })
  const [selectedTable, setSelectedTable] = useState(FIELDS_TYPES.USERS)
  if (isLoading) return <Loader />
  return (
    <PageTransition>
      <CustomToast />
      <CompanyData
        companyData={settingsData}
        submit={addOrEditSettingsElement}
      />
      <section className='mt-8 flex space-x-1 rounded-xl bg-black/10 p-1'>
        <button
          onClick={() => setSelectedTable(FIELDS_TYPES.USERS)}
          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ${
            selectedTable === FIELDS_TYPES.USERS
              ? 'bg-black text-white'
              : 'hover:bg-black/10'
          }`}
        >
          USUARIOS
        </button>
        <button
          onClick={() => setSelectedTable(FIELDS_TYPES.LOTS)}
          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ${
            selectedTable === FIELDS_TYPES.LOTS
              ? 'bg-black text-white'
              : 'hover:bg-black/10'
          }`}
        >
          LOTES
        </button>
        <button
          onClick={() => setSelectedTable(FIELDS_TYPES.ROLES)}
          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ${
            selectedTable === FIELDS_TYPES.ROLES
              ? 'bg-black text-white'
              : 'hover:bg-black/10'
          }`}
        >
          ROLES
        </button>
      </section>
      {selectedTable === FIELDS_TYPES.USERS && (
        <SettingsDatatable
          columns={userColumns}
          data={usersData}
          title='Usuarios'
          toggleAddModal={toggleAddModal}
          toggleAlert={toggleAlert}
          toggleEditModal={toggleEditModal}
          selected={selected}
          addOrEditElement={addOrEditElement}
          removeElement={removeElement}
          alert={alert}
          editModal={editModal}
          field={FIELDS_TYPES.USERS}
        />
      )}
      {selectedTable === FIELDS_TYPES.LOTS && (
        <SettingsDatatable
          columns={lotColumns}
          data={lotsData}
          title='Lotes'
          toggleAddModal={toggleAddModal}
          toggleAlert={toggleAlert}
          toggleEditModal={toggleEditModal}
          selected={selected}
          addOrEditElement={addOrEditElement}
          removeElement={removeElement}
          alert={alert}
          editModal={editModal}
          field={FIELDS_TYPES.LOTS}
        />
      )}
      {selectedTable === FIELDS_TYPES.ROLES && (
        <SettingsDatatable
          columns={rolColumns}
          data={rolesData}
          title='Roles'
          toggleAddModal={toggleAddModal}
          toggleAlert={toggleAlert}
          toggleEditModal={toggleEditModal}
          selected={selected}
          addOrEditElement={addOrEditElement}
          removeElement={removeElement}
          alert={alert}
          editModal={editModal}
          field={FIELDS_TYPES.ROLES}
        />
      )}
    </PageTransition>
  )
}
