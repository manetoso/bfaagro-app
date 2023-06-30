import { PurchaseOrdersDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'

import { usePurchaseOrdersDatatable } from '@/hooks/usePurchaseOrdersDatatable'
import { FIELDS_TYPES } from '@/stores/usePurchaseOrdersStore'

export function PurchaseOrders() {
  const {
    purchaseOrdersData,
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
  } = usePurchaseOrdersDatatable({ field: FIELDS_TYPES.PURCHASE_ORDERS })
  if (isLoading) return <Loader />
  return (
    <>
      <CustomToast />
      <PurchaseOrdersDatatable
        columns={columns}
        data={purchaseOrdersData}
        title='Ordenes de Compra'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.PURCHASE_ORDERS}
      />
    </>
  )
}
