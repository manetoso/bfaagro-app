import { ProcessesDatatable, ProcessesKanva } from './datatable'
import { CustomToast } from '@/components/toast'

import { useProcessesDatatable } from '@/hooks/useProcessesDatatable'
import { FIELDS_TYPES } from '@/stores/useProcessesStore'

export function Processes() {
  const {
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    processesData,
    toggleAddModal,
    toggleAlert,
    toggleEditModal
  } = useProcessesDatatable({ field: FIELDS_TYPES.PROCESSES })
  return (
    <>
      <CustomToast />
      {window.location.href.includes('tabla') && (
        <ProcessesDatatable
          columns={columns}
          data={processesData}
          title='Procesos'
          toggleAddModal={toggleAddModal}
          toggleAlert={toggleAlert}
          toggleEditModal={toggleEditModal}
          selected={selected}
          addOrEditElement={addOrEditElement}
          removeElement={removeElement}
          alert={alert}
          editModal={editModal}
          field={FIELDS_TYPES.PROCESSES}
        />
      )}
      {window.location.href.includes('porHacer') && (
        <div className='overflow-x-scroll'>
          <ProcessesKanva
            processesData={processesData}
            toggleEditModal={toggleEditModal}
          />
        </div>
      )}
    </>
  )
}
