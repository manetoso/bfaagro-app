import { SuppliersDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'

import { useSuppliersDatatable } from '@/hooks/useSuppliersDatatable'
import { FIELDS_TYPES } from '@/stores/useSuppliersStore'

export function Suppliers() {
  const {
    suppliersData,
    supliierTypeData,
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
  } = useSuppliersDatatable({ field: FIELDS_TYPES.SUPPLIERS })
  if (isLoading) return <Loader />
  return (
    <>
      <CustomToast />
      <SuppliersDatatable
        columns={columns}
        data={suppliersData}
        title='Proveedores'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.SUPPLIERS}
      />
    </>
  )
}
