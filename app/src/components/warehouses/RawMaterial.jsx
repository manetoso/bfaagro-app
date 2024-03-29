import { WareHouseDatatable } from './datatable'
import { Loader } from '@/components/layout'

import { useWareHouseDatatable } from '@/hooks/useWareHouseDatatable'
import { FIELDS_TYPES } from '@/stores/useWarehouseStore'

export function RawMaterial() {
  const {
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    rawMaterialData,
    warehouse,
    productType,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    isLoading
  } = useWareHouseDatatable({ field: FIELDS_TYPES.RAW_MATERIAL })
  if (isLoading) return <Loader />
  return (
    <>
      <WareHouseDatatable
        columns={columns}
        data={rawMaterialData}
        title='Materia Prima'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.RAW_MATERIAL}
        productType={productType}
        warehouse={warehouse}
      />
    </>
  )
}
