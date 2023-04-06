import { WareHouseDatatable } from './datatable'

import { useWareHouseDatatable } from '@/hooks/useWareHouseDatatable'
import { FIELDS_TYPES } from '@/stores/useWarehouseStore'

export function Products() {
  const {
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    productsData,
    warehouse,
    productType,
    toggleAddModal,
    toggleAlert,
    toggleEditModal
  } = useWareHouseDatatable({ field: FIELDS_TYPES.PRODUCTS })
  return (
    <>
      <WareHouseDatatable
        columns={columns}
        data={productsData}
        title='Productos'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.PRODUCTS}
        productType={productType}
        warehouse={warehouse}
      />
    </>
  )
}
