import { WareHouseDatatable } from './datatable'

import { useWareHouseDatatable } from '@/hooks/useWareHouseDatatable'
import { FIELDS_TYPES } from '@/stores/useWarehouseStore'

export function Packaging() {
  const {
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    rawMaterialData,
    toggleAddModal,
    toggleAlert,
    toggleEditModal
  } = useWareHouseDatatable({ field: FIELDS_TYPES.PACKAGING })
  return (
    <>
      <WareHouseDatatable
        columns={columns}
        data={rawMaterialData}
        title='Empaques'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.PACKAGING}
      />
    </>
  )
}
