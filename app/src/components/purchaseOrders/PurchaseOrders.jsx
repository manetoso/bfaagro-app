import { PurchaseOrdersDatatable, PDFBuilder } from './datatable'
import { CustomToast } from '@/components/toast'
import { PDFView } from '@/components/alert'
import { Loader, PageTransition } from '@/components/layout'

import { usePurchaseOrdersDatatable } from '@/hooks/usePurchaseOrdersDatatable'
import { FIELDS_TYPES } from '@/stores/usePurchaseOrdersStore'

export function PurchaseOrders() {
  const {
    purchaseOrdersData,
    addOrEditElement,
    alert,
    editModal,
    pdfView,
    removeElement,
    selected,
    columns,
    toggleAddModal,
    printPurchaseOrder,
    toggleAlert,
    toggleEditModal,
    isLoading
  } = usePurchaseOrdersDatatable({ field: FIELDS_TYPES.PURCHASE_ORDERS })
  if (isLoading) return <Loader />
  return (
    <PageTransition>
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
      <PDFView
        closeModal={() => printPurchaseOrder({})}
        isOpen={pdfView}
        title='Orden de Compra PDF'
      >
        <PDFBuilder />
      </PDFView>
    </PageTransition>
  )
}
