import { PackagingDatatable } from './datatable'

import { usePackagingDatatable } from '@/hooks/usePackagingDatatable'
import { FIELDS_TYPES } from '@/stores/usePackagingStore'

export function Packaging() {
  const {
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    packagingData,
    toggleAddModal,
    toggleAlert,
    toggleEditModal
  } = usePackagingDatatable({ field: FIELDS_TYPES.RECIPES })
  return (
    <>
      <PackagingDatatable
        columns={columns}
        data={packagingData}
        title='Embalaje'
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
    </>
  )
}
