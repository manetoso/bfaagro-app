import { WareHouseDatatable } from './datatable'

import { useWareHouseDatatable } from '@/hooks/useWareHouseDatatable'
import { FIELDS_TYPES } from '@/stores/useWarehouseStore'

export function FinishedProducts() {
  const {
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    finishedProductsData,
    warehouse,
    productType,
    toggleAddModal,
    toggleAlert,
    toggleEditModal
  } = useWareHouseDatatable({ field: FIELDS_TYPES.FINISHED_PRODUCTS })
  return (
    <>
      <WareHouseDatatable
        columns={columns}
        data={finishedProductsData}
        title='Productos Terminados'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.FINISHED_PRODUCTS}
        productType={productType}
        warehouse={warehouse}
      />
    </>
  )
}
