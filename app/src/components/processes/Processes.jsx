import { ProcessesDatatable, ProcessesKanva } from './datatable'

import { useProcessesDatatable } from '@/hooks/useProcessesDatatable'
import { FIELDS_TYPES } from '@/stores/useRecipesStore'

export function Processes() {
  const {
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    recipesData,
    toggleAddModal,
    toggleAlert,
    toggleEditModal
  } = useProcessesDatatable({ field: FIELDS_TYPES.RECIPES })
  return (
    <>
      <ProcessesDatatable
        columns={columns}
        data={recipesData}
        title='Procesos'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.RECIPES}
      />
      <div className='overflow-x-scroll'>
        <ProcessesKanva
          processesData={recipesData}
          toggleEditModal={toggleEditModal}
        />
      </div>
    </>
  )
}
