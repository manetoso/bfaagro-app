import { WareHouseDatatable } from './datatable'
import { Loader } from '@/components/layout'

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
    packagingData,
    warehouse,
    productType,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    isLoading
  } = useWareHouseDatatable({ field: FIELDS_TYPES.PACKAGING })
  if (isLoading) return <Loader />
  return (
    <>
      <WareHouseDatatable
        columns={columns}
        data={packagingData}
        title='Embalajes'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.PACKAGING}
        productType={productType}
        warehouse={warehouse}
      />
    </>
  )
}
