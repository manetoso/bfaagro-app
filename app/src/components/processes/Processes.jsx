import { ProcessesDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'

import { useProcessesDatatable } from '@/hooks/useProcessesDatatable'
import { FIELDS_TYPES } from '@/stores/useProcessesStore'

export function Processes() {
  const {
    addOrEditElement,
    alert,
    editModal,
    incompleteModal,
    removeElement,
    selected,
    columns,
    processesData,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    toggleIncompleteModal,
    markAsIncompleteStatus,
    isLoading
  } = useProcessesDatatable({ field: FIELDS_TYPES.PROCESSES })
  if (isLoading) return <Loader />
  return (
    <>
      <CustomToast />
      <ProcessesDatatable
        columns={columns}
        data={processesData}
        title='Procesos'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        toggleIncompleteModal={toggleIncompleteModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.PROCESSES}
        incompleteModal={incompleteModal}
        markAsIncompleteStatus={markAsIncompleteStatus}
      />
    </>
  )
}
