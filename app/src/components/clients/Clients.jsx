import { ClientsDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader, PageTransition } from '@/components/layout'

import { useClientsDatatable } from '@/hooks/useClientsDatatable'
import { FIELDS_TYPES } from '@/stores/useClientsStore'

export function Clients() {
  const {
    clientsData,
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    isLoading
  } = useClientsDatatable({ field: FIELDS_TYPES.CLIENTS })
  if (isLoading) return <Loader />
  return (
    <PageTransition>
      <CustomToast />
      <ClientsDatatable
        columns={columns}
        data={clientsData}
        title='Clientes'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.CLIENTS}
      />
    </PageTransition>
  )
}
